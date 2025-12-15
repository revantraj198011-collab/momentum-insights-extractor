const stats = [
  { value: "65%", label: "Cost Savings" },
  { value: "225%", label: "Faster Process" },
  { value: "172%", label: "Revenue Increase" },
  { value: "2.5x", label: "Sales Growth" },
];

export const Stats = () => {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm md:text-base">
                {stat.label}*
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
