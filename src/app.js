/**
 * RED Cybernetics // Unblocked Games Engine
 * Pure JavaScript (Zero JSX) - 100% compatible with GitHub Pages, static hosts, and Vite.
 */

// Embedded default games registry
const DEFAULT_GAMES = [
  {
    "id": "madness-accelerant",
    "title": "MADNESS: Accelerant",
    "category": "Action",
    "description": "Fast-paced action combat game to beat the enemies and escape the beast monster. Playable remake of Krinkels' Madness Consternation by Tom Fulp.",
    "iframeUrl": "https://games.crazygames.com/en_US/madness-accelerant/index.html?isNewUser=false&__nextLocale=en-US&isFirstSession=true&czyExpClientGoogleH5_2=rewarded&czyExpClientOptable4=enabled&czyExpClientAdsDummyAA=enabled&czyExpClientAdsDummyAA20=disabled&czyExpClientAdsDummyAA50=enabled&czyExpClientGamera=enabled&czyExpClientAdsConsentGate2=disabled&czyExpClientLiveIntent=enabled&czyExpClientAmazonBidRoute=prebid&czyExpClientVideoNoFillFloor_CZY_18944=lowered_floor&czyExpClientContentSignals=enabled&czyExpClientAdsHolidayMode_CZY_21360=disabled&czyExpClientAdmiral=enabled&czyExpClientAdXFloor_1_CZY_20844=1&czyExpDisableInterstitialsFirst12h_CZY_18471=disabled&czyExpClientUniformLoading_CZY_19437=enabled&czyExpClientFullscreenMobileRendering_CZY_20866=enabled&czyExpClientArtworkAbTesting_CZY_20701=enabled&czyExpModelApiTraffic_CZY_21907=enabled&czyExpClientDomainProbe_CZY_21425=disabled&czyExpClientInAppPurchaseAlternativeBillingAndroidValidToken=disabled&czyExpClientModelGamePage=knn_v3&czyExpClientGameGpuGuardAndroid=disabled&czyExpClientInAppPurchaseAlternativeBillingAndroid=enabled&czyExpClientInAppPurchaseAlternativeBillingIOSUS=enabled&v=2.13",
    "thumbnail": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    "instructions": "A / D or Arrow keys to move, W / Up to jump, S / Down to duck. Mouse Left Click or A/S to aim and shoot. Q / E to switch weapons.",
    "tags": ["Action", "2D", "Shooter", "Madness", "Combat"],
    "featured": true,
    "rating": 4.9,
    "plays": 24800
  }
];

// Cyberpunk Game Categories / Sections
const CATEGORIES = [
  { id: 'ALL', label: 'All Protocols' },
  { id: 'Action', label: 'Action' },
  { id: 'Puzzle', label: 'Puzzle' },
  { id: 'Sandbox', label: 'Sandbox' },
  { id: 'Rythem', label: 'Rythem' },
  { id: '1st Person', label: '1st Person' },
  { id: '2D', label: '2D' },
  { id: '3D', label: '3D' },
  { id: '3rd person', label: '3rd person' },
  { id: 'Shooter', label: 'Shooter' },
  { id: 'FAVORITES', label: 'Favorites' }
];

// Audio Synthesizer (Zero asset loading)
class CyberAudio {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('redline_audio_v1') !== 'false';
  }

  initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {}
  }

  playLaunch() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch {}
  }

  playGlitch() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.setValueAtTime(320, this.ctx.currentTime + 0.04);
      osc.frequency.setValueAtTime(120, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {}
  }

  playPanic() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {}
  }
}

const cyberAudio = new CyberAudio();

// Application State
const state = {
  games: [],
  favorites: [],
  recent: [],
  activeCategory: 'ALL',
  searchQuery: '',
  activeGame: null,
  scanlines: localStorage.getItem('redline_scanlines_v1') !== 'false',
  audio: localStorage.getItem('redline_audio_v1') !== 'false',
  isPanic: false,
  isTheater: false,
  useLocalEngine: false,
  canvasAnimId: null,
  engineScore: 0,
  engineHighScore: parseInt(localStorage.getItem('redline_builtin_highscore') || '0', 10),
};

// Initialize Games
function initApp() {
  try {
    localStorage.removeItem('redline_games_library_v1');
    localStorage.removeItem('redline_games_library_v2');

    const stored = localStorage.getItem('redline_games_library_v3');
    if (stored) {
      const parsed = JSON.parse(stored);
      state.games = Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_GAMES;
    } else {
      state.games = DEFAULT_GAMES;
    }
  } catch {
    state.games = DEFAULT_GAMES;
  }

  try {
    const favs = localStorage.getItem('redline_favorites_v2');
    state.favorites = favs ? JSON.parse(favs) : [];
  } catch {
    state.favorites = [];
  }

  try {
    const recents = localStorage.getItem('redline_recently_played_v2');
    state.recent = recents ? JSON.parse(recents) : [];
  } catch {
    state.recent = [];
  }

  // Global ESC key listener for Panic or modal closing
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (state.isPanic) {
        state.isPanic = false;
        document.title = 'RED Cybernetics // UNBLOCKED';
        render();
        return;
      }
      if (state.activeGame) {
        closePlayer();
        return;
      }
      const addModal = document.getElementById('addGameModal');
      if (addModal && !addModal.classList.contains('hidden')) {
        closeAddModal();
        return;
      }
      const jsonModal = document.getElementById('jsonModal');
      if (jsonModal && !jsonModal.classList.contains('hidden')) {
        closeJsonModal();
        return;
      }
      // Trigger panic disguise
      triggerPanic();
    }
    // Search focus
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const s = document.getElementById('searchInput');
      if (s) s.focus();
    }
  });

  render();
}

function saveGames() {
  localStorage.setItem('redline_games_library_v3', JSON.stringify(state.games));
}

function saveFavorites() {
  localStorage.setItem('redline_favorites_v2', JSON.stringify(state.favorites));
}

function saveRecent() {
  localStorage.setItem('redline_recently_played_v2', JSON.stringify(state.recent));
}

function toggleFavorite(id, e) {
  if (e) e.stopPropagation();
  cyberAudio.playClick();
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter((f) => f !== id);
  } else {
    state.favorites.push(id);
  }
  saveFavorites();
  render();
}

function selectGame(id) {
  const game = state.games.find((g) => g.id === id);
  if (!game) return;
  cyberAudio.playLaunch();
  state.activeGame = game;
  state.useLocalEngine = false;

  // Add to recent
  state.recent = [id, ...state.recent.filter((r) => r !== id)].slice(0, 6);
  saveRecent();

  render();
}

function closePlayer() {
  cyberAudio.playClick();
  if (state.canvasAnimId) {
    cancelAnimationFrame(state.canvasAnimId);
    state.canvasAnimId = null;
  }
  state.activeGame = null;
  render();
}

function triggerPanic() {
  cyberAudio.playPanic();
  state.isPanic = true;
  document.title = 'Google Docs - AP Bio: Unit 4 Cellular Respiration Notes';
  render();
}

function exitPanic() {
  cyberAudio.playClick();
  state.isPanic = false;
  document.title = 'RED Cybernetics // UNBLOCKED';
  render();
}

function toggleScanlines() {
  cyberAudio.playClick();
  state.scanlines = !state.scanlines;
  localStorage.setItem('redline_scanlines_v1', state.scanlines.toString());
  render();
}

function toggleAudio() {
  state.audio = !state.audio;
  cyberAudio.enabled = state.audio;
  localStorage.setItem('redline_audio_v1', state.audio.toString());
  cyberAudio.playClick();
  render();
}

function launchAboutBlankCloak(url) {
  cyberAudio.playLaunch();
  const win = window.open('about:blank', '_blank');
  if (!win) {
    alert('Popup was blocked. Please allow popups to open the stealth tab.');
    return;
  }
  const doc = win.document;
  doc.title = 'Google Drive - My Files';
  const link = doc.createElement('link');
  link.rel = 'icon';
  link.href = 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png';
  doc.head.appendChild(link);
  const style = doc.createElement('style');
  style.innerHTML = '* { margin: 0; padding: 0; } body, html { width: 100%; height: 100%; overflow: hidden; background: #000; } iframe { width: 100%; height: 100%; border: none; }';
  doc.head.appendChild(style);
  const iframe = doc.createElement('iframe');
  iframe.src = url;
  iframe.allowFullscreen = true;
  doc.body.appendChild(iframe);
}

function getFilteredGames() {
  return state.games.filter((game) => {
    if (state.activeCategory === 'FAVORITES') {
      if (!state.favorites.includes(game.id)) return false;
    } else if (state.activeCategory !== 'ALL') {
      const target = state.activeCategory.toLowerCase();
      const cat = (game.category || '').toLowerCase();
      const tags = (game.tags || []).map((t) => t.toLowerCase());

      let matches = false;
      if (target === 'rythem') {
        matches = cat.includes('ryth') || cat.includes('rhyth') || tags.some((t) => t.includes('ryth') || t.includes('rhyth'));
      } else if (target === '1st person') {
        matches = cat.includes('1st') || cat.includes('first') || tags.some((t) => t.includes('1st') || t.includes('first') || t === 'fps');
      } else if (target === '3rd person') {
        matches = cat.includes('3rd') || cat.includes('third') || tags.some((t) => t.includes('3rd') || t.includes('third') || t === 'tps');
      } else if (target === '2d') {
        matches = cat === '2d' || tags.includes('2d');
      } else if (target === '3d') {
        matches = cat === '3d' || tags.includes('3d');
      } else {
        matches = cat === target || tags.includes(target) || cat.includes(target);
      }

      if (!matches) return false;
    }

    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchTitle = game.title.toLowerCase().includes(q);
      const matchCat = game.category.toLowerCase().includes(q);
      const matchDesc = game.description.toLowerCase().includes(q);
      const matchTags = game.tags && game.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchCat || matchDesc || matchTags;
    }

    return true;
  });
}

// Render Main Interface
function render() {
  const root = document.getElementById('root');
  if (!root) return;

  if (state.isPanic) {
    root.innerHTML = renderPanicScreen();
    return;
  }

  const filtered = getFilteredGames();
  const featured = state.games.filter((g) => g.featured);
  const recentGames = state.recent.map((id) => state.games.find((g) => g.id === id)).filter(Boolean);

  root.innerHTML = `
    <div class="min-h-screen bg-[#050508] text-zinc-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      ${state.scanlines ? '<div class="fixed inset-0 scanlines pointer-events-none z-30"></div>' : ''}

      <!-- Top Navbar -->
      <header class="sticky top-0 z-40 bg-[#050508]/95 backdrop-blur-md border-b border-red-950/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2.5 cursor-pointer" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <div class="w-9 h-9 bg-red-600 flex items-center justify-center text-white cyber-cut shadow-[0_0_15px_rgba(255,0,60,0.7)]">
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-display font-black text-lg tracking-wider text-white text-neon-glow">RED</span>
                <span class="font-mono-code font-bold text-xs text-red-500 tracking-widest">CYBERNETICS</span>
              </div>
              <div class="flex items-center gap-2 text-[10px] font-mono-code text-zinc-500">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span class="text-zinc-400">PROXY: ENCRYPTED</span>
                <span>·</span>
                <span>${state.games.length} TITLES LOADED</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2 sm:gap-3">
          <button onclick="window.triggerPanic()" class="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-xs uppercase tracking-wider cyber-cut transition-all shadow-[0_0_12px_rgba(255,0,60,0.5)] cursor-pointer" title="Panic Disguise Mode (or press ESC)">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <span class="hidden sm:inline">PANIC [ESC]</span>
          </button>

          <button onclick="window.openJsonModal()" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 font-mono-code text-xs transition-colors cursor-pointer" title="Inspect / Edit games.json">
            <svg class="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            <span class="hidden md:inline">GAMES.JSON</span>
          </button>

          <button onclick="window.openAddModal()" class="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 font-mono-code text-xs transition-colors cursor-pointer" title="Add Game to JSON registry">
            <svg class="w-3.5 h-3.5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span class="hidden sm:inline">ADD GAME</span>
          </button>

          <button onclick="window.toggleScanlines()" class="p-2 border transition-colors cursor-pointer ${state.scanlines ? 'bg-red-950/40 text-red-400 border-red-800' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'}" title="CRT Scanlines Toggle">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>
          </button>

          <button onclick="window.toggleAudio()" class="p-2 border transition-colors cursor-pointer ${state.audio ? 'bg-red-950/40 text-red-400 border-red-800' : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'}" title="Sound FX Toggle">
            ${state.audio 
              ? '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>'
              : '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>'
            }
          </button>
        </div>
      </header>

      <!-- Hero Banner -->
      <div class="relative border-b border-red-950/70 bg-[#07070b] py-8 px-4 sm:px-8 cyber-grid">
        <div class="max-w-7xl mx-auto flex flex-col gap-6">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div class="flex items-center gap-2 text-xs font-mono-code text-red-500 mb-2">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
                <span>TERMINAL // ROOT PRIVILEGES GRANTED</span>
                <span class="text-zinc-600">·</span>
                <span class="text-zinc-400">UNRESTRICTED IFRAME ACCESS</span>
              </div>
              <h1 class="text-2xl sm:text-4xl font-display font-black text-white tracking-wider text-neon-glow uppercase">
                RED <span class="text-red-500">CYBERNETICS</span>
              </h1>
              <p class="text-xs sm:text-sm font-mono-code text-zinc-400 mt-1 max-w-xl">
                Pure HTML5, JavaScript & CSS games registry stored in <span class="text-red-400 font-semibold">games.json</span>. Zero external paywalls, stealth mode armed.
              </p>
            </div>

            <div class="flex items-center gap-3 font-mono-code text-xs">
              <div class="px-3.5 py-2 bg-black/60 border border-zinc-800 text-zinc-300 flex flex-col">
                <span class="text-[10px] text-zinc-500 uppercase">Total Archives</span>
                <span class="text-red-400 font-bold text-sm">${state.games.length} Games</span>
              </div>
              <div class="px-3.5 py-2 bg-black/60 border border-zinc-800 text-zinc-300 flex flex-col">
                <span class="text-[10px] text-zinc-500 uppercase">Bookmarked</span>
                <span class="text-white font-bold text-sm">${state.favorites.length} Saved</span>
              </div>
              <button onclick="window.randomGame()" class="px-4 py-2 bg-red-950/50 hover:bg-red-600 border border-red-800 hover:border-red-500 text-red-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cyber-cut h-[54px] cursor-pointer" title="Launch random title">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>
                <span class="hidden sm:inline">RANDOM RUN</span>
              </button>
            </div>
          </div>

          <!-- Search & Category Filters -->
          <div class="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between pt-2">
            <div class="relative w-full lg:max-w-md">
              <input
                id="searchInput"
                type="text"
                placeholder="Search by game title, category, or #tags..."
                value="${state.searchQuery}"
                oninput="window.handleSearch(this.value)"
                class="w-full px-4 py-2.5 pl-10 pr-12 bg-black/80 border border-zinc-800 hover:border-red-900/80 focus:border-red-500 text-white font-mono-code text-xs tracking-wide focus:outline-hidden transition-colors"
              />
              <svg class="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              <kbd class="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-mono-code bg-zinc-900 border border-zinc-800 text-zinc-500 rounded-xs">/</kbd>
            </div>

            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              ${CATEGORIES.map((cat) => `
                <button
                  onclick="window.setCategory('${cat.id}')"
                  class="px-3 py-1.5 font-mono-code text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                    state.activeCategory === cat.id
                      ? 'bg-red-600 text-white border-red-500 shadow-[0_0_12px_rgba(255,0,60,0.5)]'
                      : 'bg-black/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-red-900/60'
                  }"
                >
                  ${cat.label}
                  ${cat.id === 'FAVORITES' && state.favorites.length > 0 ? `(${state.favorites.length})` : ''}
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- Main Body Content -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-10">
        <!-- Recent Recon -->
        ${recentGames.length > 0 && !state.searchQuery && state.activeCategory === 'ALL' ? `
          <section>
            <div class="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                <h2 class="font-display font-bold text-sm tracking-wider text-white uppercase">RECENT RECON MISSIONS</h2>
                <span class="text-zinc-600 font-mono-code text-xs">/</span>
                <span class="text-zinc-400 font-mono-code text-xs">Recently Executed</span>
              </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              ${recentGames.map((g) => `
                <div onclick="window.selectGame('${g.id}')" class="group relative bg-[#09090e] border border-red-950 hover:border-red-600/60 p-2.5 transition-all cursor-pointer cyber-cut-sm hover:shadow-[0_0_15px_rgba(255,0,60,0.2)]">
                  <div class="aspect-[16/10] overflow-hidden bg-black mb-2">
                    <img src="${g.thumbnail}" alt="${g.title}" class="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" loading="lazy" />
                  </div>
                  <div class="text-[11px] font-display font-bold text-zinc-300 group-hover:text-red-400 truncate">${g.title}</div>
                  <div class="text-[10px] font-mono-code text-zinc-500 uppercase mt-0.5">${g.category}</div>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        <!-- Featured Section -->
        ${!state.searchQuery && state.activeCategory === 'ALL' && featured.length > 0 ? `
          <section>
            <div class="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                <h2 class="font-display font-bold text-sm tracking-wider text-white uppercase">FEATURED // OVERCLOCK PROTOCOLS</h2>
                <span class="text-zinc-600 font-mono-code text-xs">/</span>
                <span class="text-zinc-400 font-mono-code text-xs">Top Rated Operatives</span>
              </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              ${featured.map((g) => renderGameCard(g)).join('')}
            </div>
          </section>
        ` : ''}

        <!-- All Games / Filtered -->
        <section>
          <div class="flex items-center justify-between mb-4 border-b border-red-950/60 pb-2">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
              <h2 class="font-display font-bold text-sm tracking-wider text-white uppercase">
                ${state.activeCategory === 'ALL' ? 'ACTIVE REGISTRY ARCHIVES' : `${state.activeCategory} SECTOR`}
              </h2>
              <span class="text-zinc-600 font-mono-code text-xs">/</span>
              <span class="text-zinc-400 font-mono-code text-xs">${filtered.length} Available Titles</span>
            </div>
            ${state.searchQuery ? `
              <button onclick="window.clearSearch()" class="text-xs font-mono-code text-red-400 hover:text-white flex items-center gap-1 cursor-pointer">
                Clear Search "${state.searchQuery}"
              </button>
            ` : ''}
          </div>

          ${filtered.length > 0 ? `
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              ${filtered.map((g) => renderGameCard(g)).join('')}
            </div>
          ` : `
            <div class="bg-[#09090e] border border-red-950 p-12 text-center cyber-cut">
              <div class="w-12 h-12 mx-auto bg-red-950/40 border border-red-800/40 text-red-500 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3 class="font-display font-bold text-lg text-white mb-1">REGISTRY EMPTY // ALL GAMES REMOVED</h3>
              <p class="text-xs font-mono-code text-zinc-400 max-w-md mx-auto mb-6">
                All pre-installed game protocols have been removed. You can inject custom iframe games or load a games.json file.
              </p>
              <div class="flex items-center justify-center gap-3">
                <button onclick="window.openAddModal()" class="px-5 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-mono-code font-bold uppercase tracking-wider cyber-cut transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  Add Custom Game
                </button>
                <button onclick="window.openJsonModal()" class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono-code text-zinc-200 transition-colors cursor-pointer">
                  Open GAMES.JSON Editor
                </button>
              </div>
            </div>
          `}
        </section>
      </main>

      <!-- Footer -->
      <footer class="border-t border-red-950/80 bg-[#060609] py-8 px-4 sm:px-8 mt-12 text-xs font-mono-code text-zinc-500">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 bg-red-600 rounded-xs"></div>
            <span class="font-display font-bold text-zinc-300 tracking-wider">RED CYBERNETICS // PROTOCOL 0x7F</span>
            <span>·</span>
            <span>DATA SOURCE: /public/games.json</span>
          </div>
          <div class="flex items-center gap-4 text-zinc-400">
            <button onclick="window.openJsonModal()" class="hover:text-red-400 transition-colors cursor-pointer">Export games.json</button>
            <span>·</span>
            <button onclick="window.triggerPanic()" class="hover:text-red-400 transition-colors cursor-pointer">Emergency Cloak [ESC]</button>
            <span>·</span>
            <span class="text-zinc-600">Pure HTML5 / JS / CSS · Zero Trackers</span>
          </div>
        </div>
      </footer>

      <!-- Modals -->
      ${state.activeGame ? renderPlayerModal(state.activeGame) : ''}
      ${renderAddModal()}
      ${renderJsonModal()}
    </div>
  `;

  // Start canvas if local engine is active in player
  if (state.activeGame && state.useLocalEngine) {
    initLocalEngineCanvas();
  }
}

// Render Game Card
function renderGameCard(game) {
  const isFav = state.favorites.includes(game.id);
  return `
    <div class="group relative bg-[#09090e] border border-red-950/80 hover:border-red-600/70 transition-all duration-200 flex flex-col justify-between overflow-hidden cyber-cut-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.25)] hover:-translate-y-0.5">
      <div class="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" loading="lazy" />
        <div class="absolute inset-0 scanlines opacity-50 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent"></div>

        <button onclick="window.toggleFavorite('${game.id}', event)" class="absolute top-2.5 right-2.5 p-2 rounded-xs backdrop-blur-xs transition-colors z-10 cursor-pointer ${
          isFav ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,60,0.8)]' : 'bg-black/60 text-zinc-400 hover:text-red-400 border border-zinc-800'
        }" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          <svg class="w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        ${game.featured ? `
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-mono-code font-bold text-red-400 bg-black/80 px-2 py-0.5 border border-red-800/60 backdrop-blur-xs">
            <svg class="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            <span>HOT</span>
          </div>
        ` : ''}

        <div onclick="window.selectGame('${game.id}')" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] cursor-pointer">
          <div class="w-12 h-12 bg-red-600 hover:bg-red-500 text-white flex items-center justify-center rounded-xs shadow-[0_0_20px_rgba(255,0,60,0.8)] transition-transform hover:scale-110">
            <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-[11px] font-mono-code text-zinc-500 mb-1.5 uppercase">
            <span class="text-red-400 font-semibold">${game.category}</span>
            <span>·</span>
            <span>★ ${game.rating || 4.8}</span>
            ${game.plays ? `<span>·</span><span>${(game.plays / 1000).toFixed(1)}k plays</span>` : ''}
          </div>
          <h3 onclick="window.selectGame('${game.id}')" class="font-display font-bold text-sm tracking-wide text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer">
            ${game.title}
          </h3>
          <p class="text-xs text-zinc-400 font-mono-code line-clamp-2 mt-1 leading-relaxed">${game.description}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono-code">
          <div class="flex items-center gap-1.5 text-zinc-500 text-[10px] truncate max-w-[140px]">
            ${game.tags ? game.tags.slice(0, 2).map((t) => `<span>#${t}</span>`).join('') : ''}
          </div>
          <div class="flex items-center gap-2">
            ${game.isCustom ? `
              <button onclick="window.deleteCustomGame('${game.id}', event)" class="p-1 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer" title="Delete custom game">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            ` : ''}
            <button onclick="window.selectGame('${game.id}')" class="flex items-center gap-1.5 px-3 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/40 hover:border-red-500 text-xs font-mono-code font-semibold uppercase tracking-wider transition-all cursor-pointer">
              <span>Play</span>
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="h-0.5 w-full bg-zinc-900 group-hover:bg-red-600 transition-colors"></div>
    </div>
  `;
}

// Render Player Modal
function renderPlayerModal(game) {
  const isFav = state.favorites.includes(game.id);
  return `
    <div id="playerModalBackdrop" class="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      <div id="playerContainer" class="w-full bg-[#08080d] border border-red-600/40 flex flex-col shadow-[0_0_50px_rgba(255,0,60,0.3)] transition-all ${
        state.isTheater ? 'h-full max-h-none max-w-none' : 'max-w-6xl max-h-[95vh] cyber-cut'
      }">
        <div class="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-red-950 bg-red-950/20 shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-sm sm:text-base font-display font-black text-white tracking-wider flex items-center gap-2 text-neon-glow">
                  ${game.title}
                </h2>
                <span class="text-[10px] font-mono-code text-red-400 bg-red-950/60 px-2 py-0.5 border border-red-800/40">${game.category}</span>
              </div>
              <p class="text-[11px] font-mono-code text-zinc-400 truncate max-w-sm sm:max-w-md hidden sm:block">SRC: ${game.iframeUrl}</p>
            </div>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2">
            <button onclick="window.toggleFavorite('${game.id}')" class="p-2 border transition-colors cursor-pointer ${
              isFav ? 'bg-red-600 text-white border-red-500 shadow-[0_0_10px_rgba(255,0,60,0.7)]' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-red-400 hover:border-red-600/50'
            }" title="Add to favorites">
              <svg class="w-4 h-4 ${isFav ? 'fill-current' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>

            <button onclick="window.reloadIframe()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer" title="Reload game frame">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>

            <button onclick="window.toggleTheater()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer hidden sm:block" title="Toggle Theater mode">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
            </button>

            <button onclick="window.toggleFullscreen()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer" title="Toggle Fullscreen">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            </button>

            <button onclick="window.launchAboutBlankCloak('${game.iframeUrl}')" class="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800 hover:border-red-500 text-xs font-mono-code font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer" title="Open inside an about:blank tab cloaked as Google Drive">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span class="hidden md:inline">Cloak Tab</span>
            </button>

            <button onclick="window.closePlayer()" class="p-2 bg-red-950/30 text-zinc-400 hover:text-red-400 hover:bg-red-950 border border-zinc-800 hover:border-red-600 transition-colors ml-1 cursor-pointer">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Frame / Canvas Area -->
        <div class="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
          ${state.useLocalEngine ? `
            <div class="relative w-full h-full flex flex-col items-center justify-center bg-black select-none">
              <canvas id="localEngineCanvas" width="720" height="480" class="w-full max-w-[720px] max-h-[480px] border border-red-900/60 shadow-[0_0_30px_rgba(255,0,60,0.2)] aspect-[3/2] object-contain"></canvas>
              <div class="absolute top-4 left-6 flex items-center gap-6 font-mono-code text-xs text-red-400">
                <div>SCORE: <span id="hudScore" class="text-red-500 font-bold text-sm tracking-widest">00000</span></div>
                <div>HI-RECORD: <span class="text-zinc-300 font-bold">${state.engineHighScore.toString().padStart(5, '0')}</span></div>
              </div>
            </div>
          ` : `
            <iframe
              id="gameIframe"
              src="${game.iframeUrl}"
              title="${game.title}"
              class="w-full h-full min-h-[420px] sm:min-h-[540px] border-none bg-black"
              allow="autoplay; fullscreen; gamepad; focus-without-user-activation; clipboard-write; keyboard-map"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
            ></iframe>
          `}
          <div class="absolute inset-0 crt-vignette pointer-events-none"></div>
        </div>

        <div class="px-4 sm:px-6 py-3 bg-[#0c0c14] border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code shrink-0">
          <div class="flex items-center gap-1.5 text-zinc-400">
            <span class="text-zinc-600">INPUT:</span>
            <span class="text-zinc-300">${game.instructions}</span>
          </div>

          <div class="flex items-center gap-3">
            <button onclick="window.toggleLocalEngine()" class="flex items-center gap-1.5 px-3 py-1 border transition-colors cursor-pointer ${
              state.useLocalEngine ? 'bg-red-600 text-white border-red-500' : 'bg-zinc-900 text-zinc-400 hover:text-red-400 border-zinc-700'
            }">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
              <span>${state.useLocalEngine ? 'Using Local Engine' : 'Iframe Blocked? Use Local Engine'}</span>
            </button>

            <button onclick="window.copyEmbedCode('${game.iframeUrl}')" id="copyEmbedBtn" class="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors cursor-pointer">
              <span>Embed Code</span>
            </button>

            <a href="${game.iframeUrl}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors">
              <span>Direct Link</span>
              <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Panic Disguise
function renderPanicScreen() {
  return `
    <div class="fixed inset-0 z-[9999] bg-[#f8f9fa] text-[#202124] font-sans flex flex-col select-text overflow-y-auto">
      <header class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 shadow-xs z-10">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded bg-[#4285f4] flex items-center justify-center text-white font-bold text-lg shadow-xs">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-gray-800 text-base">AP Bio: Unit 4 Cellular Respiration & ATP Synthesis Notes</span>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Saved to Drive</span>
            </div>
            <div class="flex items-center gap-4 text-xs text-gray-600 mt-0.5">
              <span>File</span><span>Edit</span><span>View</span><span>Insert</span><span>Format</span><span>Tools</span><span>Help</span>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <div class="flex items-center text-xs text-gray-500 gap-1">
            <span>Last edit was 2 minutes ago</span>
          </div>
          <button onclick="window.exitPanic()" class="px-4 py-1.5 text-xs font-medium bg-[#1a73e8] text-white rounded-full hover:bg-[#1557b0] shadow-xs cursor-pointer">
            Share
          </button>
          <button onclick="window.exitPanic()" title="Return to RED Cybernetics (or press ESC)" class="w-8 h-8 rounded-full bg-emerald-600 text-white font-medium text-xs flex items-center justify-center hover:opacity-80 transition-opacity ml-2 cursor-pointer">
            S
          </button>
        </div>
      </header>

      <main class="flex-1 bg-[#f0f2f5] p-6 flex justify-center">
        <div class="w-full max-w-[850px] bg-white min-h-[1100px] shadow-md p-14 border border-gray-200">
          <h1 class="text-2xl font-bold text-gray-900 mb-2">Section 4.3: Glycolysis and Krebs Citric Acid Cycle</h1>
          <p class="text-xs text-gray-500 mb-6 pb-2 border-b border-gray-200">Advanced Placement Biology · Semester 1 · Instructor: Dr. Harrison</p>

          <h2 class="text-lg font-semibold text-gray-800 mt-4 mb-2">1. Overview of Cellular Respiration</h2>
          <p class="text-sm text-gray-700 leading-relaxed mb-4">
            Cellular respiration is a series of metabolic chemical reactions that break down glucose to generate ATP energy.
          </p>
          <div class="bg-gray-50 p-3 rounded font-mono text-xs text-gray-800 border-l-4 border-blue-500 mb-4">
            C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~30-32 ATP (Energy)
          </div>

          <h2 class="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Stages of Cellular Respiration</h2>
          <ul class="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4">
            <li><strong>Glycolysis:</strong> Cytoplasmic glucose breakdown into 2 pyruvate molecules, yielding net 2 ATP and 2 NADH.</li>
            <li><strong>Pyruvate Oxidation:</strong> Conversion into acetyl CoA inside mitochondrial matrix.</li>
            <li><strong>Krebs Citric Acid Cycle:</strong> Systematic breakdown producing NADH, FADH₂, and ATP.</li>
            <li><strong>Oxidative Phosphorylation:</strong> Electron transport chain gradient driving ATP synthase.</li>
          </ul>

          <div class="mt-16 pt-6 border-t border-gray-200 text-xs text-gray-400 flex items-center justify-between">
            <span>Page 1 of 3</span>
            <span onclick="window.exitPanic()" class="text-gray-400 hover:text-gray-600 cursor-pointer">[Press ESC or click here to restore RED Cybernetics]</span>
          </div>
        </div>
      </main>
    </div>
  `;
}

// Render Add Game Modal
function renderAddModal() {
  return `
    <div id="addGameModal" class="fixed inset-0 z-50 items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden flex">
      <div class="w-full max-w-xl bg-[#09090e] border border-red-600/50 cyber-cut flex flex-col shadow-[0_0_40px_rgba(255,0,60,0.3)]">
        <div class="flex items-center justify-between px-6 py-4 border-b border-red-950 bg-red-950/20">
          <div>
            <h2 class="text-base font-display font-bold text-white tracking-wider flex items-center gap-2">
              INJECT CUSTOM GAME // <span class="text-red-500">IFRAME REGISTRY</span>
            </h2>
            <p class="text-xs font-mono-code text-zinc-400">Add any web game URL or embed snippet to the local JSON collection</p>
          </div>
          <button onclick="window.closeAddModal()" class="p-1.5 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <form onsubmit="window.handleAddGameSubmit(event)" class="p-6 space-y-4 font-mono-code text-xs">
          <div>
            <label class="block text-zinc-300 font-bold mb-1.5">GAME TITLE *</label>
            <input id="addTitle" type="text" required placeholder="e.g. DRIFT HUNTERS // REDLINE" class="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors" />
          </div>

          <div>
            <label class="block text-zinc-300 font-bold mb-1.5">IFRAME EMBED URL *</label>
            <input id="addUrl" type="text" required placeholder="https://example.com/game or <iframe src='...'></iframe>" class="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-zinc-300 font-bold mb-1.5">CATEGORY</label>
              <select id="addCat" class="w-full px-3 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors cursor-pointer">
                <option value="Action" selected>Action</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Sandbox">Sandbox</option>
                <option value="Rythem">Rythem</option>
                <option value="1st Person">1st Person</option>
                <option value="2D">2D</option>
                <option value="3D">3D</option>
                <option value="3rd person">3rd person</option>
                <option value="Shooter">Shooter</option>
              </select>
            </div>
            <div>
              <label class="block text-zinc-300 font-bold mb-1.5">TAGS (COMMA SEPARATED)</label>
              <input id="addTags" type="text" value="Unblocked, Custom, Web" class="w-full px-3 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors" />
            </div>
          </div>

          <div>
            <label class="block text-zinc-300 font-bold mb-1.5">BRIEF DESCRIPTION</label>
            <input id="addDesc" type="text" placeholder="High-intensity laser avoidance reflex simulator..." class="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors" />
          </div>

          <div>
            <label class="block text-zinc-300 font-bold mb-1.5">CONTROLS / INSTRUCTIONS</label>
            <input id="addInstructions" type="text" value="Arrow keys to navigate, Space to fire" class="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors" />
          </div>

          <div class="pt-3 flex items-center justify-end gap-3 border-t border-zinc-800/80">
            <button type="button" onclick="window.closeAddModal()" class="px-4 py-2 text-zinc-400 hover:text-white transition-colors cursor-pointer">Cancel</button>
            <button type="submit" class="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider cyber-cut transition-all shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer">
              Save To Registry
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

// Render JSON Editor Modal
function renderJsonModal() {
  return `
    <div id="jsonModal" class="fixed inset-0 z-50 items-center justify-center p-4 bg-black/85 backdrop-blur-md hidden flex">
      <div class="w-full max-w-4xl bg-[#09090e] border border-red-600/40 cyber-cut flex flex-col max-h-[90vh] shadow-[0_0_40px_rgba(255,0,60,0.25)]">
        <div class="flex items-center justify-between px-6 py-4 border-b border-red-950 bg-red-950/20">
          <div>
            <h2 class="text-lg font-display font-bold text-white tracking-wider flex items-center gap-2">
              DATABASE TERMINAL // <span class="text-red-500">GAMES.JSON</span>
            </h2>
            <p class="text-xs font-mono-code text-zinc-400">Primary data store for all embedded iframe titles and URLs</p>
          </div>
          <button onclick="window.closeJsonModal()" class="p-1.5 text-zinc-400 hover:text-red-400 transition-colors cursor-pointer">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div class="px-6 py-3 bg-[#0d0d14] border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div class="flex items-center gap-2">
            <button onclick="window.copyJsonText()" id="copyJsonBtn" class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors cursor-pointer">
              Copy JSON
            </button>
            <button onclick="window.downloadJsonFile()" class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors cursor-pointer">
              Download games.json
            </button>
            <label class="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors cursor-pointer">
              Load JSON File
              <input type="file" accept=".json" onchange="window.handleJsonFileUpload(event)" class="hidden" />
            </label>
          </div>
          <div>
            <button onclick="window.resetDefaults()" class="px-3 py-1.5 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 transition-colors cursor-pointer">
              Reset Defaults
            </button>
          </div>
        </div>

        <div class="flex-1 p-6 overflow-hidden flex flex-col bg-[#050508]">
          <textarea id="jsonTextarea" spellcheck="false" class="w-full flex-1 p-4 bg-[#0a0a10] border border-zinc-800 text-zinc-200 font-mono-code text-xs leading-relaxed focus:outline-hidden focus:border-red-500 resize-none font-medium selection:bg-red-900 selection:text-white min-h-[300px]"></textarea>
        </div>

        <div class="px-6 py-4 bg-[#0d0d14] border-t border-zinc-800/80 flex items-center justify-between">
          <div class="text-xs font-mono-code text-zinc-500">Registry titles: <span class="text-red-400 font-bold">${state.games.length}</span></div>
          <div class="flex items-center gap-3">
            <button onclick="window.closeJsonModal()" class="px-4 py-2 text-xs font-mono-code text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">Cancel</button>
            <button onclick="window.commitJsonText()" class="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-mono-code text-xs font-bold uppercase tracking-wider cyber-cut transition-all shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer">
              Commit & Reload
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Built-in Local Engine Canvas Loop
function initLocalEngineCanvas() {
  const canvas = document.getElementById('localEngineCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let playerX = 360;
  let playerY = 380;
  const keys = { left: false, right: false, up: false, down: false };
  let hazards = [];
  let score = 0;
  let lastSpawn = 0;

  const onKey = (e, val) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = val;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = val;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.up = val;
    if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') keys.down = val;
  };

  const kd = (e) => onKey(e, true);
  const ku = (e) => onKey(e, false);
  window.addEventListener('keydown', kd);
  window.addEventListener('keyup', ku);

  function loop(time) {
    if (!state.activeGame || !state.useLocalEngine) {
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      return;
    }

    ctx.fillStyle = '#06060a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 0, 60, 0.15)';
    ctx.lineWidth = 1;
    const gridOffset = (time / 10) % 30;
    for (let y = gridOffset; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Move player
    if (keys.left && playerX > 20) playerX -= 6;
    if (keys.right && playerX < canvas.width - 20) playerX += 6;
    if (keys.up && playerY > 20) playerY -= 6;
    if (keys.down && playerY < canvas.height - 20) playerY += 6;

    // Spawn obstacles
    if (time - lastSpawn > Math.max(300, 800 - score * 10)) {
      lastSpawn = time;
      hazards.push({
        x: Math.random() * (canvas.width - 30),
        y: -30,
        speed: 3 + Math.random() * 3 + Math.min(5, score * 0.05),
        w: 24 + Math.random() * 20,
        h: 18 + Math.random() * 12,
      });
    }

    // Update & draw hazards
    ctx.fillStyle = '#ff003c';
    ctx.shadowColor = '#ff003c';
    ctx.shadowBlur = 10;
    for (let i = hazards.length - 1; i >= 0; i--) {
      const h = hazards[i];
      h.y += h.speed;
      ctx.fillRect(h.x, h.y, h.w, h.h);

      // Collision
      if (playerX + 10 > h.x && playerX - 10 < h.x + h.w && playerY + 12 > h.y && playerY - 12 < h.y + h.h) {
        score = 0;
        hazards = [];
        break;
      }

      if (h.y > canvas.height + 20) {
        hazards.splice(i, 1);
        score += 1;
        const hud = document.getElementById('hudScore');
        if (hud) hud.textContent = score.toString().padStart(5, '0');
        if (score > state.engineHighScore) {
          state.engineHighScore = score;
          localStorage.setItem('redline_builtin_highscore', score.toString());
        }
      }
    }
    ctx.shadowBlur = 0;

    // Draw ship
    ctx.save();
    ctx.translate(playerX, playerY);
    ctx.fillStyle = '#14141e';
    ctx.strokeStyle = '#ff003c';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -16);
    ctx.lineTo(14, 12);
    ctx.lineTo(0, 6);
    ctx.lineTo(-14, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    state.canvasAnimId = requestAnimationFrame(loop);
  }

  state.canvasAnimId = requestAnimationFrame(loop);
}

// Window Exposed Handlers for DOM Events
window.selectGame = selectGame;
window.closePlayer = closePlayer;
window.toggleFavorite = toggleFavorite;
window.triggerPanic = triggerPanic;
window.exitPanic = exitPanic;
window.toggleScanlines = toggleScanlines;
window.toggleAudio = toggleAudio;
window.launchAboutBlankCloak = launchAboutBlankCloak;

window.handleSearch = function (val) {
  state.searchQuery = val;
  render();
};

window.clearSearch = function () {
  state.searchQuery = '';
  render();
};

window.setCategory = function (cat) {
  cyberAudio.playClick();
  state.activeCategory = cat;
  render();
};

window.resetFilters = function () {
  state.searchQuery = '';
  state.activeCategory = 'ALL';
  render();
};

window.randomGame = function () {
  if (state.games.length === 0) return;
  const rand = state.games[Math.floor(Math.random() * state.games.length)];
  selectGame(rand.id);
};

window.toggleTheater = function () {
  cyberAudio.playClick();
  state.isTheater = !state.isTheater;
  render();
};

window.toggleFullscreen = function () {
  cyberAudio.playClick();
  const elem = document.getElementById('playerContainer');
  if (!elem) return;
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
};

window.reloadIframe = function () {
  cyberAudio.playClick();
  const f = document.getElementById('gameIframe');
  if (f) f.src = f.src;
};

window.toggleLocalEngine = function () {
  cyberAudio.playClick();
  state.useLocalEngine = !state.useLocalEngine;
  render();
};

window.copyEmbedCode = function (url) {
  cyberAudio.playClick();
  const snippet = `<iframe src="${url}" width="800" height="600" frameborder="0" allowfullscreen></iframe>`;
  navigator.clipboard.writeText(snippet);
  const btn = document.getElementById('copyEmbedBtn');
  if (btn) {
    btn.innerHTML = '<span>Copied!</span>';
    setTimeout(() => {
      btn.innerHTML = '<span>Embed Code</span>';
    }, 2000);
  }
};

window.deleteCustomGame = function (id, e) {
  if (e) e.stopPropagation();
  if (confirm('Delete this custom title from registry?')) {
    cyberAudio.playClick();
    state.games = state.games.filter((g) => g.id !== id);
    saveGames();
    render();
  }
};

window.openAddModal = function () {
  cyberAudio.playClick();
  const m = document.getElementById('addGameModal');
  if (m) m.classList.remove('hidden');
};

window.closeAddModal = function () {
  cyberAudio.playClick();
  const m = document.getElementById('addGameModal');
  if (m) m.classList.add('hidden');
};

window.handleAddGameSubmit = function (e) {
  e.preventDefault();
  const title = document.getElementById('addTitle')?.value || '';
  let url = document.getElementById('addUrl')?.value || '';
  const match = url.match(/src=["'](.*?)["']/);
  if (match && match[1]) url = match[1];

  const cat = document.getElementById('addCat')?.value || 'Custom';
  const desc = document.getElementById('addDesc')?.value || 'Custom user-injected cyberspace unblocked title.';
  const instructions = document.getElementById('addInstructions')?.value || 'Use standard keyboard / mouse controls.';
  const tags = (document.getElementById('addTags')?.value || 'Custom, Web')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const newGame = {
    id: `custom-${Date.now()}`,
    title: title.trim().toUpperCase(),
    category: cat,
    description: desc.trim(),
    iframeUrl: url.trim(),
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    instructions: instructions.trim(),
    tags: tags,
    isCustom: true,
    rating: 5.0,
    plays: 1,
    addedAt: new Date().toISOString(),
  };

  state.games.unshift(newGame);
  saveGames();
  closeAddModal();
  selectGame(newGame.id);
};

window.openJsonModal = function () {
  cyberAudio.playClick();
  const m = document.getElementById('jsonModal');
  if (m) {
    m.classList.remove('hidden');
    const ta = document.getElementById('jsonTextarea');
    if (ta) ta.value = JSON.stringify(state.games, null, 2);
  }
};

window.closeJsonModal = function () {
  cyberAudio.playClick();
  const m = document.getElementById('jsonModal');
  if (m) m.classList.add('hidden');
};

window.copyJsonText = function () {
  cyberAudio.playClick();
  const ta = document.getElementById('jsonTextarea');
  if (ta) {
    navigator.clipboard.writeText(ta.value);
    const b = document.getElementById('copyJsonBtn');
    if (b) {
      b.textContent = 'Copied!';
      setTimeout(() => (b.textContent = 'Copy JSON'), 2000);
    }
  }
};

window.downloadJsonFile = function () {
  cyberAudio.playClick();
  const ta = document.getElementById('jsonTextarea');
  const text = ta ? ta.value : JSON.stringify(state.games, null, 2);
  const blob = new Blob([text], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'games.json';
  a.click();
  URL.revokeObjectURL(a.href);
};

window.handleJsonFileUpload = function (e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target?.result;
      JSON.parse(text);
      const ta = document.getElementById('jsonTextarea');
      if (ta) ta.value = text;
    } catch {
      alert('Selected file does not contain valid JSON.');
    }
  };
  reader.readAsText(file);
};

window.commitJsonText = function () {
  try {
    cyberAudio.playClick();
    const ta = document.getElementById('jsonTextarea');
    if (!ta) return;
    const parsed = JSON.parse(ta.value);
    if (!Array.isArray(parsed)) throw new Error('Root element must be an array.');
    for (const item of parsed) {
      if (!item.id || !item.title || !item.iframeUrl) {
        throw new Error('Each title requires id, title, and iframeUrl.');
      }
    }
    state.games = parsed;
    saveGames();
    closeJsonModal();
    render();
  } catch (err) {
    cyberAudio.playGlitch();
    alert('JSON parse error: ' + err.message);
  }
};

window.resetDefaults = function () {
  if (confirm('Reset to factory default games library?')) {
    cyberAudio.playClick();
    state.games = DEFAULT_GAMES;
    localStorage.removeItem('redline_games_library_v3');
    closeJsonModal();
    render();
  }
};

// Start application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
