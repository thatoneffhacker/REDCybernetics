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
    "thumbnail": "https://i1.sndcdn.com/artworks-Y6dTxEIEyemgwxKt-oeH1eQ-t500x500.jpg",
    "instructions": "A / D or Arrow keys to move, W / Up to jump, S / Down to duck. Mouse Left Click or A/S to aim and shoot. Q / E to switch weapons.",
    "tags": ["Action", "2D", "Shooter", "Madness", "Combat"],
    "featured": true,
    "rating": 4.9,
    "plays": 24800
  },
  {
    "id": "mineacraft-1-8",
    "title": "Minecraft 1.8",
    "category": "Sandbox",
    "description": "Direct launcher for Minecraft 1.8 (Eaglercraft) via local media archive link. No iframe wrapper.",
    "url": "file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html",
    "directLink": "file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html",
    "thumbnail": "/assets/aistudio/Minecraft-24_8a496b7b.jpg",
    "instructions": "WASD to walk, Space to jump, Left Click to mine/attack, Right Click to place blocks, E for inventory, ESC to pause/unlock cursor.",
    "tags": ["Sandbox", "3D", "1st Person", "Survival", "Crafting"],
    "featured": true,
    "rating": 5.0,
    "plays": 52400
  },
  {
    "id": "godzilla-daikaiju-battle-royale",
    "title": "Godzilla Daikaiju Battle Royal",
    "category": "Action",
    "description": "Epic 2D monster clash! Choose your legendary kaiju from the Godzilla universe and brawl across destructible cities with devastating atomic blasts.",
    "iframeUrl": "https://www.gameflare.com/embed/godzilla-daikaiju-battle-royale/",
    "embedCode": "<iframe src=\"https://www.gameflare.com/embed/godzilla-daikaiju-battle-royale/\" frameborder=\"0\" scrolling=\"no\" width=\"785\" height=\"535\" allowfullscreen></iframe>",
    "thumbnail": "/assets/aistudio/godzilla_the_animated_movie_poster_by_leivbjerga_dfagf2n-fullview_f936c100.jpg",
    "instructions": "Arrow Keys to move, A / S / D for attack combos, W for special kaiju moves, Space to jump & roar.",
    "tags": ["Action", "2D", "Fighting", "Godzilla", "Kaiju", "Battle Royale"],
    "featured": true,
    "rating": 4.9,
    "plays": 34200
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
  { id: 'VIDEO_PLAYER', label: 'Video Player' },
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

// Curated Video Registry for Unblocked Video Player
const CURATED_VIDEOS = [
  {
    category: "Madness Combat Series (Krinkels)",
    items: [
      {
        id: "f02mOEt11OQ",
        title: "Madness Combat 1",
        channel: "Krinkels",
        thumbnail: "https://img.youtube.com/vi/f02mOEt11OQ/hqdefault.jpg",
        description: "The classic origin of Hank J. Wimbleton in Nevada."
      },
      {
        id: "vhn8j0yR228",
        title: "Madness Combat 7: Consternation",
        channel: "Krinkels",
        thumbnail: "https://img.youtube.com/vi/vhn8j0yR228/hqdefault.jpg",
        description: "The direct animated battle that inspired Madness Accelerant!"
      },
      {
        id: "Bpm_r7bC5wA",
        title: "Madness Combat 11: Expurgation",
        channel: "Krinkels",
        thumbnail: "https://img.youtube.com/vi/Bpm_r7bC5wA/hqdefault.jpg",
        description: "Hank and Sanford battle Tricky the Clown in the hell dimension."
      },
      {
        id: "44x68k8qL04",
        title: "Madness Combat 4: Apotheosis",
        channel: "Krinkels",
        thumbnail: "https://img.youtube.com/vi/44x68k8qL04/hqdefault.jpg",
        description: "The classic DJ club assault and Tricky's epic transformation."
      }
    ]
  },
  {
    category: "Minecraft Survival & Ambient OST",
    items: [
      {
        id: "Dg0IjOzopYU",
        title: "Minecraft - Volume Alpha (Full OST)",
        channel: "C418",
        thumbnail: "https://img.youtube.com/vi/Dg0IjOzopYU/hqdefault.jpg",
        description: "Subwoofer Lullaby, Sweden, Wet Hands, and nostalgic ambient themes."
      },
      {
        id: "yEv43h3kK5Q",
        title: "I Survived 100 Days in Hardcore Minecraft",
        channel: "Luke TheNotable",
        thumbnail: "https://img.youtube.com/vi/yEv43h3kK5Q/hqdefault.jpg",
        description: "The legendary 100-day hardcore survival world marathon."
      },
      {
        id: "kXXc4Fh581U",
        title: "Building a Mega Base in Minecraft",
        channel: "Grian",
        thumbnail: "https://img.youtube.com/vi/kXXc4Fh581U/hqdefault.jpg",
        description: "Huge architectural building tricks, mega-bases and concepts."
      },
      {
        id: "60ItHLz5WEA",
        title: "Minecraft - Volume Beta (Full Album)",
        channel: "C418",
        thumbnail: "https://img.youtube.com/vi/60ItHLz5WEA/hqdefault.jpg",
        description: "Nether tracks, creative mode anthems, and calm synth ambiance."
      }
    ]
  },
  {
    category: "Cyberpunk & 24/7 Gaming Streams",
    items: [
      {
        id: "4xDzrJKXOOY",
        title: "SYNTHWAVE RADIO - 24/7 Chill Gaming Beats",
        channel: "Lofi Girl",
        thumbnail: "https://img.youtube.com/vi/4xDzrJKXOOY/hqdefault.jpg",
        description: "Live retro cyberpunk synthwave beats and gaming radio."
      },
      {
        id: "jfKfPfyJRdk",
        title: "Lofi Hip Hop Radio - Beats to Relax/Study to",
        channel: "Lofi Girl",
        thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/hqdefault.jpg",
        description: "Smooth background lo-fi radio for study, focus, and gaming."
      },
      {
        id: "MVPTGNGiI-4",
        title: "Cyberpunk 2077 - The Rebel Path (Cello Mix)",
        channel: "P.T. Adamczyk",
        thumbnail: "https://img.youtube.com/vi/MVPTGNGiI-4/hqdefault.jpg",
        description: "High adrenaline combat score with crushing electronic cello."
      },
      {
        id: "S_MO4788pMc",
        title: "Retrowave / Darksynth Mix - Neon Night Drive",
        channel: "Astrophysics",
        thumbnail: "https://img.youtube.com/vi/S_MO4788pMc/hqdefault.jpg",
        description: "Dark cyberpunk beats, night driving, and retro-futurism."
      }
    ]
  },
  {
    category: "Speedruns & Gaming Highlights",
    items: [
      {
        id: "V-_O7nl0Ii0",
        title: "How the Minecraft Speedrun Record Was Broken",
        channel: "Karl Jobst",
        thumbnail: "https://img.youtube.com/vi/V-_O7nl0Ii0/hqdefault.jpg",
        description: "Deep dive into world record strategies and blind blaze navigation."
      },
      {
        id: "B8yVqf7gSio",
        title: "Geometry Dash - Top Impossible Levels Beaten",
        channel: "Viprin",
        thumbnail: "https://img.youtube.com/vi/B8yVqf7gSio/hqdefault.jpg",
        description: "Insane reflexes, demonic difficulty levels, and clutch moments."
      }
    ]
  }
];

// Helper to escape HTML attributes & text
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

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
  panicView: 'portal',
  minecraftNotice: false,
  isTheater: false,
  useLocalEngine: false,
  canvasAnimId: null,
  engineScore: 0,
  engineHighScore: parseInt(localStorage.getItem('redline_builtin_highscore') || '0', 10),
  videoState: {
    currentId: 'f02mOEt11OQ',
    currentTitle: 'Madness Combat 1 // Krinkels',
    currentChannel: 'Krinkels',
    embedUrl: 'https://www.youtube-nocookie.com/embed/f02mOEt11OQ?autoplay=1&rel=0',
    searchQuery: '',
    isTheater: false,
    saved: []
  },
  themeMusic: {
    enabled: localStorage.getItem('nexus_music_enabled') !== 'false',
    playing: false,
    videoId: 'kyEhygNI_80',
    title: 'Cheshyre - Project Nexus Theme'
  }
};

// URL / Search string parser for unblocked YouTube player
function parseVideoInput(input) {
  if (!input) return null;
  const trimmed = input.trim();

  // 1) youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return { id: watchMatch[1], isSearch: false };

  // 2) youtu.be/ID
  const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return { id: shortMatch[1], isSearch: false };

  // 3) youtube.com/embed/ID or youtube-nocookie.com/embed/ID
  const embedMatch = trimmed.match(/(?:embed|v)\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return { id: embedMatch[1], isSearch: false };

  // 4) Raw 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return { id: trimmed, isSearch: false };
  }

  // 5) Search query: embed YouTube search playlist
  return { query: trimmed, isSearch: true };
}

// Initialize Games & Persistent State
function initApp() {
  try {
    localStorage.removeItem('redline_games_library_v1');
    localStorage.removeItem('redline_games_library_v2');
    localStorage.removeItem('redline_games_library_v3');
    localStorage.removeItem('redline_games_library_v4');
    localStorage.removeItem('redline_games_library_v5');
    localStorage.removeItem('redline_games_library_v6');
    localStorage.removeItem('redline_games_library_v7');
    localStorage.removeItem('redline_games_library_v8');
    localStorage.removeItem('redline_games_library_v9');
    localStorage.removeItem('redline_games_library_v10');

    const stored = localStorage.getItem('redline_games_library_v11');
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

  try {
    const savedVideos = localStorage.getItem('redline_saved_videos_v2');
    state.videoState.saved = savedVideos ? JSON.parse(savedVideos) : [];
  } catch {
    state.videoState.saved = [];
  }

  // Global ESC key listener for Instant Panic Mode
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (state.isPanic) {
        exitPanic();
      } else {
        triggerPanic();
      }
      return;
    }
    // Search focus
    if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
      e.preventDefault();
      const s = document.getElementById('searchInput');
      if (s) s.focus();
    }
  });

  // User gesture activation for background theme music (complies with browser autoplay policy)
  const startThemeOnGesture = () => {
    if (state.themeMusic.enabled && !state.themeMusic.playing && !state.isPanic && !state.activeGame && state.activeCategory !== 'VIDEO_PLAYER') {
      resumeThemeMusic();
    }
  };
  window.addEventListener('pointerdown', startThemeOnGesture, { once: true });
  window.addEventListener('keydown', startThemeOnGesture, { once: true });

  render();
}

function saveGames() {
  localStorage.setItem('redline_games_library_v11', JSON.stringify(state.games));
}

function saveSavedVideos() {
  localStorage.setItem('redline_saved_videos_v2', JSON.stringify(state.videoState.saved));
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

function openMinecraftLink() {
  cyberAudio.playLaunch();
  const targetUrl = 'file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html';

  // 1. Direct anchor launch
  try {
    const a = document.createElement('a');
    a.href = targetUrl;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch {}

  // 2. Direct window.open attempt
  try {
    window.open(targetUrl, '_blank');
  } catch {}

  // 3. Fallback redirect helper page
  try {
    window.open('./minecraft.html', '_blank');
  } catch {}

  state.minecraftNotice = true;
  render();
}

function openMinecraftBlankTab() {
  openMinecraftLink();
}

function copyMinecraftLink() {
  cyberAudio.playClick();
  const targetUrl = 'file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html';
  navigator.clipboard.writeText(targetUrl).then(() => {
    const btn = document.getElementById('copyMinecraftBtn');
    if (btn) btn.innerText = 'COPIED!';
    setTimeout(() => {
      const b = document.getElementById('copyMinecraftBtn');
      if (b) b.innerText = 'COPY PATH';
    }, 2000);
  }).catch(() => {});
}

function closeMinecraftNotice() {
  cyberAudio.playClick();
  state.minecraftNotice = false;
  render();
}

function selectGame(id) {
  const game = state.games.find((g) => g.id === id);
  if (!game) return;

  // Add to recent
  state.recent = [id, ...state.recent.filter((r) => r !== id)].slice(0, 6);
  saveRecent();

  // Minecraft redirects directly to local file archive link
  if (game.id === 'mineacraft-1-8' || game.openInBlankTab || game.title.toLowerCase().includes('mineacraft') || game.title.toLowerCase().includes('minecraft')) {
    openMinecraftLink();
    return;
  }

  cyberAudio.playLaunch();
  pauseThemeMusic();
  state.activeGame = game;
  state.useLocalEngine = false;

  render();
}

function closePlayer() {
  cyberAudio.playClick();
  if (state.canvasAnimId) {
    cancelAnimationFrame(state.canvasAnimId);
    state.canvasAnimId = null;
  }
  state.activeGame = null;
  resumeThemeMusic();
  render();
}

function triggerPanic(customView) {
  pauseThemeMusic();
  if (cyberAudio && cyberAudio.ctx) {
    try { cyberAudio.ctx.suspend(); } catch {}
  }
  if (state.canvasAnimId) {
    cancelAnimationFrame(state.canvasAnimId);
    state.canvasAnimId = null;
  }
  document.querySelectorAll('video, audio').forEach((el) => {
    try { el.pause(); } catch {}
  });

  state.isPanic = true;
  if (customView) {
    state.panicView = customView;
  } else if (!state.panicView) {
    state.panicView = 'portal';
  }

  updatePanicTitleAndFavicon();
  render();
}

function exitPanic() {
  cyberAudio.playClick();
  state.isPanic = false;
  document.title = 'RED Cybernetics // UNBLOCKED';
  restoreOriginalFavicon();
  resumeThemeMusic();
  render();
}

function setPanicView(view) {
  state.panicView = view;
  updatePanicTitleAndFavicon();
  render();
}

function panicRedirect(target) {
  if (target === 'google') {
    window.location.replace('https://www.google.com');
  } else if (target === 'classroom') {
    window.location.replace('https://classroom.google.com');
  } else if (target === 'canvas') {
    window.location.replace('https://canvas.instructure.com');
  } else if (target === 'blank') {
    window.location.replace('about:blank');
  } else if (target === 'wikipedia') {
    window.location.replace('https://en.wikipedia.org/wiki/Main_Page');
  }
}

function updatePanicTitleAndFavicon() {
  if (state.panicView === 'portal') {
    document.title = 'Dashboard // Canvas LMS';
    setFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e02424"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="white"/></svg>');
  } else if (state.panicView === 'docs') {
    document.title = 'AP Bio: Unit 4 Cellular Respiration Notes - Google Docs';
    setFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%234285F4"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>');
  } else if (state.panicView === 'classroom') {
    document.title = 'Classes - Google Classroom';
    setFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%230F9D58"><rect width="24" height="24" rx="4"/></svg>');
  } else if (state.panicView === 'blank') {
    document.title = 'about:blank';
    setFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect width="24" height="24" fill="%23ffffff"/></svg>');
  }
}

function setFavicon(url) {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
}

function restoreOriginalFavicon() {
  const link = document.querySelector("link[rel~='icon']");
  if (link) {
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff003c"><polygon points="12 2 2 22 22 22"/></svg>';
  }
}

function pauseThemeMusic() {
  const iframe = document.getElementById('nexusThemeIframe');
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    } catch {}
  }
  state.themeMusic.playing = false;
  updateMusicHUD();
}

function resumeThemeMusic() {
  if (!state.themeMusic.enabled || state.isPanic || state.activeGame || state.activeCategory === 'VIDEO_PLAYER') return;
  const iframe = document.getElementById('nexusThemeIframe');
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', '*');
    } catch {}
  }
  state.themeMusic.playing = true;
  updateMusicHUD();
}

function toggleThemeMusic() {
  cyberAudio.playClick();
  state.themeMusic.enabled = !state.themeMusic.enabled;
  localStorage.setItem('nexus_music_enabled', state.themeMusic.enabled.toString());
  if (state.themeMusic.enabled) {
    resumeThemeMusic();
  } else {
    pauseThemeMusic();
  }
  updateMusicHUD();
}

function updateMusicHUD() {
  const eq = document.getElementById('musicEqBars');
  const label = document.getElementById('musicStatusText');
  const toggleBtn = document.getElementById('musicToggleBtn');
  if (eq) {
    eq.style.opacity = state.themeMusic.playing && state.themeMusic.enabled ? '1' : '0.35';
  }
  if (label) {
    label.innerText = state.themeMusic.enabled ? (state.themeMusic.playing ? 'PLAYING' : 'PAUSED') : 'MUTED';
  }
  if (toggleBtn) {
    toggleBtn.innerHTML = state.themeMusic.enabled && state.themeMusic.playing
      ? '<svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      : '<svg class="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>';
  }
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
  if (state.activeGame && state.activeGame.embedCode && state.activeGame.iframeUrl === url) {
    doc.body.innerHTML = state.activeGame.embedCode;
    return;
  }
  const style = doc.createElement('style');
  style.innerHTML = 'body { background: black; color: white; margin: 0; padding: 0; overflow: hidden; } iframe { position: absolute; width: 100%; height: 100%; border: none; z-index: 999; }';
  doc.head.appendChild(style);
  const iframe = doc.createElement('iframe');
  iframe.src = url;
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  iframe.setAttribute('width', '100%');
  iframe.setAttribute('height', '100%');
  iframe.setAttribute('loading', 'lazy');
  iframe.allowFullscreen = true;
  iframe.allow = 'autoplay; fullscreen; gamepad; focus-without-user-activation; clipboard-write; keyboard-map; pointer-lock';
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
    <div class="min-h-screen nexus-bg nexus-grid text-zinc-100 flex flex-col relative selection:bg-red-600 selection:text-white">
      ${state.scanlines ? '<div class="fixed inset-0 scanlines pointer-events-none z-30"></div>' : ''}

      <!-- Background Theme Music Player (Cheshyre - Project Nexus Classic Theme) -->
      <iframe
        id="nexusThemeIframe"
        src="https://www.youtube-nocookie.com/embed/${state.themeMusic.videoId}?enablejsapi=1&autoplay=1&loop=1&playlist=${state.themeMusic.videoId}&controls=0&modestbranding=1"
        class="w-0 h-0 opacity-0 pointer-events-none absolute left-0 top-0 -z-50"
        allow="autoplay; encrypted-media"
        title="Madness Project Nexus Theme Song"
      ></iframe>

      <!-- Top Navbar with Soundtrack HUD -->
      <header class="sticky top-0 z-40 bg-[#0b0102]/95 backdrop-blur-md border-b border-red-950 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2.5 cursor-pointer" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">
            <div class="w-9 h-9 bg-red-950 border-2 border-red-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,0,40,0.8)]">
              <svg class="w-5 h-5 fill-current text-red-500" viewBox="0 0 24 24"><polygon points="12 2 2 22 22 22"/></svg>
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-display font-black text-sm sm:text-base tracking-[0.2em] text-white uppercase text-neon-glow">RED CYBERNETICS</span>
              </div>
              <div class="flex items-center gap-2 text-[10px] font-mono-code text-red-400/80">
                <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>SERVER STATUS</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Soundtrack Equalizer HUD (Center/Right) -->
        <div class="flex items-center gap-2 sm:gap-4">
          <div class="flex items-center gap-2.5 bg-black/80 border border-red-950 px-3 py-1.5 rounded-xs shadow-[0_0_10px_rgba(180,0,0,0.3)]">
            <div id="musicEqBars" class="flex items-end gap-1 h-3.5 transition-opacity" style="opacity: ${state.themeMusic.playing && state.themeMusic.enabled ? '1' : '0.35'}">
              <span class="w-1 bg-red-600 rounded-xs nexus-eq-1"></span>
              <span class="w-1 bg-red-500 rounded-xs nexus-eq-2"></span>
              <span class="w-1 bg-red-600 rounded-xs nexus-eq-3"></span>
              <span class="w-1 bg-red-500 rounded-xs nexus-eq-4"></span>
              <span class="w-1 bg-red-600 rounded-xs nexus-eq-5"></span>
            </div>
            <div class="hidden md:flex flex-col text-left">
              <span class="text-[9px] font-mono-code text-red-400 font-bold tracking-widest uppercase">OST THEME</span>
              <span class="text-[10px] font-mono-code text-zinc-300 truncate max-w-[170px]">${state.themeMusic.title}</span>
            </div>
            <button id="musicToggleBtn" onclick="window.toggleThemeMusic()" class="nexus-btn cursor-pointer" title="Toggle Menu Theme Song">
              <span class="nexus-btn-inner !py-1 !px-2 !text-[10px] flex items-center gap-1">
                ${state.themeMusic.enabled && state.themeMusic.playing
                  ? '<svg class="w-3 h-3 fill-current" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
                  : '<svg class="w-3 h-3 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>'
                }
                <span id="musicStatusText" class="hidden sm:inline">${state.themeMusic.enabled ? (state.themeMusic.playing ? 'PLAYING' : 'PAUSED') : 'MUTED'}</span>
              </span>
            </button>
          </div>

          <!-- Video Player & Panic Key Shortcuts -->
          <button onclick="window.setCategory('VIDEO_PLAYER')" class="nexus-btn cursor-pointer ${state.activeCategory === 'VIDEO_PLAYER' ? 'active' : ''}" title="Unblocked YouTube Video Player">
            <span class="nexus-btn-inner !py-1.5 !px-3 !text-xs flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 fill-current text-red-500" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              <span class="hidden sm:inline">VIDEOS</span>
            </span>
          </button>

          <button onclick="window.triggerPanic()" class="nexus-btn cursor-pointer" title="Emergency Cloak (or press ESC)">
            <span class="nexus-btn-inner !py-1.5 !px-3 !text-xs !text-red-400 hover:!text-white flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span class="hidden sm:inline">PANIC [ESC]</span>
            </span>
          </button>

          <button onclick="window.openJsonModal()" class="nexus-btn cursor-pointer hidden lg:inline-flex" title="Inspect games.json">
            <span class="nexus-btn-inner !py-1.5 !px-2.5 !text-xs">JSON</span>
          </button>

          <button onclick="window.toggleScanlines()" class="p-2 border border-red-950 bg-black/60 hover:border-red-600 transition-colors cursor-pointer ${state.scanlines ? 'text-red-400' : 'text-zinc-500'}" title="Toggle CRT Scanlines">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/></svg>
          </button>

          <button onclick="window.toggleAudio()" class="p-2 border border-red-950 bg-black/60 hover:border-red-600 transition-colors cursor-pointer ${state.audio ? 'text-red-400' : 'text-zinc-500'}" title="Sound Effects">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/></svg>
          </button>
        </div>
      </header>

      <!-- Authentic Madness Combat: Project Nexus Classic Menu Hero Banner -->
      <section class="relative w-full overflow-hidden border-b border-red-950/80 bg-black/40 pt-7 pb-8 px-4 sm:px-8">
        <!-- Coordinate Marks Along the Right Margin -->
        <div class="absolute right-5 top-6 hidden md:flex flex-col gap-6 font-mono-code text-[11px] text-red-900/40 font-bold select-none pointer-events-none">
          <span>250</span>
          <span>275</span>
          <span>300</span>
          <span>325</span>
        </div>

        <div class="max-w-4xl mx-auto">
          <!-- Upper Glowing Red Divider Bar -->
          <div class="nexus-bar mb-6"></div>

          <!-- Official Launch Bulletin -->
          <div class="text-center space-y-4 py-3">
            <h2 class="text-xl sm:text-3xl font-display font-black text-white tracking-wide uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] max-w-3xl mx-auto">
              WELCOME TO THE OFFICIAL LAUNCH OF RED CYBERNETICS
            </h2>

            <!-- The classic node line: o────────── -->
            <div class="flex items-center justify-center gap-2 py-1 max-w-xl mx-auto">
              <div class="h-0.5 flex-1 bg-gradient-to-r from-transparent via-red-900 to-red-600"></div>
              <div class="w-2.5 h-2.5 rounded-full border border-red-500 bg-red-950 flex items-center justify-center">
                <div class="w-1 h-1 bg-red-500 rounded-full"></div>
              </div>
              <div class="h-0.5 flex-1 bg-gradient-to-r from-red-600 via-red-900 to-transparent"></div>
            </div>

            <p class="text-sm sm:text-base font-sans italic text-zinc-300 tracking-wide leading-relaxed">
              This website will be updated often with new content!
            </p>

            <div class="text-xl sm:text-3xl font-display font-black text-white tracking-wider uppercase pt-2 drop-shadow-[0_0_15px_rgba(255,0,40,0.7)]">
              THIS IS ONLY THE BEGINNING
            </div>
          </div>
        </div>
      </section>

      <!-- Lower Glowing Red Divider Bar -->
      <div class="nexus-bar"></div>

      <!-- Navigation & Filters Bar -->
      <div class="bg-black/70 border-b border-red-950/80 py-4 px-4 sm:px-8">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
          <div class="relative w-full lg:max-w-md">
            <input
              id="searchInput"
              type="text"
              placeholder="Search by game title, category, or #tags..."
              value="${state.searchQuery}"
              oninput="window.handleSearch(this.value)"
              class="w-full px-4 py-2.5 pl-10 pr-12 bg-black/90 border border-red-950 hover:border-red-700 focus:border-red-500 text-white font-mono-code text-xs tracking-wide focus:outline-hidden transition-colors"
            />
            <svg class="w-4 h-4 text-red-500 absolute left-3.5 top-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <kbd class="absolute right-3 top-2.5 px-1.5 py-0.5 text-[10px] font-mono-code bg-red-950/60 border border-red-900 text-red-400 rounded-xs">/</kbd>
          </div>

          <div class="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
            ${CATEGORIES.map((cat) => `
              <button
                onclick="window.setCategory('${cat.id}')"
                class="nexus-btn shrink-0 cursor-pointer ${state.activeCategory === cat.id ? 'active' : ''}"
              >
                <span class="nexus-btn-inner !py-1.5 !px-3 !text-xs whitespace-nowrap">
                  ${cat.label} ${cat.id === 'FAVORITES' && state.favorites.length > 0 ? `(${state.favorites.length})` : ''}
                </span>
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Main Body Content -->
      <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 space-y-10">
        ${state.activeCategory === 'VIDEO_PLAYER' ? renderVideoPlayerSection() : `
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
        `}
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
      ${renderMinecraftNoticeModal()}
    </div>
  `;

  // Start canvas if local engine is active in player
  if (state.activeGame && state.useLocalEngine) {
    initLocalEngineCanvas();
  }
}

// Render Unblocked Video Player Section
function renderVideoPlayerSection() {
  const current = state.videoState;
  const isCurrentlySaved = current.currentId && current.saved.some((v) => v.id === current.currentId);

  return `
    <div class="space-y-8">
      <!-- Section Banner & Navigation Bar -->
      <div class="bg-[#09090e] border border-red-950/80 p-5 sm:p-6 cyber-cut flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 text-xs font-mono-code text-red-500 mb-1">
            <span class="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            <span>UNBLOCKED VIDEO TRANSMISSION PROTOCOL</span>
            <span class="text-zinc-600">·</span>
            <span class="text-zinc-400">YOUTUBE-NOCOOKIE DIRECT PROXY</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-display font-black text-white tracking-wider flex items-center gap-2 text-neon-glow uppercase">
            <span>VIDEO PLAYER</span>
            <span class="text-xs font-mono-code text-red-400 bg-red-950/60 px-2 py-0.5 border border-red-800/40 font-normal">UNBLOCKED YT</span>
          </h2>
          <p class="text-xs font-mono-code text-zinc-400 mt-1 max-w-2xl">
            Stream any video, gaming soundtrack, or walkthrough without network restrictions. Paste YouTube URLs, video IDs, or search keywords directly.
          </p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="window.setCategory('ALL')" class="px-3.5 py-2 bg-black/60 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 text-zinc-300 hover:text-white font-mono-code text-xs transition-colors flex items-center gap-1.5 cursor-pointer">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
            <span>Back to Games</span>
          </button>
        </div>
      </div>

      <!-- Search & URL Loader Form -->
      <div class="bg-[#07070c] border border-red-950/70 p-4 sm:p-5 cyber-cut-sm space-y-3">
        <form onsubmit="window.handleVideoSearchSubmit(event)" class="flex flex-col sm:flex-row gap-2.5">
          <div class="relative flex-1">
            <input
              id="videoSearchInput"
              type="text"
              placeholder="Search YouTube (e.g. Madness Combat, Minecraft 100 Days, Synthwave) or paste URL..."
              value="${escapeHtml(current.searchQuery)}"
              class="w-full px-4 py-3 pl-10 pr-4 bg-black/90 border border-zinc-800 hover:border-red-900/60 focus:border-red-500 text-white font-mono-code text-xs tracking-wide focus:outline-hidden transition-all shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]"
            />
            <svg class="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <button type="submit" class="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-xs uppercase tracking-wider cyber-cut transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer shrink-0">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            <span>SEARCH / STREAM</span>
          </button>
        </form>

        <!-- Quick Search Tags -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] font-mono-code text-zinc-400">
          <span class="text-zinc-500 shrink-0 uppercase">Hot Searches:</span>
          ${[
            'Madness Combat 7',
            'Minecraft 100 Days',
            'C418 Minecraft OST',
            'Cyberpunk Synthwave',
            'Speedrun World Record',
            'Geometry Dash Extreme',
            'Alan Walker Faded'
          ].map((tag) => `
            <button
              type="button"
              onclick="window.searchVideo('${tag}')"
              class="px-2.5 py-1 bg-black/70 hover:bg-red-950/40 border border-zinc-800/80 hover:border-red-700 text-zinc-300 hover:text-red-400 whitespace-nowrap transition-colors cursor-pointer"
            >
              #${tag}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Main Video Player Stage -->
      <div id="videoPlayerStage" class="bg-[#08080d] border border-red-900/60 shadow-[0_0_35px_rgba(255,0,60,0.25)] flex flex-col ${
        current.isTheater ? 'w-full max-w-none' : 'max-w-5xl mx-auto cyber-cut'
      }">
        <!-- Player Header Bar -->
        <div class="px-4 sm:px-6 py-3 border-b border-red-950 bg-red-950/20 flex flex-wrap items-center justify-between gap-3">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping shrink-0"></span>
            <div class="min-w-0">
              <h3 class="text-xs sm:text-sm font-display font-bold text-white tracking-wider truncate text-neon-glow">
                ${escapeHtml(current.currentTitle)}
              </h3>
              <div class="flex items-center gap-2 text-[10px] font-mono-code text-zinc-400 truncate">
                <span class="text-red-400">${escapeHtml(current.currentChannel || 'Unblocked YouTube Stream')}</span>
                <span>·</span>
                <span class="truncate max-w-xs sm:max-w-md text-zinc-500">${current.embedUrl}</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2">
            <button
              onclick="window.saveCurrentVideo()"
              class="p-2 border transition-colors cursor-pointer ${
                isCurrentlySaved ? 'bg-red-600 text-white border-red-500 shadow-[0_0_10px_rgba(255,0,60,0.7)]' : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-red-400 hover:border-red-600/50'
              }"
              title="${isCurrentlySaved ? 'Bookmarked!' : 'Bookmark this video'}"
            >
              <svg class="w-4 h-4 ${isCurrentlySaved ? 'fill-current' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
            </button>

            <button onclick="window.reloadVideoIframe()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer" title="Reload Video Stream">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
            </button>

            <button onclick="window.toggleVideoTheater()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer hidden sm:block" title="Toggle Wide Theater Mode">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="13" x2="15.01" y2="13"/><line x1="18" y1="11" x2="18.01" y2="11"/><rect x="2" y="6" width="20" height="12" rx="2"/></svg>
            </button>

            <button onclick="window.toggleVideoFullscreen()" class="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors cursor-pointer" title="Toggle Fullscreen">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
            </button>

            <button onclick="window.launchAboutBlankCloak('${current.embedUrl}')" class="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800 hover:border-red-500 text-xs font-mono-code font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer" title="Open inside an about:blank tab cloaked as Google Drive">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span class="hidden md:inline">Cloak Tab</span>
            </button>
          </div>
        </div>

        <!-- Video Iframe Display -->
        <div class="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
          <iframe
            id="mainVideoIframe"
            src="${current.embedUrl}"
            title="${escapeHtml(current.currentTitle)}"
            class="w-full h-full border-none bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <div class="absolute inset-0 crt-vignette pointer-events-none"></div>
        </div>

        <!-- Video Footer Controls & Direct Info -->
        <div class="px-4 sm:px-6 py-3 bg-[#0c0c14] border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div class="flex items-center gap-2 text-zinc-400">
            <span class="text-red-500 font-bold">STATUS:</span>
            <span>Unblocked YouTube Stream Active</span>
          </div>

          <div class="flex items-center gap-3">
            ${current.currentId ? `
              <a href="https://www.youtube.com/watch?v=${current.currentId}" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors">
                <span>Direct YouTube Link</span>
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Bookmarked Videos (if any) -->
      ${current.saved.length > 0 ? `
        <div class="space-y-3">
          <div class="flex items-center justify-between border-b border-red-950/60 pb-2">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              <h3 class="font-display font-bold text-sm tracking-wider text-white uppercase">SAVED TRANSMISSIONS</h3>
              <span class="text-zinc-600 font-mono-code text-xs">/</span>
              <span class="text-zinc-400 font-mono-code text-xs">${current.saved.length} Bookmarked</span>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            ${current.saved.map((item) => `
              <div class="group relative bg-[#09090e] border border-red-950 hover:border-red-600/70 p-3 cyber-cut-sm transition-all hover:shadow-[0_0_15px_rgba(255,0,60,0.25)] flex flex-col justify-between">
                <div>
                  <div onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel || '')}')" class="relative aspect-video overflow-hidden bg-black mb-2.5 cursor-pointer">
                    <img src="${item.thumbnail || `https://img.youtube.com/vi/${item.id}/hqdefault.jpg`}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all" loading="lazy" />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                      <div class="w-10 h-10 bg-red-600 text-white rounded-xs flex items-center justify-center shadow-[0_0_15px_rgba(255,0,60,0.8)]">
                        <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                      </div>
                    </div>
                  </div>
                  <h4 onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel || '')}')" class="font-display font-bold text-xs text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer">
                    ${escapeHtml(item.title)}
                  </h4>
                  <p class="text-[11px] font-mono-code text-zinc-500 mt-0.5">${escapeHtml(item.channel || 'YouTube')}</p>
                </div>
                <div class="mt-3 pt-2 border-t border-zinc-900 flex items-center justify-between">
                  <button onclick="window.removeSavedVideo('${item.id}')" class="text-[10px] font-mono-code text-zinc-500 hover:text-red-400 transition-colors cursor-pointer">
                    Remove
                  </button>
                  <button onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel || '')}')" class="px-2.5 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/40 text-[10px] font-mono-code font-bold uppercase transition-all cursor-pointer">
                    Play
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Curated Video Collections & Playlists -->
      <div class="space-y-8">
        ${CURATED_VIDEOS.map((section) => `
          <div class="space-y-3">
            <div class="flex items-center justify-between border-b border-red-950/60 pb-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                <h3 class="font-display font-bold text-sm tracking-wider text-white uppercase">${section.category}</h3>
                <span class="text-zinc-600 font-mono-code text-xs">/</span>
                <span class="text-zinc-400 font-mono-code text-xs">Curated Transmission</span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              ${section.items.map((item) => `
                <div class="group relative bg-[#09090e] border border-red-950/80 hover:border-red-600/70 p-3 cyber-cut-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(255,0,60,0.25)] flex flex-col justify-between">
                  <div>
                    <div onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel)}')" class="relative aspect-video overflow-hidden bg-black mb-2.5 cursor-pointer">
                      <img src="${item.thumbnail}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" loading="lazy" />
                      <div class="absolute inset-0 scanlines opacity-40 pointer-events-none"></div>
                      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 backdrop-blur-[2px] transition-opacity">
                        <div class="w-10 h-10 bg-red-600 text-white rounded-xs flex items-center justify-center shadow-[0_0_15px_rgba(255,0,60,0.8)]">
                          <svg class="w-4 h-4 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                      </div>
                    </div>

                    <div class="text-[10px] font-mono-code text-red-400 mb-1 font-semibold uppercase tracking-wider">${escapeHtml(item.channel)}</div>
                    <h4 onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel)}')" class="font-display font-bold text-xs text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer">
                      ${escapeHtml(item.title)}
                    </h4>
                    <p class="text-[11px] font-mono-code text-zinc-400 line-clamp-2 mt-1 leading-relaxed">${escapeHtml(item.description)}</p>
                  </div>

                  <div class="mt-4 pt-2.5 border-t border-zinc-900 flex items-center justify-between text-xs font-mono-code">
                    <button onclick="window.launchAboutBlankCloak('https://www.youtube-nocookie.com/embed/${item.id}?autoplay=1&rel=0')" class="text-[10px] text-zinc-500 hover:text-red-400 transition-colors cursor-pointer" title="Cloak in about:blank">
                      Cloak
                    </button>
                    <button onclick="window.playVideo('${item.id}', '${escapeHtml(item.title)}', '${escapeHtml(item.channel)}')" class="px-3 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/40 hover:border-red-500 text-xs font-mono-code font-bold uppercase tracking-wider transition-all cursor-pointer">
                      Play Now
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Render Game Card
function renderGameCard(game) {
  const isFav = state.favorites.includes(game.id);
  return `
    <div class="group relative bg-[#110103] border-2 border-red-950 hover:border-red-600 transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-[0_0_12px_rgba(100,0,0,0.3)] hover:shadow-[0_0_22px_rgba(255,0,40,0.4)] hover:-translate-y-0.5">
      <div class="relative aspect-[16/10] w-full overflow-hidden bg-black">
        <img src="${game.thumbnail}" alt="${game.title}" class="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" loading="lazy" />
        <div class="absolute inset-0 scanlines opacity-40 pointer-events-none"></div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#110103] via-transparent to-transparent"></div>

        <button onclick="window.toggleFavorite('${game.id}', event)" class="absolute top-2.5 right-2.5 p-2 rounded-xs backdrop-blur-xs transition-colors z-10 cursor-pointer ${
          isFav ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,40,0.8)]' : 'bg-black/70 text-zinc-400 hover:text-red-400 border border-red-950'
        }" title="${isFav ? 'Remove from favorites' : 'Add to favorites'}">
          <svg class="w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>

        ${game.featured ? `
          <div class="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-mono-code font-bold text-red-400 bg-black/90 px-2 py-0.5 border border-red-700 backdrop-blur-xs">
            <svg class="w-3 h-3 text-red-500 fill-current" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            <span>NEXUS ELITE</span>
          </div>
        ` : ''}

        <div onclick="window.selectGame('${game.id}')" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/45 backdrop-blur-[2px] cursor-pointer">
          <div class="w-12 h-12 bg-red-700 hover:bg-red-600 border border-red-400 text-white flex items-center justify-center rounded-xs shadow-[0_0_20px_rgba(255,0,40,0.9)] transition-transform hover:scale-110">
            <svg class="w-5 h-5 fill-current ml-0.5" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
          </div>
        </div>
      </div>

      <div class="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-[11px] font-mono-code text-red-400/80 mb-1.5 uppercase font-semibold">
            <span class="text-red-400">${game.category}</span>
            <span>·</span>
            <span>★ ${game.rating || 4.8}</span>
            ${game.plays ? `<span>·</span><span>${(game.plays / 1000).toFixed(1)}k plays</span>` : ''}
          </div>
          <h3 onclick="window.selectGame('${game.id}')" class="font-display font-bold text-sm tracking-wide text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer">
            ${game.title}
          </h3>
          <p class="text-xs text-zinc-400 font-mono-code line-clamp-2 mt-1 leading-relaxed">${game.description}</p>
        </div>

        <div class="mt-4 pt-3 border-t border-red-950 flex items-center justify-between text-xs font-mono-code">
          <div class="flex items-center gap-1.5 text-zinc-500 text-[10px] truncate max-w-[140px]">
            ${game.tags ? game.tags.slice(0, 2).map((t) => `<span>#${t}</span>`).join('') : ''}
          </div>
          <div class="flex items-center gap-2">
            ${game.isCustom ? `
              <button onclick="window.deleteCustomGame('${game.id}', event)" class="p-1 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer" title="Delete custom game">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            ` : ''}
            <button onclick="window.selectGame('${game.id}')" class="nexus-btn cursor-pointer">
              <span class="nexus-btn-inner !py-1 !px-3 !text-[11px] flex items-center gap-1.5">
                <span>DEPLOY</span>
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="h-0.5 w-full bg-red-950 group-hover:bg-red-600 transition-colors"></div>
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

            <button onclick="window.triggerPanic()" class="px-2.5 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-xs uppercase tracking-wider cyber-cut transition-all shadow-[0_0_10px_rgba(255,0,60,0.6)] cursor-pointer flex items-center gap-1.5" title="Instant Panic Mode (or press ESC)">
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span>PANIC [ESC]</span>
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
              width="100%"
              height="100%"
              frameborder="0"
              class="w-full h-full min-h-[420px] sm:min-h-[540px] border-none bg-black"
              allow="autoplay; fullscreen; xr-spatial-tracking; gamepad; focus-without-user-activation; clipboard-write; keyboard-map; pointer-lock"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-pointer-lock"
              allowfullscreen
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

// Render Panic Disguise Screen (Fake School Portal, Google Docs, Classroom, Blank)
function renderPanicScreen() {
  const currentView = state.panicView || 'portal';

  // Common Top Disguise Selector & Emergency Hard Redirect Toolbar
  const stealthBar = `
    <div class="bg-[#1f2937] text-gray-200 text-xs px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between border-b border-gray-700 select-none shrink-0 z-20">
      <div class="flex items-center gap-1 sm:gap-2">
        <span class="text-gray-400 font-semibold mr-1 hidden sm:inline">DISGUISE:</span>
        <button onclick="window.setPanicView('portal')" class="px-2 py-0.5 rounded cursor-pointer ${currentView === 'portal' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}">
          🎓 Canvas Portal
        </button>
        <button onclick="window.setPanicView('docs')" class="px-2 py-0.5 rounded cursor-pointer ${currentView === 'docs' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}">
          📄 Google Docs
        </button>
        <button onclick="window.setPanicView('classroom')" class="px-2 py-0.5 rounded cursor-pointer ${currentView === 'classroom' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}">
          📚 Classroom
        </button>
        <button onclick="window.setPanicView('blank')" class="px-2 py-0.5 rounded cursor-pointer ${currentView === 'blank' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}">
          ⬛ Blank Page
        </button>
      </div>

      <div class="flex items-center gap-2 mt-1 sm:mt-0">
        <div class="flex items-center gap-1 text-[11px] text-gray-400 hidden md:flex">
          <span>Emergency Hard Redirect:</span>
          <button onclick="window.panicRedirect('google')" class="text-blue-400 hover:underline cursor-pointer">Google</button>
          <span>·</span>
          <button onclick="window.panicRedirect('classroom')" class="text-blue-400 hover:underline cursor-pointer">Classroom</button>
          <span>·</span>
          <button onclick="window.panicRedirect('blank')" class="text-blue-400 hover:underline cursor-pointer">about:blank</button>
        </div>
        <button onclick="window.exitPanic()" class="px-2.5 py-0.5 bg-gray-700 hover:bg-emerald-700 text-gray-200 hover:text-white rounded text-xs transition-colors cursor-pointer" title="Return to RED Cybernetics (or press ESC)">
          Restore [ESC]
        </button>
      </div>
    </div>
  `;

  // 1. Fake School Portal (Canvas LMS / District SIS)
  if (currentView === 'portal') {
    return `
      <div class="fixed inset-0 z-[9999] bg-[#f5f5f5] text-[#2d3b45] font-sans flex flex-col select-text overflow-hidden">
        ${stealthBar}

        <div class="flex-1 flex overflow-hidden">
          <!-- Canvas Left Navigation Sidebar -->
          <aside class="w-16 sm:w-20 bg-[#2d3b45] text-white flex flex-col items-center py-3 select-none shrink-0 z-10">
            <div class="w-10 h-10 rounded-full bg-[#e02424] flex items-center justify-center font-bold text-white mb-6 shadow-sm">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4" fill="#2d3b45"/></svg>
            </div>

            <div class="flex flex-col items-center gap-5 w-full text-[11px] font-medium text-gray-300">
              <button onclick="window.exitPanic()" class="flex flex-col items-center gap-1 group w-full py-1 hover:text-white cursor-pointer" title="Alex Taylor (Click or press ESC to exit)">
                <div class="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-xs font-bold text-white border border-gray-400">AT</div>
                <span class="text-[10px]">Account</span>
              </button>

              <div class="flex flex-col items-center gap-1 w-full py-1.5 bg-[#1e272e] text-white border-l-4 border-[#e02424]">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span class="text-[10px]">Dashboard</span>
              </div>

              <div class="flex flex-col items-center gap-1 w-full py-1 hover:text-white cursor-pointer">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span class="text-[10px]">Courses</span>
              </div>

              <div class="flex flex-col items-center gap-1 w-full py-1 hover:text-white cursor-pointer">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span class="text-[10px]">Calendar</span>
              </div>

              <div class="flex flex-col items-center gap-1 w-full py-1 hover:text-white relative cursor-pointer">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <span class="text-[10px]">Inbox</span>
                <span class="absolute top-0 right-3 bg-[#e02424] text-white text-[9px] font-bold px-1 rounded-full">3</span>
              </div>

              <div class="flex flex-col items-center gap-1 w-full py-1 hover:text-white cursor-pointer">
                <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 14 14"/></svg>
                <span class="text-[10px]">History</span>
              </div>
            </div>
          </aside>

          <!-- Main Dashboard Area -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col">
            <!-- Header bar -->
            <div class="flex flex-wrap items-center justify-between border-b border-gray-300 pb-3 mb-6 gap-3">
              <div>
                <h1 class="text-2xl font-bold text-gray-800 tracking-tight">Dashboard</h1>
                <p class="text-xs text-gray-500">Oakridge Unified School District · Student Information Portal (Canvas LMS)</p>
              </div>

              <div class="flex items-center gap-3 text-xs text-gray-600 bg-white px-3 py-1.5 rounded border border-gray-300 shadow-2xs">
                <span>Student: <strong class="text-gray-800">Alex Taylor</strong></span>
                <span>·</span>
                <span>Term: <strong>Spring 2026</strong></span>
                <span>·</span>
                <span class="text-emerald-700 font-bold">GPA: 3.92</span>
              </div>
            </div>

            <!-- District Alert Banner -->
            <div class="bg-blue-50 border-l-4 border-blue-600 p-3 mb-6 rounded-r text-xs text-blue-900 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span><strong>District Notice:</strong> Midterm assessment schedules have been posted. Spring semester parent-teacher conference signups close Friday at 5:00 PM.</span>
              </div>
              <span class="text-[11px] text-blue-700 ml-2 hidden sm:inline">Dismiss</span>
            </div>

            <!-- Content Grid with Course Cards and To-Do Sidebar -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Courses Columns (3 cols) -->
              <div class="lg:col-span-3 space-y-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-sm font-bold text-gray-700 uppercase tracking-wider">Enrolled Courses (6)</h2>
                  <span class="text-xs text-blue-600 hover:underline cursor-pointer">Customize Cards</span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  <!-- Course 1 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#15803d] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 2 · Room 214</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">AP Biology (Harrison)</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">96.4% A</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">BIO-401-02 · Spring 2026</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 2</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 1</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 4</span>
                      </div>
                    </div>
                  </div>

                  <!-- Course 2 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#b91c1c] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 3 · Room 108</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">AP European History</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">94.2% A</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">HIST-302-03 · Mr. Vance</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 1</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 2</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 1</span>
                      </div>
                    </div>
                  </div>

                  <!-- Course 3 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#1d4ed8] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 1 · Room 302</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">Honors English 11</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">98.1% A+</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">ENG-201-01 · Ms. Crawford</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 3</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 1</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 8</span>
                      </div>
                    </div>
                  </div>

                  <!-- Course 4 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#6d28d9] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 4 · Room 220</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">Pre-Calculus BC Honors</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">95.0% A</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">MATH-400-04 · Mrs. Zhang</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 1</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 3</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 0</span>
                      </div>
                    </div>
                  </div>

                  <!-- Course 5 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#c2410c] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 6 · Room 112</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">AP Physics 1: Mechanics</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">93.8% A</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">PHYS-501-06 · Mr. Kowalski</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 2</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 1</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 2</span>
                      </div>
                    </div>
                  </div>

                  <!-- Course 6 -->
                  <div class="bg-white rounded-md border border-gray-200 overflow-hidden shadow-2xs hover:shadow-md transition-shadow">
                    <div class="h-28 bg-[#0f766e] p-3 text-white flex flex-col justify-between relative">
                      <span class="text-[11px] font-bold bg-black/25 px-2 py-0.5 rounded w-max">Period 7 · Lab 4</span>
                      <div class="absolute top-2 right-2 text-white/80 hover:text-white cursor-pointer">•••</div>
                    </div>
                    <div class="p-4">
                      <div class="flex items-baseline justify-between mb-1">
                        <h3 class="font-bold text-gray-900 text-sm hover:text-blue-600 cursor-pointer">Intro to Computer Science</h3>
                        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">99.5% A+</span>
                      </div>
                      <p class="text-xs text-gray-500 mb-4">CS-101-07 · Dr. Martinez</p>
                      <div class="flex items-center gap-3 pt-3 border-t border-gray-100 text-gray-400 text-xs">
                        <span title="Announcements" class="hover:text-blue-600 cursor-pointer">📢 4</span>
                        <span title="Assignments" class="hover:text-blue-600 cursor-pointer">📝 0</span>
                        <span title="Discussions" class="hover:text-blue-600 cursor-pointer">💬 12</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right To-Do / Feedback Sidebar (1 col) -->
              <div class="space-y-6">
                <!-- To Do Card -->
                <div class="bg-white p-4 rounded-md border border-gray-200 shadow-2xs">
                  <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">To Do</h3>
                  <div class="space-y-3 text-xs">
                    <div class="flex items-start gap-2">
                      <span class="text-emerald-600 font-bold mt-0.5">●</span>
                      <div>
                        <div class="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">Turn in: Ch 9 AP Bio Energetics Practice</div>
                        <div class="text-[11px] text-gray-500">AP Biology · 50 points</div>
                        <div class="text-[11px] text-red-600 font-medium">Due Today at 11:59 PM</div>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <span class="text-blue-600 font-bold mt-0.5">●</span>
                      <div>
                        <div class="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">Submit: Industrial Revolution DBQ Outline</div>
                        <div class="text-[11px] text-gray-500">AP European History · 25 points</div>
                        <div class="text-[11px] text-gray-500">Due Tomorrow at 11:59 PM</div>
                      </div>
                    </div>

                    <div class="flex items-start gap-2">
                      <span class="text-purple-600 font-bold mt-0.5">●</span>
                      <div>
                        <div class="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">Quiz: Unit 6 Trigonometric Identities</div>
                        <div class="text-[11px] text-gray-500">Pre-Calculus BC · 40 points</div>
                        <div class="text-[11px] text-gray-500">Due Thursday in class</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Recent Feedback Card -->
                <div class="bg-white p-4 rounded-md border border-gray-200 shadow-2xs">
                  <h3 class="text-xs font-bold text-gray-800 uppercase tracking-wider border-b border-gray-200 pb-2 mb-3">Recent Feedback</h3>
                  <div class="space-y-3 text-xs">
                    <div>
                      <div class="flex items-center justify-between font-medium text-gray-800">
                        <span>Biology Lab 3: Photosynthesis</span>
                        <span class="font-bold text-emerald-700">49/50</span>
                      </div>
                      <p class="text-[11px] text-gray-500 italic mt-0.5">"Exceptional error analysis and data graphing."</p>
                    </div>

                    <div class="pt-2 border-t border-gray-100">
                      <div class="flex items-center justify-between font-medium text-gray-800">
                        <span>History Short Answer #4</span>
                        <span class="font-bold text-emerald-700">10/10</span>
                      </div>
                      <p class="text-[11px] text-gray-500 italic mt-0.5">"Clear thesis and strong evidence."</p>
                    </div>
                  </div>

                  <button class="w-full mt-4 py-1.5 border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded cursor-pointer">
                    View Complete Grades
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-12 pt-4 border-t border-gray-200 text-xs text-gray-400 flex items-center justify-between">
              <span>© 2026 Oakridge Unified School District · Canvas by Instructure</span>
              <span onclick="window.exitPanic()" class="text-gray-400 hover:text-gray-600 cursor-pointer">[Press ESC or click here to restore RED Cybernetics]</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // 2. Google Docs AP Bio Disguise
  if (currentView === 'docs') {
    return `
      <div class="fixed inset-0 z-[9999] bg-[#f8f9fa] text-[#202124] font-sans flex flex-col select-text overflow-y-auto">
        ${stealthBar}

        <header class="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 shadow-2xs z-10">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded bg-[#4285f4] flex items-center justify-center text-white font-bold text-lg shadow-2xs">
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
            <div class="flex items-center text-xs text-gray-500 gap-1 hidden sm:flex">
              <span>Last edit was 2 minutes ago</span>
            </div>
            <button class="px-4 py-1.5 text-xs font-medium bg-[#1a73e8] text-white rounded-full hover:bg-[#1557b0] shadow-2xs cursor-pointer">
              Share
            </button>
            <button onclick="window.exitPanic()" title="Alex Taylor (Click or press ESC to restore)" class="w-8 h-8 rounded-full bg-emerald-600 text-white font-medium text-xs flex items-center justify-center hover:opacity-80 transition-opacity ml-2 cursor-pointer">
              A
            </button>
          </div>
        </header>

        <main class="flex-1 bg-[#f0f2f5] p-4 sm:p-6 flex justify-center">
          <div class="w-full max-w-[850px] bg-white min-h-[1100px] shadow-md p-8 sm:p-14 border border-gray-200">
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

  // 3. Google Classroom Disguise
  if (currentView === 'classroom') {
    return `
      <div class="fixed inset-0 z-[9999] bg-[#ffffff] text-[#3c4043] font-sans flex flex-col select-text overflow-y-auto">
        ${stealthBar}

        <header class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-[#5f6368] cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            <span class="text-lg font-medium text-gray-800">Google Classroom</span>
            <span class="text-gray-400">›</span>
            <span class="text-base text-gray-700 font-medium">AP Biology - Period 2</span>
          </div>

          <div class="flex items-center gap-3">
            <span class="text-xs text-gray-500">Alex Taylor</span>
            <div class="w-8 h-8 rounded-full bg-[#1e8e3e] text-white flex items-center justify-center font-bold text-xs">AT</div>
          </div>
        </header>

        <div class="max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
          <div class="bg-[#1e8e3e] text-white rounded-lg p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <h1 class="text-2xl sm:text-3xl font-bold">AP Biology (Period 2)</h1>
            <p class="text-sm opacity-90 mt-1">Room 214 · Instructor: Dr. Harrison</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 bg-white">
                <h3 class="text-xs font-bold text-gray-700 uppercase">Upcoming</h3>
                <p class="text-xs text-gray-500 mt-2">Due Today 11:59 PM</p>
                <p class="text-sm font-medium text-gray-800 hover:text-green-700 cursor-pointer">Unit 4 Energetics Problem Set</p>
              </div>
            </div>

            <div class="md:col-span-3 space-y-4">
              <div class="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-3 shadow-2xs">
                <div class="w-8 h-8 rounded-full bg-[#1e8e3e] text-white flex items-center justify-center text-xs font-bold">DH</div>
                <div class="flex-1 text-sm text-gray-500">Announce something to your class...</div>
              </div>

              <div class="border border-gray-200 rounded-lg p-5 bg-white space-y-3 shadow-2xs">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#1e8e3e] text-white flex items-center justify-center text-sm font-bold">DH</div>
                  <div>
                    <h4 class="text-sm font-bold text-gray-900">Dr. Harrison</h4>
                    <p class="text-xs text-gray-500">Yesterday at 3:15 PM · Unit 4 Study Guide</p>
                  </div>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed">
                  Please review the attached slides on electron transport chain and oxidative phosphorylation before tomorrow's class lab session.
                </p>
                <div class="p-3 border border-gray-200 rounded flex items-center gap-3 bg-gray-50">
                  <div class="w-10 h-10 bg-amber-500 rounded flex items-center justify-center text-white font-bold text-xs">PDF</div>
                  <div>
                    <p class="text-xs font-medium text-gray-800">Unit_4_Cellular_Respiration_Slides.pdf</p>
                    <p class="text-[11px] text-gray-500">Google Drive Document (4.2 MB)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-gray-200 text-xs text-gray-400 flex items-center justify-between">
            <span>Google Classroom</span>
            <span onclick="window.exitPanic()" class="text-gray-400 hover:text-gray-600 cursor-pointer">[Press ESC or click here to restore RED Cybernetics]</span>
          </div>
        </div>
      </div>
    `;
  }

  // 4. Blank Page Disguise (about:blank appearance)
  return `
    <div class="fixed inset-0 z-[9999] bg-white text-black font-sans flex flex-col select-none">
      ${stealthBar}
      <div class="flex-1 flex flex-col justify-end p-4">
        <div class="text-[11px] text-gray-300 self-end font-mono">
          <span onclick="window.exitPanic()" class="hover:text-gray-500 cursor-pointer">[ESC: Restore]</span>
        </div>
      </div>
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

// Render Minecraft Local Link Notice Modal
function renderMinecraftNoticeModal() {
  if (!state.minecraftNotice) return '';
  return `
    <div id="minecraftNoticeModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div class="w-full max-w-lg bg-[#09090e] border border-emerald-500/60 cyber-cut flex flex-col shadow-[0_0_40px_rgba(16,185,129,0.3)]">
        <div class="flex items-center justify-between px-6 py-4 border-b border-emerald-950 bg-emerald-950/20">
          <div class="flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <h2 class="text-sm font-display font-bold text-white tracking-wider">
              MINECRAFT 1.8 // <span class="text-emerald-400">MEDIA ARCHIVE LAUNCHER</span>
            </h2>
          </div>
          <button onclick="window.closeMinecraftNotice()" class="text-zinc-500 hover:text-white text-sm cursor-pointer">✕</button>
        </div>

        <div class="p-6 space-y-4 font-mono-code text-xs">
          <p class="text-zinc-300 leading-relaxed">
            Opening Minecraft 1.8 via local file archive. If your browser restricts websites from directly opening <code class="text-emerald-400 bg-black/80 px-1.5 py-0.5 border border-emerald-900/40">file:///</code> links, click Open Link below or copy the path:
          </p>

          <div class="p-3 bg-black/90 border border-emerald-950/80 text-emerald-400 font-mono-code text-xs break-all select-all flex items-center justify-between gap-2 shadow-inner">
            <span>file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html</span>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-zinc-900">
            <button onclick="window.closeMinecraftNotice()" class="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono-code cursor-pointer transition-colors">
              Close
            </button>
            <button id="copyMinecraftBtn" onclick="window.copyMinecraftLink()" class="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-mono-code font-bold text-xs uppercase tracking-wider cursor-pointer border border-zinc-700 transition-colors">
              Copy Path
            </button>
            <a href="file:///media/archive/eaglercraft1-8-62da5f39.zip/eaglercraft1-8.html" target="_blank" rel="noopener noreferrer" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono-code font-bold text-xs uppercase tracking-wider cyber-cut transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer flex items-center gap-1.5">
              <span>Open Link</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
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
window.setPanicView = setPanicView;
window.panicRedirect = panicRedirect;
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
  const prevCat = state.activeCategory;
  state.activeCategory = cat;
  if (cat === 'VIDEO_PLAYER') {
    pauseThemeMusic();
  } else if (prevCat === 'VIDEO_PLAYER') {
    resumeThemeMusic();
  }
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
  const snippet = (state.activeGame && state.activeGame.embedCode)
    ? state.activeGame.embedCode
    : `<iframe \n  src="${url}" \n  width="100%" \n  height="600px" \n  frameborder="0" \n  allow="autoplay; fullscreen; xr-spatial-tracking" \n  allowfullscreen>\n</iframe>`;
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

// Unblocked Video Player Handlers
window.playVideo = function (id, title, channel) {
  cyberAudio.playLaunch();
  pauseThemeMusic();
  state.videoState.currentId = id;
  state.videoState.currentTitle = title || `Video ${id}`;
  state.videoState.currentChannel = channel || 'YouTube';
  state.videoState.embedUrl = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  state.activeCategory = 'VIDEO_PLAYER';
  render();
  const elem = document.getElementById('videoPlayerStage');
  if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.searchVideo = function (query) {
  if (!query) return;
  cyberAudio.playClick();
  const parsed = parseVideoInput(query);
  state.videoState.searchQuery = query;
  if (!parsed) return;

  if (parsed.isSearch) {
    state.videoState.currentId = '';
    state.videoState.currentTitle = `Search Results: "${parsed.query}"`;
    state.videoState.currentChannel = 'YouTube Search Engine';
    state.videoState.embedUrl = `https://www.youtube-nocookie.com/embed?listType=search&list=${encodeURIComponent(parsed.query)}&autoplay=1&rel=0`;
  } else {
    state.videoState.currentId = parsed.id;
    state.videoState.currentTitle = `Video ID: ${parsed.id}`;
    state.videoState.currentChannel = 'YouTube';
    state.videoState.embedUrl = `https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&rel=0`;
  }
  state.activeCategory = 'VIDEO_PLAYER';
  render();
  const elem = document.getElementById('videoPlayerStage');
  if (elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

window.handleVideoSearchSubmit = function (e) {
  if (e) e.preventDefault();
  const input = document.getElementById('videoSearchInput');
  if (input && input.value.trim()) {
    window.searchVideo(input.value.trim());
  }
};

window.toggleVideoFullscreen = function () {
  cyberAudio.playClick();
  const stage = document.getElementById('videoPlayerStage');
  if (!stage) return;
  if (!document.fullscreenElement) {
    stage.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
};

window.toggleVideoTheater = function () {
  cyberAudio.playClick();
  state.videoState.isTheater = !state.videoState.isTheater;
  render();
};

window.reloadVideoIframe = function () {
  cyberAudio.playClick();
  const f = document.getElementById('mainVideoIframe');
  if (f) f.src = f.src;
};

window.saveCurrentVideo = function () {
  cyberAudio.playClick();
  const current = state.videoState;
  const id = current.currentId || (current.searchQuery ? `search-${Date.now()}` : '');
  if (!id) return;

  const exists = current.saved.some((v) => v.id === id);
  if (exists) {
    current.saved = current.saved.filter((v) => v.id !== id);
  } else {
    current.saved.unshift({
      id: id,
      title: current.currentTitle,
      channel: current.currentChannel,
      embedUrl: current.embedUrl,
      thumbnail: current.currentId ? `https://img.youtube.com/vi/${current.currentId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      savedAt: new Date().toISOString()
    });
  }
  saveSavedVideos();
  render();
};

window.removeSavedVideo = function (id) {
  cyberAudio.playClick();
  state.videoState.saved = state.videoState.saved.filter((v) => v.id !== id);
  saveSavedVideos();
  render();
};

window.openMinecraftBlankTab = openMinecraftLink;
window.openMinecraftLink = openMinecraftLink;
window.copyMinecraftLink = copyMinecraftLink;
window.closeMinecraftNotice = closeMinecraftNotice;
window.toggleThemeMusic = toggleThemeMusic;
window.pauseThemeMusic = pauseThemeMusic;
window.resumeThemeMusic = resumeThemeMusic;

window.resetDefaults = function () {
  if (confirm('Reset to factory default games library?')) {
    cyberAudio.playClick();
    state.games = DEFAULT_GAMES;
    localStorage.removeItem('redline_games_library_v11');
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
