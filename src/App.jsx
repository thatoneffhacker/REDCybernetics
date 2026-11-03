import React, { useState, useEffect, useMemo } from 'react';
import defaultGamesData from './data/games.json';
import { cyberAudio } from './utils/audio.js';
import { Navbar } from './components/Navbar.jsx';
import { HeroBanner } from './components/HeroBanner.jsx';
import { GameCard } from './components/GameCard.jsx';
import { GamePlayerModal } from './components/GamePlayerModal.jsx';
import { AddGameModal } from './components/AddGameModal.jsx';
import { JsonEditorModal } from './components/JsonEditorModal.jsx';
import { StealthDisguise } from './components/StealthDisguise.jsx';
import { Flame, History, Terminal, Shield, Plus, RotateCcw } from 'lucide-react';

const STORAGE_KEY_GAMES = 'redline_games_library_v1';
const STORAGE_KEY_FAVS = 'redline_favorites_v1';
const STORAGE_KEY_RECENT = 'redline_recently_played_v1';
const STORAGE_KEY_SCANLINES = 'redline_scanlines_v1';
const STORAGE_KEY_AUDIO = 'redline_audio_v1';

export default function App() {
  // Game library state initialized from localStorage or default JSON
  const [games, setGames] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_GAMES);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return defaultGamesData;
  });

  // Favorites state
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_FAVS);
      return stored ? JSON.parse(stored) : ['2048', 'tetris-matrix'];
    } catch {
      return ['2048', 'tetris-matrix'];
    }
  });

  // Recently played IDs
  const [recentIds, setRecentIds] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_RECENT);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [activeGame, setActiveGame] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState(false);
  const [isPanicActive, setIsPanicActive] = useState(false);

  // Settings
  const [scanlinesEnabled, setScanlinesEnabled] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_SCANLINES) !== 'false';
  });

  const [audioEnabled, setAudioEnabled] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_AUDIO) !== 'false';
  });

  // Keep cyberAudio singleton in sync
  useEffect(() => {
    cyberAudio.enabled = audioEnabled;
    localStorage.setItem(STORAGE_KEY_AUDIO, audioEnabled.toString());
  }, [audioEnabled]);

  // Persist scanlines setting
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SCANLINES, scanlinesEnabled.toString());
  }, [scanlinesEnabled]);

  // Persist games library
  const handleUpdateGames = (newGames) => {
    setGames(newGames);
    localStorage.setItem(STORAGE_KEY_GAMES, JSON.stringify(newGames));
  };

  const handleResetDefaults = () => {
    setGames(defaultGamesData);
    localStorage.removeItem(STORAGE_KEY_GAMES);
  };

  // Add single game
  const handleAddGame = (newGame) => {
    const updated = [newGame, ...games];
    handleUpdateGames(updated);
    setActiveGame(newGame);
  };

  // Delete custom game
  const handleDeleteCustom = (gameId) => {
    const updated = games.filter((g) => g.id !== gameId);
    handleUpdateGames(updated);
  };

  // Toggle favorite
  const handleToggleFavorite = (gameId) => {
    setFavorites((prev) => {
      const exists = prev.includes(gameId);
      const updated = exists ? prev.filter((id) => id !== gameId) : [...prev, gameId];
      localStorage.setItem(STORAGE_KEY_FAVS, JSON.stringify(updated));
      return updated;
    });
  };

  // Game selection & record recently played
  const handleSelectGame = (game) => {
    setActiveGame(game);
    setRecentIds((prev) => {
      const next = [game.id, ...prev.filter((id) => id !== game.id)].slice(0, 6);
      localStorage.setItem(STORAGE_KEY_RECENT, JSON.stringify(next));
      return next;
    });
  };

  // Random game launcher
  const handleRandomGame = () => {
    if (games.length === 0) return;
    const random = games[Math.floor(Math.random() * games.length)];
    handleSelectGame(random);
  };

  // Global Panic Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !activeGame && !isAddModalOpen && !isJsonModalOpen) {
        setIsPanicActive((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGame, isAddModalOpen, isJsonModalOpen]);

  // Filtered games
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      // Category filter
      if (activeCategory === 'FAVORITES') {
        if (!favorites.includes(game.id)) return false;
      } else if (activeCategory === 'ACTION') {
        if (game.category !== 'Action') return false;
      } else if (activeCategory === 'ARCADE') {
        if (game.category !== 'Arcade') return false;
      } else if (activeCategory === 'PUZZLE') {
        if (game.category !== 'Puzzle') return false;
      } else if (activeCategory === 'RETRO') {
        if (game.category !== 'Retro') return false;
      } else if (activeCategory === 'SPEED') {
        if (game.category !== 'Speed') return false;
      } else if (activeCategory === 'CUSTOM') {
        if (!game.isCustom) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = game.title.toLowerCase().includes(query);
        const matchesCategory = game.category.toLowerCase().includes(query);
        const matchesDesc = game.description.toLowerCase().includes(query);
        const matchesTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesCategory || matchesDesc || matchesTags;
      }

      return true;
    });
  }, [games, activeCategory, searchQuery, favorites]);

  // Recently played game objects
  const recentGames = useMemo(() => {
    return recentIds
      .map((id) => games.find((g) => g.id === id))
      .filter(Boolean);
  }, [recentIds, games]);

  // Hot / Featured games
  const featuredGames = useMemo(() => {
    return games.filter((g) => g.featured);
  }, [games]);

  return (
    <div className="min-h-screen bg-[#050508] text-zinc-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      {/* Optional CRT Scanlines Overlay */}
      {scanlinesEnabled && (
        <div className="fixed inset-0 scanlines pointer-events-none z-30" />
      )}

      {/* Stealth Disguise Screen (Activated via Panic button or ESC) */}
      {isPanicActive && (
        <StealthDisguise onClose={() => setIsPanicActive(false)} />
      )}

      {/* Top Navbar */}
      <Navbar
        scanlinesEnabled={scanlinesEnabled}
        onToggleScanlines={() => setScanlinesEnabled(!scanlinesEnabled)}
        audioEnabled={audioEnabled}
        onToggleAudio={() => setAudioEnabled(!audioEnabled)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenJsonModal={() => setIsJsonModalOpen(true)}
        onTriggerPanic={() => setIsPanicActive(true)}
        totalGames={games.length}
      />

      {/* Hero Banner with Search & Filters */}
      <HeroBanner
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onRandomGame={handleRandomGame}
        favoritesCount={favorites.length}
        totalGames={games.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-10">
        {/* Recently Played Bar */}
        {recentGames.length > 0 && !searchQuery && activeCategory === 'ALL' && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-red-500" />
                <h2 className="font-display font-bold text-sm tracking-wider text-white uppercase">
                  RECENT RECON MISSIONS
                </h2>
                <span className="text-zinc-600 font-mono-code text-xs">/</span>
                <span className="text-zinc-400 font-mono-code text-xs">Recently Executed</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {recentGames.map((game) => (
                <div
                  key={`recent-${game.id}`}
                  onClick={() => {
                    cyberAudio.playLaunch();
                    handleSelectGame(game);
                  }}
                  className="group relative bg-[#09090e] border border-red-950 hover:border-red-600/60 p-2.5 transition-all cursor-pointer cyber-cut-sm hover:shadow-[0_0_15px_rgba(255,0,60,0.2)]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-black mb-2">
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="text-[11px] font-display font-bold text-zinc-300 group-hover:text-red-400 truncate">
                    {game.title}
                  </div>
                  <div className="text-[10px] font-mono-code text-zinc-500 uppercase mt-0.5">
                    {game.category}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Featured Section */}
        {!searchQuery && activeCategory === 'ALL' && featuredGames.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-500 fill-current" />
                <h2 className="font-display font-bold text-sm tracking-wider text-white uppercase">
                  FEATURED // OVERCLOCK PROTOCOLS
                </h2>
                <span className="text-zinc-600 font-mono-code text-xs">/</span>
                <span className="text-zinc-400 font-mono-code text-xs">Top Rated by Operatives</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredGames.map((game) => (
                <GameCard
                  key={`feat-${game.id}`}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onSelect={handleSelectGame}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteCustom={handleDeleteCustom}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Games / Filtered Section */}
        <section>
          <div className="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-red-500" />
              <h2 className="font-display font-bold text-sm tracking-wider text-white uppercase">
                {activeCategory === 'ALL' ? 'ACTIVE REGISTRY ARCHIVES' : `${activeCategory} SECTOR`}
              </h2>
              <span className="text-zinc-600 font-mono-code text-xs">/</span>
              <span className="text-zinc-400 font-mono-code text-xs">
                {filteredGames.length} Available Titles
              </span>
            </div>

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs font-mono-code text-red-400 hover:text-white flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear Search &quot;{searchQuery}&quot;
              </button>
            )}
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  isFavorite={favorites.includes(game.id)}
                  onSelect={handleSelectGame}
                  onToggleFavorite={handleToggleFavorite}
                  onDeleteCustom={handleDeleteCustom}
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#09090e] border border-red-950 p-12 text-center cyber-cut">
              <div className="w-12 h-12 mx-auto bg-red-950/40 border border-red-800/40 text-red-500 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-lg text-white mb-1">
                NO PROTOCOLS FOUND IN SECTOR
              </h3>
              <p className="text-xs font-mono-code text-zinc-400 max-w-md mx-auto mb-6">
                No iframe game matched your criteria. You can inject a custom title into the JSON library or reset search filters.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('ALL');
                  }}
                  className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono-code text-zinc-200 transition-colors"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono-code font-bold uppercase tracking-wider cyber-cut transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Custom Title
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Cyberpunk Footer */}
      <footer className="border-t border-red-950/80 bg-[#060609] py-8 px-4 sm:px-8 mt-12 text-xs font-mono-code text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-red-600 rounded-xs" />
            <span className="font-display font-bold text-zinc-300 tracking-wider">
              RED CYBERNETICS // PROTOCOL 0x7F
            </span>
            <span>·</span>
            <span>DATA SOURCE: /public/games.json</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <button
              onClick={() => setIsJsonModalOpen(true)}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Export games.json
            </button>
            <span>·</span>
            <button
              onClick={() => setIsPanicActive(true)}
              className="hover:text-red-400 transition-colors cursor-pointer"
            >
              Emergency Cloak [ESC]
            </button>
            <span>·</span>
            <span className="text-zinc-600">Pure HTML5 / JS / CSS · No External Trackers</span>
          </div>
        </div>
      </footer>

      {/* Game Player Modal */}
      <GamePlayerModal
        game={activeGame}
        isOpen={!!activeGame}
        isFavorite={activeGame ? favorites.includes(activeGame.id) : false}
        onClose={() => setActiveGame(null)}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Add Custom Game Modal */}
      <AddGameModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGame={handleAddGame}
      />

      {/* JSON Database Terminal Modal */}
      <JsonEditorModal
        games={games}
        isOpen={isJsonModalOpen}
        onClose={() => setIsJsonModalOpen(false)}
        onUpdateGames={handleUpdateGames}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
