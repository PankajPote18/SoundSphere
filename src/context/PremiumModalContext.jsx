import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, X } from 'lucide-react';

const PremiumModalContext = createContext();

export const usePremiumModal = () => useContext(PremiumModalContext);

export const PremiumModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const showModal = () => setIsOpen(true);
  const hideModal = () => setIsOpen(false);

  const handleSubscribe = () => {
    setIsOpen(false);
    navigate('/plans');
  };

  return (
    <PremiumModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-[#0A0A0A] border border-[#FF6B00]/20 rounded-3xl p-8 max-w-sm w-full shadow-[0_0_50px_rgba(255,107,0,0.15)] relative animate-in fade-in zoom-in duration-300">
            <button onClick={hideModal} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">
              <X size={20} />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mb-6 mx-auto border border-[#FF6B00]/30 shadow-[0_0_20px_rgba(255,107,0,0.2)]">
              <Lock className="text-[#FF6B00]" size={32} />
            </div>
            <h3 className="text-2xl font-black text-white text-center mb-3 tracking-tight">Premium Content</h3>
            <p className="text-gray-400 text-sm text-center mb-8 leading-relaxed">
              You need an active subscription to watch this audio. Unlock unlimited access to SoundSphere today!
            </p>
            <button onClick={handleSubscribe} className="w-full py-3.5 bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:scale-[1.02] text-white rounded-xl font-bold transition-all shadow-lg tracking-wide uppercase text-sm cursor-pointer">
              Explore Plans
            </button>
          </div>
        </div>
      )}
    </PremiumModalContext.Provider>
  );
};
