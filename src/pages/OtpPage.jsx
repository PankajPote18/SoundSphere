import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (otp.join('').length === 4) {
      navigate('/plans');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] pt-24 pb-12 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-[#1a1d24] border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col items-center">
        
        {/* Placeholder Logo / Top Graphic */}
        <div className="w-32 h-16 bg-gray-700/50 rounded-2xl mb-6 flex items-center justify-center">
           <span className="text-gray-400 text-xs font-bold">LOGO</span>
        </div>

        <h2 className="text-white font-bold text-xl mb-2">OTP Verification</h2>
        <p className="text-gray-400 text-xs mb-8 text-center">
          OTP has been sent to +91 9999999999
        </p>

        <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
          
          {/* OTP Inputs */}
          <div className="flex justify-center space-x-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 bg-[#252833] border border-gray-600 rounded-lg text-center text-white text-xl font-bold focus:border-[#00A8E1] focus:outline-none transition-colors"
              />
            ))}
          </div>

          {/* Timer / Resend */}
          <div className="text-center mb-8">
            <div className="text-[#00A8E1] font-bold mb-1">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
            {timeLeft === 0 ? (
              <button 
                type="button"
                onClick={() => setTimeLeft(30)}
                className="text-gray-300 text-sm hover:text-white transition-colors underline"
              >
                Resend now
              </button>
            ) : (
              <span className="text-gray-500 text-sm">Resend now</span>
            )}
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            disabled={otp.join('').length < 4}
            className={`w-full py-3 rounded-lg font-bold transition-colors ${
              otp.join('').length === 4 
                ? 'bg-[#00A8E1] hover:bg-[#008bc0] text-white shadow-lg' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

        </form>
      </div>
    </div>
  );
};

export default OtpPage;
