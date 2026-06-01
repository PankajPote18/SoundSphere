import { Search } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const SearchBar = ({ variant = 'mobile' }) => {

  const navigate = useNavigate();

  if (variant === 'desktop') {

    return (

      <div className="w-full px-6 mb-2">

        <div

          onClick={() => navigate('/search')}

          className="w-[380px] flex items-center justify-between bg-[#000000]/50 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 hover:bg-[#000000]/70 hover:border-[#FF6B00]/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all duration-300 cursor-pointer shadow-lg group"

        >

          <div className="flex items-center space-x-2 flex-grow">

            <Search size={16} className="text-[#FF6B00] group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.8)] transition-all" />

            <span className="text-gray-400 text-sm font-medium w-full text-left truncate">

              Search songs, podcasts, albums...

            </span>

          </div>

        </div>

      </div>

    );

  }

  // variant === 'mobile': absolute overlay at top of hero banner, just below navbar

  return (

    <div className="md:hidden absolute top-[72px] left-0 z-30 px-3 w-full pointer-events-none">

      <div

        onClick={() => navigate('/search')}

        className="pointer-events-auto w-full flex items-center bg-[#000000]/50 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5 hover:bg-[#000000]/70 hover:border-[#FF6B00]/50 hover:shadow-[0_0_15px_rgba(255,107,0,0.2)] transition-all duration-300 cursor-pointer shadow-lg group"

      >

        <Search size={13} className="text-[#FF6B00] shrink-0 group-hover:drop-shadow-[0_0_8px_rgba(255,107,0,0.8)] transition-all" />

        <span className="text-gray-400 text-[12px] font-medium ml-2 truncate">

          Search songs, podcasts, albums...

        </span>

      </div>

    </div>

  );

};

export default SearchBar;
