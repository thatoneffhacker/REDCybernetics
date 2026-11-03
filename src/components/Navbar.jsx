import React from 'react';
import {
  Flame,
  Volume2,
  VolumeX,
  Tv,
  FileCode,
  Plus,
  ShieldAlert,
} from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

export const Navbar = ({
  scanlinesEnabled,
  onToggleScanlines,
  audioEnabled,
  onToggleAudio,
  onOpenAddModal,
  onOpenJsonModal,
  onTriggerPanic,
  totalGames,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#050508]/95 backdrop-blur-md border-b border-red-950/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Brand & Telemetry */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-9 h-9 bg-red-600 flex items-center justify-center text-white cyber-cut shadow-[0_0_15px_rgba(255,0,60,0.7)]">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white text-neon-glow">
                RED
              </span>
              <span className="font-mono-code font-bold text-xs text-red-500 tracking-widest">
                CYBERNETICS
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono-code text-zinc-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-zinc-400">PROXY: ENCRYPTED</span>
              <span aria-hidden="true">·</span>
              <span>{totalGames} TITLES LOADED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Panic / Cloak Key */}
        <button
          onClick={() => {
            cyberAudio.playPanic();
            onTriggerPanic();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-xs uppercase tracking-wider cyber-cut transition-all shadow-[0_0_12px_rgba(255,0,60,0.5)] cursor-pointer"
          title="Panic Disguise Mode (or press ESC)"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">PANIC [ESC]</span>
        </button>

        {/* Database JSON viewer */}
        <button
          onClick={() => {
            cyberAudio.playClick();
            onOpenJsonModal();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 font-mono-code text-xs transition-colors"
          title="Inspect / Edit games.json"
        >
          <FileCode className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden md:inline">GAMES.JSON</span>
        </button>

        {/* Add custom game */}
        <button
          onClick={() => {
            cyberAudio.playClick();
            onOpenAddModal();
          }}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 font-mono-code text-xs transition-colors"
          title="Add Game to JSON registry"
        >
          <Plus className="w-3.5 h-3.5 text-red-500" />
          <span className="hidden sm:inline">ADD GAME</span>
        </button>

        {/* Scanlines visual effect toggle */}
        <button
          onClick={() => {
            cyberAudio.playClick();
            onToggleScanlines();
          }}
          className={`p-2 border transition-colors ${
            scanlinesEnabled
              ? 'bg-red-950/40 text-red-400 border-red-800'
              : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
          }`}
          title={scanlinesEnabled ? 'CRT Scanlines: ON' : 'CRT Scanlines: OFF'}
        >
          <Tv className="w-4 h-4" />
        </button>

        {/* Audio FX toggle */}
        <button
          onClick={() => {
            cyberAudio.playClick();
            onToggleAudio();
          }}
          className={`p-2 border transition-colors ${
            audioEnabled
              ? 'bg-red-950/40 text-red-400 border-red-800'
              : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-zinc-300'
          }`}
          title={audioEnabled ? 'Sound FX: Enabled' : 'Sound FX: Muted'}
        >
          {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
