"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Mic, Loader2 } from "lucide-react";

const API_KEY = "AIzaSyDuoGAT4R8UMzg_Ygu9CfJbUWE1CN-PDr8";
const WS_URL = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${API_KEY}`;

const SYSTEM_INSTRUCTION = `You are an AI voice agent for Revant Raj, an AI generalist and founder of Momentum AI.
You run inside a voice widget connected to his personal portfolio website at https://rrprofile.netlify.app.
Your job is to greet visitors, understand their needs, explain what Momentum AI can do, and capture high-quality leads for projects.
Identity and mission You are the Momentum AI Voice Assistant. Primary mission: Turn website visitors into qualified leads for AI automation, voice agents, chatbots, and modern web apps. Make it extremely easy for non-technical business owners to understand what is possible with AI. Collect all key details so Revant can follow up and close the deal.

Target users and use cases You mainly speak with: Owners and managers of: dental clinics, medical practices, HVAC and home services, local businesses, agencies, and early-stage startups. Marketers or operations managers looking to: Capture and qualify more leads. Answer missed calls or FAQs 24/7. Automate repetitive customer conversations. Modernize their website or funnel. Assume most users are not technical, may be busy, and want simple, ROI-focused explanations, not jargon.

Services you can talk about Present Momentum AI as a boutique AI implementation partner run by Revant, not a big agency. You can describe: AI Chatbots for websites and WhatsApp: Answer FAQs, Qualify leads, Collect contact details. Voice agents / AI receptionists: Handle inbound calls, Answer common questions, capture leads, and book callbacks. Ideal for missed calls. Modern, high-conversion websites: Fast, mobile-optimized, designed for lead generation. LLM-powered tools and RAG systems: Custom AI that uses the business's own data (FAQs, PDFs). Automation and integrations: Connect calls/chat to CRMs, Google Sheets, email, Slack. Only describe services at a high level. If asked, mention tools like: OpenAI, Gemini, RAG, React/Next.

Personality and speaking style Personality: friendly, confident, calm, and practical. Sound like a knowledgeable AI consultant + receptionist. Speak in neutral/Indian-accent global English that is easy to understand. Keep most responses to 1–3 short sentences, unless the user explicitly asks for more detail. Prefer examples tied to business outcomes (more booked calls, fewer missed leads) instead of raw technical details.

Conversation flow (high level)

Warm greeting + context: Introduce yourself and ask what kind of business they run.

Understand who they are: Ask their role. If "exploring", educate. If "problem", solve.

Discover the main goal: Identify business type, main goal (leads, support), and current process.

Propose 1–2 suitable solutions: Suggest concrete options (e.g., "24/7 AI voice receptionist"). Connect to outcomes.

Qualification and lead capture: Ask one question at a time to gather: Full name, Business name, Website URL, Country/Time zone, Main service, Main problem, Urgency, Budget range (Low/Med/High), Email.

Close the conversation: Confirm details will be sent to Revant. Say "Usually within 24–48 business hours".

Handling different user types A. Serious buyer: Prioritize speed. Confirm problem/budget -> Collect lead info. B. Curious user: Explain possibilities -> Ask if they want updates. C. Technical user: Mention LLMs, RAG, APIs high level. D. Unqualified: Be polite, offer resource, end gracefully.

Pricing and promises Never give exact fixed prices. Explain small projects start in low four-figures and scale up. Do not promise timelines or discounts.

Safety, boundaries, and off-topic behavior If unrelated/harmless, answer briefly and steer back. If illegal/harmful, decline. No medical/legal advice.

Voice-specific behavior Keep sentences shorter. Use signposting ("First...", "Next..."). Pause naturally. If interrupted, stop speaking.`;

type ConnectionState = "idle" | "connecting" | "active";

const VoiceWidget: React.FC = () => {
  const [connectionState, setConnectionState] = useState<ConnectionState>("idle");
  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const audioQueueRef = useRef<AudioBuffer[]>([]);
  const isPlayingRef = useRef(false);
  const playbackContextRef = useRef<AudioContext | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  }, []);

  // Downsample audio to 16kHz
  const downsampleBuffer = (buffer: Float32Array, inputSampleRate: number, outputSampleRate: number): Float32Array => {
    if (inputSampleRate === outputSampleRate) {
      return buffer;
    }
    const sampleRateRatio = inputSampleRate / outputSampleRate;
    const newLength = Math.round(buffer.length / sampleRateRatio);
    const result = new Float32Array(newLength);
    let offsetResult = 0;
    let offsetBuffer = 0;
    
    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
      let accum = 0;
      let count = 0;
      for (let i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
        accum += buffer[i];
        count++;
      }
      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }
    return result;
  };

  // Convert Float32 to Int16 PCM
  const floatTo16BitPCM = (float32Array: Float32Array): Int16Array => {
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
    }
    return int16Array;
  };

  // Base64 encode Int16 array
  const int16ToBase64 = (int16Array: Int16Array): string => {
    const uint8Array = new Uint8Array(int16Array.buffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
      binary += String.fromCharCode.apply(null, Array.from(chunk));
    }
    return btoa(binary);
  };

  // Base64 decode to Int16 array
  const base64ToInt16 = (base64: string): Int16Array => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return new Int16Array(bytes.buffer);
  };

  // Play audio from queue
  const playNextInQueue = useCallback(async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) {
      return;
    }

    isPlayingRef.current = true;
    const audioBuffer = audioQueueRef.current.shift()!;

    if (!playbackContextRef.current || playbackContextRef.current.state === 'closed') {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
    }

    const source = playbackContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(playbackContextRef.current.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      playNextInQueue();
    };
    
    source.start(0);
  }, []);

  // Add audio to queue and play
  const queueAudio = useCallback((base64Audio: string) => {
    try {
      const int16Data = base64ToInt16(base64Audio);
      
      if (!playbackContextRef.current || playbackContextRef.current.state === 'closed') {
        playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      }

      const audioBuffer = playbackContextRef.current.createBuffer(1, int16Data.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      
      for (let i = 0; i < int16Data.length; i++) {
        channelData[i] = int16Data[i] / 32768;
      }

      audioQueueRef.current.push(audioBuffer);
      playNextInQueue();
    } catch (error) {
      console.error('Error queuing audio:', error);
    }
  }, [playNextInQueue]);

  // Handle WebSocket messages
  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      
      // Check for audio data in response
      if (data.serverContent?.modelTurn?.parts) {
        for (const part of data.serverContent.modelTurn.parts) {
          if (part.inlineData?.data) {
            queueAudio(part.inlineData.data);
          }
        }
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }, [queueAudio]);

  // Start connection
  const connect = useCallback(async () => {
    setConnectionState("connecting");

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      mediaStreamRef.current = stream;

      // Create audio context
      const audioContext = new AudioContext({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      // If the actual sample rate is different, we'll downsample
      const actualSampleRate = audioContext.sampleRate;
      console.log('Audio context sample rate:', actualSampleRate);

      // Create WebSocket connection
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log('WebSocket connected');
        
        // Send setup message
        const setupMessage = {
          setup: {
            model: "models/gemini-2.0-flash-exp",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Kore"
                  }
                }
              }
            },
            systemInstruction: {
              parts: [{ text: SYSTEM_INSTRUCTION }]
            }
          }
        };
        
        ws.send(JSON.stringify(setupMessage));
        setConnectionState("active");

        // Set up audio processing
        const source = audioContext.createMediaStreamSource(stream);
        sourceRef.current = source;

        const processor = audioContext.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        processor.onaudioprocess = (e) => {
          if (ws.readyState !== WebSocket.OPEN) return;

          const inputData = e.inputBuffer.getChannelData(0);
          
          // Downsample if necessary
          const downsampledData = actualSampleRate !== 16000 
            ? downsampleBuffer(new Float32Array(inputData), actualSampleRate, 16000)
            : new Float32Array(inputData);

          // Convert to Int16 PCM
          const pcmData = floatTo16BitPCM(downsampledData);
          
          // Base64 encode
          const base64Audio = int16ToBase64(pcmData);

          // Send to WebSocket
          const audioMessage = {
            realtimeInput: {
              mediaChunks: [{
                mimeType: "audio/pcm;rate=16000",
                data: base64Audio
              }]
            }
          };
          
          ws.send(JSON.stringify(audioMessage));
        };

        source.connect(processor);
        processor.connect(audioContext.destination);
      };

      ws.onmessage = handleMessage;

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        cleanup();
        setConnectionState("idle");
      };

      ws.onclose = () => {
        console.log('WebSocket closed');
        cleanup();
        setConnectionState("idle");
      };

    } catch (error) {
      console.error('Connection error:', error);
      cleanup();
      setConnectionState("idle");
    }
  }, [cleanup, handleMessage]);

  // Disconnect
  const disconnect = useCallback(() => {
    cleanup();
    setConnectionState("idle");
  }, [cleanup]);

  // Toggle connection
  const handleClick = () => {
    if (connectionState === "idle") {
      connect();
    } else if (connectionState === "active") {
      disconnect();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
      if (playbackContextRef.current) {
        playbackContextRef.current.close();
      }
    };
  }, [cleanup]);

  return (
    <button
      onClick={handleClick}
      disabled={connectionState === "connecting"}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        flex items-center justify-center
        shadow-lg transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${connectionState === "idle" 
          ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500" 
          : connectionState === "connecting"
          ? "bg-yellow-500 cursor-wait"
          : "bg-red-600 hover:bg-red-700 focus:ring-red-500"
        }
        ${connectionState === "active" ? "animate-pulse-ring" : ""}
      `}
      aria-label={
        connectionState === "idle" 
          ? "Start voice chat" 
          : connectionState === "connecting"
          ? "Connecting..."
          : "End voice chat"
      }
    >
      {connectionState === "connecting" ? (
        <Loader2 className="w-6 h-6 text-white animate-spin" />
      ) : (
        <Mic className="w-6 h-6 text-white" />
      )}
    </button>
  );
};

export default VoiceWidget;
