import React, { useState } from 'react';
import { MenuItem, Category } from '../types';
import { MENU_ITEMS } from '../constants';
import { Plus, Flame } from 'lucide-react';

interface MenuProps {
  addToCart: (item: MenuItem) => void;
}

export const Menu: React.FC<MenuProps> = ({ addToCart }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-surface pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-surface-light/20 to-transparent"></div>
      
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-5xl font-serif text-white mb-4">Culinary Masterpieces</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto tracking-wide">Curated flavors from the heart of Arabia.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 relative z-10">
        <CategoryButton 
          active={activeCategory === 'All'} 
          onClick={() => setActiveCategory('All')} 
          label="All Collections" 
        />
        {Object.values(Category).map(cat => (
          <CategoryButton 
            key={cat} 
            active={activeCategory === cat} 
            onClick={() => setActiveCategory(cat)} 
            label={cat} 
          />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-8xl mx-auto relative z-10">
        {filteredItems.map(item => (
          <div key={item.id} className="group relative bg-surface-light rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-500 shadow-2xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] border border-white/5 hover:border-primary/30">
            
            {/* Image Area */}
            <div className="h-72 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-surface-light via-transparent to-transparent z-10 opacity-80"></div>
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 grayscale-[20%] group-hover:grayscale-0"
              />
              <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 flex items-center gap-1">
                <Flame size={12} className="text-primary" /> {item.calories} kcal
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6 relative z-20 -mt-20">
              <div className="glass-panel bg-[#151515]/95 rounded-xl p-5 shadow-2xl backdrop-blur-xl border border-white/5">
                 <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-serif text-white leading-tight pr-2 group-hover:text-primary transition-colors">{item.name}</h3>
                    <span className="text-primary font-bold text-lg drop-shadow-md">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-xs mb-6 h-10 leading-relaxed overflow-hidden text-ellipsis line-clamp-2">{item.description}</p>
                  
                  <button 
                    onClick={() => addToCart(item)}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-primary text-gray-300 hover:text-black border border-white/10 hover:border-primary rounded-lg transition-all duration-300 uppercase text-xs tracking-widest font-bold group/btn"
                  >
                    <Plus size={14} className="group-hover/btn:rotate-90 transition-transform" /> Add to Order
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
      active 
        ? 'bg-primary border-primary text-black shadow-[0_0_15px_rgba(212,175,55,0.3)] transform scale-105' 
        : 'bg-transparent border-white/10 text-gray-500 hover:border-primary/50 hover:text-primary hover:bg-white/5'
    }`}
  >
    {label}
  </button>
);