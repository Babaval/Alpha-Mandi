import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Terminal } from 'lucide-react';

interface FooterProps {
  onDevClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onDevClick }) => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-white tracking-widest font-bold uppercase">Alpha <span className="text-primary">Mandi</span></span>
              <span className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-1">Fine Dining Experience</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-light">
              Where tradition meets luxury. Experience the authentic taste of Arabian hospitality mixed with global flavors in an ambiance of pure elegance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-primary uppercase tracking-widest">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Home</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Reservations</a></li>
              <li><a href="#" className="hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span>Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-primary uppercase tracking-widest">Contact Us</h3>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <span>123 Culinary Avenue,<br />Golden District, FD 45001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary" />
                <span>concierge@alphamandi.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-6 text-primary uppercase tracking-widest">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4 font-light">Subscribe for exclusive offers and seasonal menu updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm w-full focus:outline-none focus:border-primary text-white"
              />
              <button className="bg-primary text-black px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-gray-600 text-xs tracking-wider">
              © 2024 Alpha Mandi. All rights reserved.
            </p>
            {onDevClick && (
              <button 
                onClick={onDevClick} 
                className="text-xs text-gray-700 hover:text-primary flex items-center gap-1 transition-colors"
              >
                <Terminal size={10} /> Developer Portal
              </button>
            )}
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Facebook size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Instagram size={18} /></a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors"><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};