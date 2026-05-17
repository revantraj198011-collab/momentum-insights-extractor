import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 65, suffix: "%", label: "Cost Savings" },
  { value: 225, suffix: "%", label: "Faster Process" },
  { value: 172, suffix: "%", label: "Revenue Increase" },
  { value: 2.5, suffix: "x", label: "Sales Growth", decimals: 1 },
];

const useCountUp = (end: number, duration: number = 2000, decimals: number = 0) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeOut * end;
      
      setCount(Number(currentCount.toFixed(decimals)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration, decimals]);

  return { count, ref };
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const { count, ref } = useCountUp(stat.value, 2000, stat.decimals || 0);

  return (
    <div
      ref={ref}
      className="text-center animate-fade-in p-6 rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-card border border-border/80 shadow-[0_12px_28px_rgba(15,23,42,0.08)] hover:shadow-[0_18px_36px_rgba(15,23,42,0.12)] cursor-default"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="text-4xl md:text-5xl font-display font-bold text-foreground mb-2">
        {count}{stat.suffix}
      </div>
      <div className="text-foreground/60 text-sm md:text-base">
        {stat.label}*
      </div>
    </div>
  );
};

export const Stats = () => {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>
        <p className="text-center mt-8 text-xs text-foreground/50">
          *based on research and personal experience
        </p>
      </div>
    </section>
  );
};
