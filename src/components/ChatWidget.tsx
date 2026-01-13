import { useEffect } from "react";

declare global {
  interface Window {
    OmniWidget?: {
      init?: (config: { name?: string }) => void;
    };
  }
}

export const ChatWidget = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("omnidimension-web-widget")) {
      return;
    }

    const script = document.createElement("script");
    script.id = "omnidimension-web-widget";
    script.src = "https://omnidim.io/web_widget.js?secret_key=e898b5bdb389303016c1808c597dbaca";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById("omnidimension-web-widget");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div 
      id="omni-widget-component" 
      className="fixed bottom-4 right-4 z-50"
      style={{ width: "70px", height: "70px" }}
    />
  );
};
