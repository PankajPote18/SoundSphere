import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { plansApi } from '../services/api';

const PlansPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only active plans from backend
    plansApi
      .getAll(true)
      .then((data) => {
        setPlans(data);
        // Pre-select the recommended plan, or fall back to the first active plan
        const recommended = data.find((p) => p.is_recommended);
        setSelectedPlan(recommended?.id ?? data[0]?.id ?? null);
      })
      .catch((err) => console.error('Plans fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  // Compute discount percentage for display
  const discountPercent = (plan) => {
    if (!plan.original_price || plan.original_price === 0) return '0%';
    const pct = ((plan.original_price - plan.discounted_price) / plan.original_price) * 100;
    return `${Math.round(pct)}%`;
  };

  return (
    <div className="w-full bg-[#080808] pt-24 pb-12 flex flex-col items-center px-4 min-h-[calc(100vh-80px)] relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00]/10 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="w-full max-w-md bg-[#0f0f0f]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors cursor-pointer p-2 hover:bg-white/5 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        
        <h1 className="text-white text-2xl font-black text-center mb-10 tracking-wider">
          EXPLORE PLANS
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#FF6B00]" size={28} />
          </div>
        ) : (
          <>
            <div className="space-y-5 mb-8">
              {plans.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div className="relative" key={plan.id}>
                    {/* Recommended Badge */}
                    {plan.is_recommended && (
                      <div className="absolute -top-3 left-6 bg-[#161616] border border-[#FF6B00]/40 text-[#FF6B00] text-[10px] font-black px-4 py-1 rounded-full z-20 shadow-[0_0_10px_rgba(255,107,0,0.2)] flex items-center gap-1 uppercase tracking-wider">
                        <Sparkles size={10} /> Recommended
                      </div>
                    )}

                    <div
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`relative overflow-hidden flex items-center justify-between p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? 'border-2 border-[#FF6B00] bg-[#FF6B00]/10 shadow-[0_0_20px_rgba(255,107,0,0.15)] scale-[1.02]'
                          : 'border border-white/10 bg-[#161616] hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      {/* Left: Radio & Title */}
                      <div className="flex items-center space-x-4 z-10">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            isSelected ? 'border-[#FF6B00] shadow-[0_0_8px_rgba(255,107,0,0.4)]' : 'border-gray-600'
                          }`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]"></div>
                          )}
                        </div>
                        <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {plan.name}
                        </span>
                      </div>

                      {/* Middle: Pricing */}
                      <div className="flex flex-col items-end z-10 mr-14 md:mr-16">
                        <span className="text-white font-black text-xl tracking-tight">
                          ₹{plan.discounted_price}
                        </span>
                        {plan.original_price > plan.discounted_price && (
                          <span className="text-gray-500 line-through text-xs font-medium">
                            ₹{plan.original_price}
                          </span>
                        )}
                      </div>

                      {/* Right: Discount Graphic */}
                      {plan.original_price > plan.discounted_price && (
                        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-20 bg-gradient-to-br from-[#FF6B00] to-[#FF8C1A] rounded-l-[2rem] flex flex-col items-center justify-center text-white shadow-[-5px_0_15px_rgba(255,107,0,0.2)]">
                          <span className="font-black text-lg md:text-xl leading-none drop-shadow-md">
                            {discountPercent(plan)}
                          </span>
                          <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5 opacity-90">Off</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pay Now Button */}
            <button className="w-full py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF8C1A] hover:shadow-[0_0_20px_rgba(255,107,0,0.4)] hover:scale-[1.02] text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all duration-300 cursor-pointer">
              Continue to Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlansPage;
