import React from 'react';
import { Play, Heart, Flame, Trash2, ExternalLink } from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

export const GameCard = ({
  game,
  isFavorite,
  onSelect,
  onToggleFavorite,
  onDeleteCustom,
}) => {
  return (
    <div className="group relative bg-[#09090e] border border-red-950/80 hover:border-red-600/70 transition-all duration-200 flex flex-col justify-between overflow-hidden cyber-cut-sm hover:shadow-[0_0_20px_rgba(255,0,60,0.25)] hover:-translate-y-0.5">
      {/* Top Banner / Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
          loading="lazy"
        />

        {/* Scanline overlay for cyber effect */}
        <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-transparent to-transparent" />

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            cyberAudio.playClick();
            onToggleFavorite(game.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-xs backdrop-blur-xs transition-colors z-10 ${
            isFavorite
              ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,60,0.8)]'
              : 'bg-black/60 text-zinc-400 hover:text-red-400 border border-zinc-800'
          }`}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Featured indicator */}
        {game.featured && (
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1 text-[11px] font-mono-code font-bold text-red-400 bg-black/80 px-2 py-0.5 border border-red-800/60 backdrop-blur-xs">
            <Flame className="w-3 h-3 text-red-500 fill-current" />
            <span>HOT</span>
          </div>
        )}

        {/* Play overlay button */}
        <div
          onClick={() => {
            cyberAudio.playLaunch();
            onSelect(game);
          }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px] cursor-pointer"
        >
          <div className="w-12 h-12 bg-red-600 hover:bg-red-500 text-white flex items-center justify-center rounded-xs shadow-[0_0_20px_rgba(255,0,60,0.8)] transition-transform hover:scale-110">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2 text-[11px] font-mono-code text-zinc-500 mb-1.5 uppercase">
            <span className="text-red-400 font-semibold">{game.category}</span>
            <span aria-hidden="true">·</span>
            <span>★ {game.rating || 4.8}</span>
            {game.plays && (
              <>
                <span aria-hidden="true">·</span>
                <span>{(game.plays / 1000).toFixed(1)}k plays</span>
              </>
            )}
          </div>

          <h3
            onClick={() => {
              cyberAudio.playLaunch();
              onSelect(game);
            }}
            className="font-display font-bold text-sm tracking-wide text-zinc-100 group-hover:text-red-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {game.title}
          </h3>

          <p className="text-xs text-zinc-400 font-mono-code line-clamp-2 mt-1 leading-relaxed">
            {game.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-3 border-t border-zinc-900/80 flex items-center justify-between text-xs font-mono-code">
          <div className="flex items-center gap-1.5 text-zinc-500 text-[10px] truncate max-w-[140px]">
            {game.tags && game.tags.slice(0, 2).map((t, idx) => (
              <span key={idx}>#{t}</span>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {game.isCustom && onDeleteCustom && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  cyberAudio.playClick();
                  onDeleteCustom(game.id);
                }}
                className="p-1 text-zinc-600 hover:text-red-400 transition-colors"
                title="Delete custom game"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => {
                cyberAudio.playLaunch();
                onSelect(game);
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-800/40 hover:border-red-500 text-xs font-mono-code font-semibold uppercase tracking-wider transition-all cursor-pointer"
            >
              <span>Play</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Cyber red accent line on bottom edge */}
      <div className="h-0.5 w-full bg-zinc-900 group-hover:bg-red-600 transition-colors" />
    </div>
  );
};
