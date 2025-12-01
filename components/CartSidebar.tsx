import React from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2 } from 'lucide-react';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  updateQuantity: (id: number, delta: number) => void;
  removeItem: (id: number) => void;
  onCheckout?: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  updateQuantity, 
  removeItem,
  onCheckout
}) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-surface-light border-l border-white/10 shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-white/10 flex justify-between items-center bg-black/20">
            <h2 className="text-2xl font-serif text-white">Your Selection</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p className="text-sm tracking-wide">Your cart is empty.</p>
                <button onClick={onClose} className="mt-4 text-primary hover:underline text-sm uppercase font-bold tracking-widest">
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md border border-white/10" />
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <h3 className="font-medium text-white font-serif">{item.name}</h3>
                      <span className="text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">${item.price} each</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-white/20 rounded-md bg-black/20">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 text-sm text-white font-mono">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-600 hover:text-red-400 ml-auto transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 uppercase tracking-wider text-xs">Total</span>
              <span className="text-3xl font-serif text-primary">${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="w-full py-4 bg-primary text-black font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.2)]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};