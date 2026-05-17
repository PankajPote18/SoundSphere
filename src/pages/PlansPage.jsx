import { useState } from 'react';

const PlansPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('Monthly');

  const plans = [
    {
      id: 'Weekly',
      price: 99,
      originalPrice: 150,
      discount: '34 %',
      recommended: true,
    },
    {
      id: 'Monthly',
      price: 199,
      originalPrice: 500,
      discount: '60 %',
      recommended: false,
    },
    {
      id: 'Yearly',
      price: 499,
      originalPrice: 2000,
      discount: '75 %',
      recommended: false,
    }
  ];

  return (
    <div className="w-full bg-[#0f1115] pt-24 pb-8 flex flex-col items-center px-4">
      
      <div className="w-full max-w-md bg-black border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mt-8">
        
        <h1 className="text-white text-2xl font-bold text-center mb-8 tracking-wide">
          EXPLORE PLANS
        </h1>

        <div className="space-y-4 mb-8">
          {plans.map((plan) => (
            <div className="relative" key={plan.id}>
              {/* Recommended Badge */}
              {plan.recommended && (
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
                  <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedPlan === plan.id ? 'border-[#00A8E1]' : 'border-gray-500'
                  }`}>
                    {selectedPlan === plan.id && (
                      <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#00A8E1]"></div>
                    )}
                  </div>
                  <span className="text-white font-bold text-base md:text-lg">{plan.id}</span>
                </div>

                {/* Middle: Pricing */}
                <div className="flex items-center space-x-1 md:space-x-2 z-10 mr-12 md:mr-16">
                  <span className="text-white font-bold text-base md:text-lg">₹ {plan.price}</span>
                  <span className="text-gray-500 line-through text-xs md:text-sm">₹{plan.originalPrice}</span>
                </div>

                {/* Right: Discount Graphic */}
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-24 bg-[#7a8b86] rounded-l-[40px] flex flex-col items-center justify-center text-white">
                   <span className="font-bold text-base md:text-lg leading-tight">{plan.discount}</span>
                   <span className="text-[10px] uppercase font-semibold">Off</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pay Now Button */}
        <button className="w-full py-4 bg-[#00A8E1] hover:bg-[#008bc0] text-white font-bold text-lg rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-200">
          Pay Now
        </button>

      </div>
    </div>
  );
};

export default PlansPage;
