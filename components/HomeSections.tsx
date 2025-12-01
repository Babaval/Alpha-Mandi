import React from 'react';
import { OFFERS, REVIEWS } from '../constants';
import { Star, Clock, ShieldCheck, Award, TrendingUp, Quote } from 'lucide-react';

export const OffersSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-surface border-b border-white/5 relative overflow-hidden">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-serif text-white mb-12 text-center">Exclusive Privileges</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {OFFERS.map(offer => (
            <div key={offer.id} className="relative rounded-2xl p-8 flex flex-col sm:flex-row justify-between items-center shadow-2xl border border-white/10 overflow-hidden group bg-surface-light">
               {/* Gold Shine Effect */}
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
               
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full"></div>
              
              <div className="text-white mb-6 sm:mb-0 relative z-10">
                <h3 className="text-3xl font-serif font-bold mb-2 text-gold-gradient">{offer.title}</h3>
                <p className="text-gray-400 font-medium mb-4">{offer.description}</p>
                <div className="inline-flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg border border-primary/30 backdrop-blur-sm">
                  <span className="text-xs uppercase tracking-wider text-primary">Code</span>
                  <span className="font-mono font-bold text-lg tracking-widest text-white">{offer.code}</span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary-dark text-black font-serif font-bold h-24 w-24 rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(212,175,55,0.3)] rotate-12 group-hover:rotate-0 transition-transform duration-500">
                {offer.discount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrustSection: React.FC = () => {
  const items = [
    { icon: <Clock size={28} />, title: "30 Mins Delivery", desc: "Precision logistics" },
    { icon: <ShieldCheck size={28} />, title: "Hygienic Food", desc: "Gold standard safety" },
    { icon: <Award size={28} />, title: "Best Quality", desc: "Premium sourcing" },
    { icon: <TrendingUp size={28} />, title: "Top Rated", desc: "Community favorite" }
  ];

  return (
    <section className="py-24 px-4 bg-[#080808] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center group">
            <div className="text-primary mb-6 p-6 rounded-full border border-white/5 bg-surface-light group-hover:scale-110 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(212,175,55,0.2)] transition-all duration-500">
                {item.icon}
            </div>
            <h3 className="text-white font-serif text-lg font-bold mb-2">{item.title}</h3>
            <p className="text-gray-500 text-sm tracking-wide group-hover:text-gray-400 transition-colors">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-24 px-4 bg-surface">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-serif text-white mb-16 text-center">Guest Experiences</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map(review => (
            <div key={review.id} className="glass-panel p-8 rounded-2xl relative pt-12 mt-6 bg-surface-light/30 hover:bg-surface-light/50 transition-colors">
              <div className="absolute -top-6 left-8">
                 <img src={review.avatar} alt={review.user} className="w-16 h-16 rounded-full object-cover border-2 border-primary" />
              </div>
              <Quote size={48} className="absolute top-8 right-8 text-primary/10" />
              
              <div className="mb-4 mt-2">
                 <div className="flex text-primary text-xs mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-800" : ""} />
                    ))}
                  </div>
                  <h4 className="text-white font-serif text-lg">{review.user}</h4>
              </div>
              
              <p className="text-gray-400 italic font-light leading-relaxed">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const PartnersSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-600 uppercase tracking-[0.3em] text-[10px] mb-10">Trusted By Industry Leaders</p>
        <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Stylized Text Logos */}
           <span className="text-2xl font-bold font-serif text-white tracking-tighter">UBER<span className="text-primary">EATS</span></span>
           <span className="text-2xl font-bold font-serif text-white tracking-tighter">DOOR<span className="text-[#ff3008]">DASH</span></span>
           <span className="text-2xl font-bold font-serif text-white tracking-tighter italic">Visa</span>
           <span className="text-2xl font-bold font-serif text-white tracking-tighter">Mastercard</span>
           <span className="text-2xl font-bold font-serif text-white tracking-tighter text-[#00457C]">PayPal</span>
        </div>
      </div>
    </section>
  );
};