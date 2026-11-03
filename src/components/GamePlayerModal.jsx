import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Maximize2,
  Minimize2,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Heart,
  Copy,
  Check,
  Gamepad2,
  Cpu,
} from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';
import { BuiltinFallbackGame } from './BuiltinFallbackGame.jsx';

export const GamePlayerModal = ({
  game,
  isOpen,
  isFavorite,
  onClose,
  onToggleFavorite,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheater, setIsTheater] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [useBuiltinEngine, setUseBuiltinEngine] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const playerContainerRef = useRef(null);

  useEffect(() => {
    setUseBuiltinEngine(false);
  }, [game]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  if (!isOpen || !game) return null;

  const toggleFullscreen = () => {
    cyberAudio.playClick();
    if (!document.fullscreenElement) {
      playerContainerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleReload = () => {
    cyberAudio.playClick();
    setIframeKey((prev) => prev + 1);
  };

  const launchAboutBlankCloak = () => {
    cyberAudio.playLaunch();
    const win = window.open('about:blank', '_blank');
    if (!win) {
      alert('Popup blocked. Please allow popups to open the stealth tab.');
      return;
    }
    const doc = win.document;
    doc.title = 'Google Drive - My Files';

    const link = doc.createElement('link');
    link.rel = 'icon';
    link.href = 'https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png';
    doc.head.appendChild(link);

    const style = doc.createElement('style');
    style.innerHTML = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body, html { width: 100%; height: 100%; overflow: hidden; background: #000; }
      iframe { width: 100%; height: 100%; border: none; }
    `;
    doc.head.appendChild(style);

    const iframe = doc.createElement('iframe');
    iframe.src = game.iframeUrl;
    iframe.allowFullscreen = true;
    doc.body.appendChild(iframe);
  };

  const handleCopyEmbed = () => {
    cyberAudio.playClick();
    const snippet = `<iframe src="${game.iframeUrl}" width="800" height="600" frameborder="0" allowfullscreen></iframe>`;
    navigator.clipboard.writeText(snippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      <div
        ref={playerContainerRef}
        className={`w-full bg-[#08080d] border border-red-600/40 flex flex-col shadow-[0_0_50px_rgba(255,0,60,0.3)] transition-all ${
          isTheater || isFullscreen
            ? 'h-full max-h-none max-w-none'
            : 'max-w-6xl max-h-[95vh] cyber-cut'
        }`}
      >
        {/* Player Header HUD */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-red-950 bg-red-950/20 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-display font-black text-white tracking-wider flex items-center gap-2 text-neon-glow">
                  {game.title}
                </h2>
                <span className="text-[10px] font-mono-code text-red-400 bg-red-950/60 px-2 py-0.5 border border-red-800/40">
                  {game.category}
                </span>
              </div>
              <p className="text-[11px] font-mono-code text-zinc-400 truncate max-w-sm sm:max-w-md hidden sm:block">
                SRC: {game.iframeUrl}
              </p>
            </div>
          </div>

          {/* Quick HUD controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                cyberAudio.playClick();
                onToggleFavorite(game.id);
              }}
              className={`p-2 border transition-colors ${
                isFavorite
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_10px_rgba(255,0,60,0.7)]'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-red-400 hover:border-red-600/50'
              }`}
              title="Add to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleReload}
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors"
              title="Reload game frame"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsTheater(!isTheater)}
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors hidden sm:block"
              title={isTheater ? 'Default view' : 'Theater mode'}
            >
              <Gamepad2 className="w-4 h-4" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 hover:border-red-600/50 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={launchAboutBlankCloak}
              className="px-2.5 py-1.5 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800 hover:border-red-500 text-xs font-mono-code font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              title="Open inside an about:blank tab cloaked as Google Drive"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Cloak Tab</span>
            </button>

            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="p-2 bg-red-950/30 text-zinc-400 hover:text-red-400 hover:bg-red-950 border border-zinc-800 hover:border-red-600 transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Screen Container */}
        <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
          {useBuiltinEngine ? (
            <BuiltinFallbackGame />
          ) : (
            <iframe
              key={iframeKey}
              src={game.iframeUrl}
              title={game.title}
              className="w-full h-full min-h-[420px] sm:min-h-[540px] border-none bg-black"
              allow="autoplay; fullscreen; gamepad; focus-without-user-activation; clipboard-write; keyboard-map"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
            />
          )}

          {/* Vignette CRT overlay */}
          <div className="absolute inset-0 crt-vignette pointer-events-none" />
        </div>

        {/* Bottom Status & Instructions Tray */}
        <div className="px-4 sm:px-6 py-3 bg-[#0c0c14] border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code shrink-0">
          <div className="flex items-center gap-4 text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-600">INPUT:</span>
              <span className="text-zinc-300">{game.instructions}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                cyberAudio.playClick();
                setUseBuiltinEngine(!useBuiltinEngine);
              }}
              className={`flex items-center gap-1.5 px-3 py-1 border transition-colors ${
                useBuiltinEngine
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-zinc-900 text-zinc-400 hover:text-red-400 border-zinc-700'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{useBuiltinEngine ? 'Using Local Engine' : 'Iframe Blocked? Use Local Engine'}</span>
            </button>

            <button
              onClick={handleCopyEmbed}
              className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors"
            >
              {copiedEmbed ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmbed ? 'Embed Copied' : 'Embed Code'}</span>
            </button>

            <a
              href={game.iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-400 hover:text-red-400 transition-colors"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
