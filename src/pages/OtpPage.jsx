import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const OtpPage = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get mobile number from login page, fallback if none
  const mobileNo = location.state?.mobileNo || '9999999999';

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    setError(''); // Clear error on typing
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
    const otpValue = otp.join('');
    
    if (otpValue.length === 4) {
      // Demo Logic Authentication
      if (mobileNo === '9999999999' && otpValue === '1234') {
        localStorage.setItem('user', JSON.stringify({ phone: mobileNo, isSubscribed: true }));
        navigate('/'); 
      } else if (mobileNo === '8888888888' && otpValue === '5678') {
        localStorage.setItem('user', JSON.stringify({ phone: mobileNo, isSubscribed: false }));
        navigate('/'); 
      } else {
        setError('Invalid credentials');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#080808] flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full max-w-[420px] bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 flex flex-col items-center">
        
        {/* SoundSphere Logo */}
        <div className="flex justify-center mb-8 w-full">
          <span className="text-2xl font-black text-white tracking-tight">
            Sound<span className="text-[#FF6B00]">Sphere</span>
          </span>
        </div>

        <h2 className="text-white font-bold text-2xl mb-2 tracking-wide text-center">Verify your number</h2>
        <p className="text-gray-400 text-sm mb-8 text-center font-medium">
          A 4-digit code was sent to <br/><span className="text-white mt-1 inline-block font-bold">+91 {mobileNo}</span>
        </p>

        <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
          
          {/* OTP Inputs */}
          <div className="flex justify-center space-x-4 mb-2 w-full">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-16 bg-[#161616] border ${error ? 'border-red-500' : 'border-white/10'} rounded-xl text-center text-white text-2xl font-black focus:border-[#FF6B00] focus:shadow-[0_0_15px_rgba(255,107,0,0.2)] focus:outline-none transition-all duration-300`}
              />
            ))}
          </div>

          {/* Error Message */}
          <div className="h-6 mb-6 mt-2 w-full text-center">
            {error && <span className="text-red-500 text-xs font-bold uppercase tracking-wider">{error}</span>}
          </div>

          {/* Continue Button */}
          <button 
            type="submit"
            disabled={otp.join('').length < 4}
            className={`w-full py-4 rounded-xl font-bold tracking-wider transition-all duration-300 uppercase text-sm mb-8 ${
              otp.join('').length === 4 
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] text-white shadow-[0_0_20px_rgba(255,107,0,0.3)] hover:shadow-[0_0_30px_rgba(255,107,0,0.5)] hover:scale-[1.02] cursor-pointer' 
                : 'bg-[#161616] text-gray-500 cursor-not-allowed border border-white/5'
            }`}
          >
            Verify
          </button>

          {/* Timer / Resend */}
          <div className="text-center w-full">
            <div className="text-[#FF6B00] font-black text-lg mb-2 drop-shadow-[0_0_8px_rgba(255,107,0,0.4)]">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
            {timeLeft === 0 ? (
              <button 
                type="button"
                onClick={() => setTimeLeft(30)}
                className="text-gray-300 text-sm hover:text-white transition-colors underline decoration-white/30 underline-offset-4 cursor-pointer font-medium"
              >
                Resend Code
              </button>
            ) : (
              <span className="text-gray-600 text-sm font-medium">Resend Code</span>
            )}
          </div>

        </form>
      </div>
    </div>
  );
};

export default OtpPage;
