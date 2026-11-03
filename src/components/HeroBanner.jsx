import React, { useRef, useEffect } from 'react';
import { Search, Shuffle, Terminal } from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

const CATEGORIES = [
  { id: 'ALL', label: 'All Protocols' },
  { id: 'ACTION', label: 'Action' },
  { id: 'ARCADE', label: 'Arcade' },
  { id: 'PUZZLE', label: 'Puzzle' },
  { id: 'RETRO', label: 'Retro 8-Bit' },
  { id: 'SPEED', label: 'Speed & Reflex' },
  { id: 'FAVORITES', label: 'Favorites' },
];

export const HeroBanner = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  onRandomGame,
  favoritesCount,
  totalGames,
}) => {
  const searchInputRef = useRef(null);

  // Keyboard shortcut '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative border-b border-red-950/70 bg-[#07070b] py-8 px-4 sm:px-8 cyber-grid">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* Terminal Header Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-red-500 mb-2">
              <Terminal className="w-3.5 h-3.5 text-red-500" />
              <span>TERMINAL // ROOT PRIVILEGES GRANTED</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-400">UNRESTRICTED IFRAME ACCESS</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-wider text-neon-glow uppercase">
              RED <span className="text-red-500">CYBERNETICS</span>
            </h1>
            <p className="text-xs sm:text-sm font-mono-code text-zinc-400 mt-1 max-w-xl">
              Clean web games registry stored in <span className="text-red-400 font-semibold">games.json</span>. Zero external paywalls, stealth mode armed.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="flex items-center gap-3 font-mono-code text-xs">
            <div className="px-3.5 py-2 bg-black/60 border border-zinc-800 text-zinc-300 flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase">Total Archives</span>
              <span className="text-red-400 font-bold text-sm">{totalGames} Games</span>
            </div>
            <div className="px-3.5 py-2 bg-black/60 border border-zinc-800 text-zinc-300 flex flex-col">
              <span className="text-[10px] text-zinc-500 uppercase">Bookmarked</span>
              <span className="text-white font-bold text-sm">{favoritesCount} Saved</span>
            </div>
            <button
              onClick={() => {
                cyberAudio.playLaunch();
                onRandomGame();
              }}
              className="px-4 py-2 bg-red-950/50 hover:bg-red-600 border border-red-800 hover:border-red-500 text-red-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cyber-cut h-[54px] cursor-pointer"
              title="Launch random title"
            >
              <Shuffle className="w-4 h-4" />
              <span className="hidden sm:inline">RANDOM RUN</span>
            </button>
          </div>
        </div>

        {/* Search & Category Tabs */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-2">
          {/* Live Search bar */}
          <div className="relative w-full lg:max-w-md">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search by game title, category, or #tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 pr-12 bg-black/80 border border-zinc-800 hover:border-red-900/80 focus:border-red-500 text-white font-mono-code text-xs tracking-wide focus:outline-hidden transition-colors selection:bg-red-900"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
            <kbd className="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-mono-code bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xs">
              /
            </kbd>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    cyberAudio.playClick();
                    onCategoryChange(cat.id);
                  }}
                  className={`px-3 py-1.5 font-mono-code text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    active
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(255,0,60,0.5)]'
                      : 'bg-black/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-red-900/60'
                  }`}
                >
                  {cat.label}
                  {cat.id === 'FAVORITES' && favoritesCount > 0 && (
                    <span className="ml-1 text-[10px] opacity-80">({favoritesCount})</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
