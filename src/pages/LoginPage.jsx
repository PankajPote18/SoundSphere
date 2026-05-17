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
    <div className="min-h-screen bg-[#0f1115] pt-24 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1a1d24] border border-gray-800 rounded-3xl p-8 shadow-2xl">
        
        {/* Placeholder Logo / Top Graphic */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-12 bg-gray-700/50 rounded-xl flex items-center justify-center">
             <span className="text-gray-400 text-xs font-bold">LOGO</span>
          </div>
        </div>

        <h2 className="text-center text-white font-bold text-xl mb-6">Login to Continue</h2>

        <form onSubmit={handleContinue} className="space-y-4">
          
          {/* Input Field */}
          <div className="flex items-center bg-[#252833] border border-gray-600 rounded-lg overflow-hidden focus-within:border-[#00A8E1] transition-colors">
            <div className="px-4 py-3 text-white font-medium border-r border-gray-600">
              +91
            </div>
            <input 
              type="tel"
              placeholder="Mobile no."
              className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder-gray-500"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value.replace(/\D/g, ''))}
              maxLength="10"
              autoFocus
            />
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            disabled={mobileNo.length < 10}
            className={`w-full py-3 rounded-lg font-bold transition-colors ${
              mobileNo.length >= 10 
                ? 'bg-[#00A8E1] hover:bg-[#008bc0] text-white shadow-lg' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

        </form>

        {/* Footer Text */}
        <div className="mt-8 text-center text-xs text-gray-400 leading-relaxed px-2">
          By Continuing you agree to our <a href="#" className="text-[#00A8E1] hover:underline">Terms Of Use</a> and 
          acknowledge that you have read our <a href="#" className="text-[#00A8E1] hover:underline">Privacy Policy.</a>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
