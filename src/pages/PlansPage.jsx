import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
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
    if (!plan.original_price || plan.original_price === 0) return '0 %';
    const pct = ((plan.original_price - plan.discounted_price) / plan.original_price) * 100;
    return `${Math.round(pct)} %`;
  };

  return (
    <div className="w-full bg-bg-dark pt-24 pb-12 flex flex-col items-center px-4 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mt-8">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-white text-2xl font-bold text-center mb-8 tracking-wide">
          EXPLORE PLANS
        </h1>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="animate-spin text-[#00A8E1]" size={28} />
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {plans.map((plan) => (
                <div className="relative" key={plan.id}>
                  {/* Recommended Badge */}
                  {plan.is_recommended && (
                    <div className="absolute -top-3 left-6 bg-[#1a1d24] border border-gray-700 text-[#00A8E1] text-[10px] font-bold px-3 py-1 rounded-full z-10">
                      Recommended
                    </div>
                  )}

                  <div
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative overflow-hidden flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'border-[#00A8E1] bg-[#00A8E1]/5'
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {/* Left: Radio & Title */}
                    <div className="flex items-center space-x-3 md:space-x-4 z-10">
                      <div
                        className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          selectedPlan === plan.id ? 'border-[#00A8E1]' : 'border-gray-500'
                        }`}
                      >
                        {selectedPlan === plan.id && (
                          <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#00A8E1]"></div>
                        )}
                      </div>
                      <span className="text-white font-bold text-base md:text-lg">{plan.name}</span>
                    </div>

                    {/* Middle: Pricing */}
                    <div className="flex items-center space-x-1 md:space-x-2 z-10 mr-12 md:mr-16">
                      <span className="text-white font-bold text-base md:text-lg">
                        ₹ {plan.discounted_price}
                      </span>
                      <span className="text-gray-500 line-through text-xs md:text-sm">
                        ₹{plan.original_price}
                      </span>
                    </div>

                    {/* Right: Discount Graphic */}
                    <div className="absolute right-0 top-0 bottom-0 w-20 md:w-24 bg-[#7a8b86] rounded-l-[40px] flex flex-col items-center justify-center text-white">
                      <span className="font-bold text-base md:text-lg leading-tight">
                        {discountPercent(plan)}
                      </span>
                      <span className="text-[10px] uppercase font-semibold">Off</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pay Now Button */}
            <button className="w-full py-4 bg-[#00A8E1] hover:bg-[#008bc0] text-white font-bold text-lg rounded-full shadow-lg hover:scale-[1.02] transition-all duration-200">
              Pay Now
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlansPage;
