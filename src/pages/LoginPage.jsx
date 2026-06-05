import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [mobileNo, setMobileNo] = useState('');
  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (mobileNo.length >= 10) {
      navigate('/verify-otp', { state: { mobileNo } });
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full max-w-[420px] bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* SoundSphere Logo */}
        <div className="flex justify-center mb-8">
          <span className="text-2xl font-black text-white tracking-tight">
            Sound<span className="text-[#FF6B00]">Sphere</span>
          </span>
        </div>

        <h2 className="text-center text-white font-bold text-2xl mb-8 tracking-wide">Log in to your account</h2>

        <form onSubmit={handleContinue} className="space-y-6">
          
          {/* Input Field */}
          <div className="relative">
            <div className="flex items-center bg-[#161616] border border-white/10 rounded-xl overflow-hidden focus-within:border-[#FF6B00] focus-within:shadow-[0_0_15px_rgba(255,107,0,0.15)] transition-all duration-300 group">
              <div className="px-5 py-4 text-gray-400 font-semibold border-r border-white/5 group-focus-within:text-[#FF6B00] transition-colors">
                +91
              </div>
              <input 
                type="tel"
                placeholder="Mobile Number"
                className="w-full bg-transparent text-white px-5 py-4 outline-none placeholder-gray-600 font-medium tracking-wide"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, ''))}
                maxLength="10"
                autoFocus
              />
            </div>
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            disabled={mobileNo.length < 10}
            className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 uppercase text-sm ${
              mobileNo.length >= 10 
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:scale-[1.02] cursor-pointer' 
                : 'bg-[#161616] text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            Continue
          </button>

        </form>

        {/* Footer Text */}
        <div className="mt-10 text-center text-[11px] text-gray-500 leading-relaxed px-4">
          By continuing you agree to our <a href="#" className="text-[#FF6B00] hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Terms Of Use</a> and 
          acknowledge that you have read our <a href="#" className="text-[#FF6B00] hover:text-white transition-colors underline decoration-white/20 underline-offset-4">Privacy Policy</a>.
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
