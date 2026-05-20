import { useState } from 'react';
import { Search, Edit2, Check, X } from 'lucide-react';

// Custom Toggle Component matching the reference UI
const CustomToggle = ({ isOn, onToggle }) => (
  <button 
    onClick={onToggle}
    className={`w-14 h-7 rounded-full relative transition-colors duration-300 flex items-center ${isOn ? 'bg-[#22c55e]' : 'bg-[#475569]'}`}
  >
    <div className={`w-6 h-6 rounded-full bg-white absolute top-0.5 transition-transform duration-300 flex items-center justify-center ${isOn ? 'translate-x-7' : 'translate-x-0.5'}`}>
      {isOn ? <Check size={14} className="text-[#22c55e]" strokeWidth={3} /> : <X size={14} className="text-gray-400" strokeWidth={3} />}
    </div>
  </button>
);

const AdminSubscriptions = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: 'Daily', originalPrice: '10.00', discountedPrice: '7.00', discountPercent: '30.00 %', cycle: 'DAILY', days: 1, sort: 1, status: false },
    { id: 2, name: 'Weekly', originalPrice: '70.00', discountedPrice: '42.00', discountPercent: '40.00 %', cycle: 'WEEKLY', days: 7, sort: 2, status: true },
    { id: 3, name: 'Monthly', originalPrice: '300.00', discountedPrice: '149.00', discountPercent: '50.33 %', cycle: 'MONTHLY', days: 30, sort: 3, status: true },
    { id: 4, name: 'Yearly', originalPrice: '2000.00', discountedPrice: '799.00', discountPercent: '60.05 %', cycle: 'YEARLY', days: 365, sort: 4, status: true },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);

  const toggleStatus = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, status: !p.status } : p));
  };

  const handleEdit = (plan) => {
    setEditingPlan({ ...plan });
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-400 font-medium text-sm">Results :</span>
          <select className="bg-[#141a29] border border-gray-700 text-white rounded-md px-3 py-1.5 outline-none focus:border-[#3b82f6] text-sm font-medium cursor-pointer">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
        </div>
        
        <div className="relative w-full sm:w-auto">
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-[#141a29] border border-gray-700 text-white rounded-full pl-4 pr-10 py-1.5 outline-none focus:border-[#3b82f6] text-sm w-full sm:w-64 placeholder-gray-500 transition-all focus:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
          />
          <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 bg-[#141a29] rounded-xl border border-gray-800 overflow-hidden shadow-2xl flex flex-col">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm text-gray-300 min-w-[800px]">
            <thead className="bg-[#1e293b]/80 border-b border-gray-800 text-gray-300 font-semibold uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 w-12"><div className="w-4 h-4 rounded bg-[#334155]"></div></th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Original Price</th>
                <th className="px-6 py-4 text-[#3b82f6]">Discounted Price</th>
                <th className="px-6 py-4">Discount Percentage</th>
                <th className="px-6 py-4">Billing Cycle</th>
                <th className="px-6 py-4">Number of Days</th>
                <th className="px-6 py-4">Sorting Number</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {plans.map((plan) => (
                <tr key={plan.id} className="hover:bg-[#1e2638] transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-4 h-4 rounded bg-[#334155]"></div>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{plan.name}</td>
                  <td className="px-6 py-4">{plan.originalPrice}</td>
                  <td className="px-6 py-4 text-[#3b82f6] font-medium">{plan.discountedPrice}</td>
                  <td className="px-6 py-4">{plan.discountPercent}</td>
                  <td className="px-6 py-4">{plan.cycle}</td>
                  <td className="px-6 py-4">{plan.days}</td>
                  <td className="px-6 py-4">{plan.sort}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <CustomToggle isOn={plan.status} onToggle={() => toggleStatus(plan.id)} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button onClick={() => handleEdit(plan)} className="text-gray-400 hover:text-[#3b82f6] transition-colors">
                        <Edit2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-800 mt-auto flex items-center justify-between text-sm text-gray-400 bg-[#141a29]">
          <div className="border border-[#3b82f6]/30 text-[#3b82f6] px-4 py-1.5 rounded-md font-medium text-xs bg-[#3b82f6]/10">
            Showing page 1 of 1
          </div>
          <div className="flex flex-1 mx-4 h-1.5 bg-gray-700 rounded-full overflow-hidden">
             <div className="w-1/4 h-full bg-[#e2e8f0]"></div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-1 text-gray-500 hover:text-white transition-colors">←</button>
            <button className="w-8 h-8 rounded-md bg-[#3b82f6] text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/20">1</button>
            <button className="p-1 text-gray-500 hover:text-white transition-colors">→</button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1e2638] rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
            
            {/* Modal Header */}
            <div className="p-4 md:p-6 border-b border-gray-700/50 shrink-0">
              <h2 className="text-lg md:text-xl font-bold text-white tracking-wide">Update Subscription Plan</h2>
            </div>
            
            {/* Modal Body */}
            <div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 overflow-y-auto custom-scrollbar">
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Name <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.name || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Original Price <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.originalPrice || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, originalPrice: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Discounted Price <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.discountedPrice || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, discountedPrice: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Billing Cycle <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.cycle || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, cycle: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all uppercase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Number of Days <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.days || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, days: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-white tracking-wide flex items-center">
                  Sorting Number <span className="text-red-500 ml-1">*</span>
                </label>
                <input 
                  type="text" 
                  value={editingPlan?.sort || ''}
                  onChange={(e) => setEditingPlan({...editingPlan, sort: e.target.value})}
                  className="w-full bg-[#3b82f6]/20 border-none text-[#4aa5ff] rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#3b82f6]/50 font-medium transition-all"
                />
              </div>
              
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 md:p-6 border-t border-gray-700/50 flex justify-end items-center space-x-4 bg-[#141a29]/50 shrink-0">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 md:px-6 md:py-2.5 rounded-lg bg-[#334155] text-white font-medium hover:bg-[#475569] transition-colors text-sm md:text-base"
              >
                Discard
              </button>
              <button 
                onClick={() => {
                  setPlans(plans.map(p => p.id === editingPlan.id ? editingPlan : p));
                  setIsModalOpen(false);
                }}
                className="px-6 py-2 md:px-8 md:py-2.5 rounded-lg bg-[#22c55e] text-white font-bold hover:bg-[#16a34a] transition-colors shadow-lg shadow-green-500/20 text-sm md:text-base"
              >
                Save
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSubscriptions;
