import React, { useState } from 'react';
import { X, Calendar, Users, UtensilsCrossed, CheckCircle, ChefHat, PartyPopper, Briefcase } from 'lucide-react';

interface CateringSectionProps {
  onOpenRequest: () => void;
}

export const CateringSection: React.FC<CateringSectionProps> = ({ onOpenRequest }) => {
  return (
    <section className="relative py-24 px-4 bg-surface overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div>
              <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Events & Occasions</span>
              <h2 className="text-5xl lg:text-6xl font-serif text-white leading-none mb-6">
                Royal Catering <br/>
                <span className="text-gold-gradient italic text-4xl lg:text-5xl">By Alpha Mandi</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-primary to-transparent mb-8"></div>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                Elevate your special moments with our signature culinary excellence. From intimate birthday gatherings to grand wedding banquets, 
                we bring the authentic taste of Mandi and premium hospitality to your venue.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-surface-light border border-white/5 p-6 rounded-xl text-center hover:border-primary/50 transition-all hover:-translate-y-1 group">
                <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-primary text-primary transition-colors">
                  <ChefHat size={24} />
                </div>
                <h4 className="text-white font-serif font-bold mb-1">Weddings</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Grand Banquets</p>
              </div>
              <div className="bg-surface-light border border-white/5 p-6 rounded-xl text-center hover:border-primary/50 transition-all hover:-translate-y-1 group">
                <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-primary text-primary transition-colors">
                  <PartyPopper size={24} />
                </div>
                <h4 className="text-white font-serif font-bold mb-1">Birthdays</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Intimate Parties</p>
              </div>
              <div className="bg-surface-light border border-white/5 p-6 rounded-xl text-center hover:border-primary/50 transition-all hover:-translate-y-1 group">
                <div className="bg-black w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10 group-hover:border-primary text-primary transition-colors">
                  <Briefcase size={24} />
                </div>
                <h4 className="text-white font-serif font-bold mb-1">Corporate</h4>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Executive Lunches</p>
              </div>
            </div>

            <button 
              onClick={onOpenRequest}
              className="px-10 py-4 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors rounded-sm shadow-[0_0_20px_rgba(212,175,55,0.3)] mt-4"
            >
              Request A Quote
            </button>
          </div>

          {/* Image Grid */}
          <div className="relative h-[600px] hidden lg:block">
            <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
              <img 
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Banquet" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-2/3 h-1/2 rounded-2xl overflow-hidden border-4 border-surface shadow-2xl z-10 group">
              <img 
                src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Catering Setup" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="font-serif text-2xl italic text-primary">"Memories made flavorful"</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

interface CateringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CateringModal: React.FC<CateringModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'FORM' | 'SUCCESS'>('FORM');
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('SUCCESS');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="bg-surface-light border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-fade-in-up relative flex flex-col max-h-[90vh]">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white z-10"
        >
          <X size={24} />
        </button>

        {step === 'FORM' ? (
          <div className="flex flex-col h-full">
            <div className="p-8 border-b border-white/10 bg-black/20">
              <h2 className="text-3xl font-serif text-white mb-2">Plan Your Event</h2>
              <p className="text-gray-400 text-sm font-light">Tell us about your occasion, and we'll craft the perfect menu.</p>
            </div>
            
            <div className="p-8 overflow-y-auto custom-scrollbar">
              <form id="catering-form" onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Contact Name</label>
                    <input required type="text" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Phone Number</label>
                    <input required type="tel" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700" placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Event Type</label>
                    <div className="relative">
                      <select className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none appearance-none cursor-pointer">
                        <option>Wedding Reception</option>
                        <option>Birthday Party</option>
                        <option>Corporate Event</option>
                        <option>Family Gathering</option>
                        <option>Other</option>
                      </select>
                      <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                        <UtensilsCrossed size={16} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Guest Count (Approx)</label>
                    <div className="relative">
                      <input required type="number" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none placeholder-gray-700" placeholder="e.g. 50" />
                      <div className="absolute right-4 top-3.5 pointer-events-none text-gray-400">
                        <Users size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Event Date</label>
                  <input required type="date" className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none [color-scheme:dark]" />
                </div>

                <div>
                  <label className="block text-[10px] text-primary font-bold uppercase tracking-widest mb-2">Special Requests</label>
                  <textarea className="w-full bg-black border border-white/10 rounded px-4 py-3 text-white focus:border-primary focus:outline-none h-32 resize-none placeholder-gray-700" placeholder="e.g. Vegetarian options needed, No nuts, Mandi preference..."></textarea>
                </div>

              </form>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20">
              <button 
                type="submit" 
                form="catering-form"
                className="w-full bg-primary text-black font-bold py-4 rounded uppercase tracking-widest hover:bg-white transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[500px] p-8 text-center bg-surface-light">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
              <CheckCircle size={48} className="text-primary" />
            </div>
            <h2 className="text-3xl font-serif text-white mb-4">Request Received</h2>
            <p className="text-gray-400 max-w-md mb-8 font-light">
              Thank you for choosing Alpha Mandi. Our events concierge will review your requirements and contact you shortly.
            </p>
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors rounded-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};