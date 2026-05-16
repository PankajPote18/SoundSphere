import { useState } from 'react';
import { ExternalLink, ChevronRight } from 'lucide-react';

const SettingsPage = () => {
  const tabs = [
    'Your account', 'Subscriptions', 'Orders', 'Player', 'Permissions', 
    'Subtitles', 'Devices', 'Language', 'Watch History', 'Hidden videos'
  ];
  
  const [activeTab, setActiveTab] = useState('Your account');

  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="bg-white w-full text-black pb-8 shadow-md">
        <div className="max-w-6xl mx-auto px-6 pt-6">
          <h1 className="text-2xl font-bold mb-6">Account & Settings</h1>
          
          {/* Tabs */}
          <div className="flex items-center space-x-6 border-b border-gray-300 overflow-x-auto hide-scrollbar relative">
            {tabs.map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                  activeTab === tab 
                    ? 'border-b-2 border-black text-black' 
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {tab}
              </button>
            ))}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white w-8 h-full pointer-events-none flex items-center justify-end">
              <ChevronRight size={16} className="text-gray-500" />
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            <div className="border border-gray-300 rounded-sm overflow-hidden">
              
              {/* Your details section */}
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-lg font-bold mb-4">Your details</h2>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-sm text-gray-700">
                    Change your Name, Email, Mobile Number, Password, and more.
                  </p>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-sm text-sm font-medium transition whitespace-nowrap">
                    <ExternalLink size={16} />
                    <span>Edit on Nexora</span>
                  </button>
                </div>
              </div>

              {/* Membership section */}
              <div className="p-6 border-b border-gray-300">
                <h2 className="text-lg font-bold mb-4">Nexora membership</h2>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <p className="text-sm text-gray-700">
                    Please go to the Nexora website to view details or make changes to your Nexora membership.
                  </p>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-sm text-sm font-medium transition whitespace-nowrap">
                    <ExternalLink size={16} />
                    <span>Manage or cancel</span>
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <p className="text-sm text-gray-700">
                    Payment method: <span className="text-gray-500">A payment method isn't saved</span>
                  </p>
                  <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-sm text-sm font-medium transition whitespace-nowrap">
                    <ExternalLink size={16} />
                    <span>Manage payment method</span>
                  </button>
                </div>
              </div>

              {/* Ad free section */}
              <div className="p-6 bg-white">
                <div className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm mb-4">
                  AD FREE
                </div>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-700 mb-2">
                      Purchase ad free to watch Nexora movies and TV shows without ads.
                    </p>
                    <p className="text-sm font-bold text-gray-900">₹129/month</p>
                  </div>
                  <button className="px-8 py-2 bg-[#1f2937] hover:bg-black text-white rounded-sm text-sm font-medium transition whitespace-nowrap">
                    Go ad free
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
