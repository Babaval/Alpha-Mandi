import React from "react";

interface HeroProps {
  onOrderNow: () => void;
  onReserveNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onReserveNow }) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-surface">
      {/* Background Image with Cinematic Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105 animate-[pulse-slow_10s_ease-in-out_infinite]"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface opacity-80"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* EST 2024 */}
        <div className="mb-8 flex justify-center items-center gap-4 animate-fade-in-up">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-primary"></div>
          <span className="text-primary text-sm md:text-base font-bold tracking-[0.4em] uppercase">
            Est. 2024
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-primary"></div>
        </div>

        {/* Headline */}
        <h1
          className="text-6xl md:text-9xl font-serif text-white mb-8 leading-none tracking-tight animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          Alpha <span className="text-gold-gradient italic pr-2">Mandi</span>
        </h1>

        {/* Description */}
        <p
          className="text-gray-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Experience the pinnacle of Arabian culinary art. A symphony of
          authentic spices, premium meats, and modern luxury.
        </p>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          {/* Reserve Table Button */}
          <button
            onClick={onReserveNow}
            className="group relative px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-black font-bold uppercase tracking-[0.2em] overflow-hidden rounded-sm hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            <span className="relative">Reserve Table</span>
          </button>

          {/* Order Online Button */}
          <button
            onClick={onOrderNow}
            className="px-10 py-4 border border-primary/30 text-primary hover:text-black hover:bg-primary font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-sm backdrop-blur-sm bg-black/20"
          >
            Order Online
          </button>
        </div>
      </div>
    </div>
  );
};
