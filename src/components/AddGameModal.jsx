import React, { useState } from 'react';
import { X, Plus, Globe, Sparkles } from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

const DEFAULT_THUMBNAILS = [
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
];

export const AddGameModal = ({ isOpen, onClose, onAddGame }) => {
  const [title, setTitle] = useState('');
  const [iframeUrl, setIframeUrl] = useState('');
  const [category, setCategory] = useState('Custom');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('Standard arrow keys / WASD and mouse controls.');
  const [tags, setTags] = useState('Unblocked, Custom, Web');
  const [thumbnail, setThumbnail] = useState(DEFAULT_THUMBNAILS[0]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !iframeUrl.trim()) return;

    cyberAudio.playLaunch();

    // Clean up iframe code if user pasted raw `<iframe src="..."></iframe>`
    let cleanUrl = iframeUrl.trim();
    const match = cleanUrl.match(/src=["'](.*?)["']/);
    if (match && match[1]) {
      cleanUrl = match[1];
    }

    const newGame = {
      id: `custom-${Date.now()}`,
      title: title.trim().toUpperCase(),
      category,
      description: description.trim() || 'Custom user-injected cyberspace unblocked title.',
      iframeUrl: cleanUrl,
      thumbnail: thumbnail || DEFAULT_THUMBNAILS[0],
      instructions: instructions.trim() || 'Use standard keyboard / mouse controls.',
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      isCustom: true,
      rating: 5.0,
      plays: 1,
      addedAt: new Date().toISOString(),
    };

    onAddGame(newGame);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-xl bg-[#09090e] border border-red-600/50 cyber-cut flex flex-col shadow-[0_0_40px_rgba(255,0,60,0.3)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-950 bg-red-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 border border-red-600/30 text-red-500">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-display font-bold text-white tracking-wider flex items-center gap-2">
                INJECT CUSTOM GAME // <span className="text-red-500">IFRAME REGISTRY</span>
              </h2>
              <p className="text-xs font-mono-code text-zinc-400">
                Add any web game URL or embed snippet to the local JSON collection
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-950/40 border border-transparent hover:border-red-600/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 font-mono-code text-xs">
          <div>
            <label className="block text-zinc-300 font-bold mb-1.5 flex items-center justify-between">
              <span>GAME TITLE *</span>
              <span className="text-[10px] text-zinc-500 font-normal">UPPERCASE CYBER FORMAT</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DRIFT HUNTERS // REDLINE"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1.5 flex items-center justify-between">
              <span>IFRAME EMBED URL *</span>
              <span className="text-[10px] text-red-400 font-normal">URL or &lt;iframe src=&quot;...&quot;&gt;</span>
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="https://example.com/game or <iframe src='...'></iframe>"
                value={iframeUrl}
                onChange={(e) => setIframeUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors pr-8"
              />
              <Globe className="w-4 h-4 text-zinc-500 absolute right-3 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 font-bold mb-1.5">CATEGORY</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors cursor-pointer"
              >
                <option value="Action">Action</option>
                <option value="Arcade">Arcade</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Retro">Retro</option>
                <option value="Speed">Speed</option>
                <option value="Custom">Custom</option>
              </select>
            </div>

            <div>
              <label className="block text-zinc-300 font-bold mb-1.5">TAGS (COMMA SEPARATED)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="2D, Retro, Highscore"
                className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1.5">BRIEF DESCRIPTION</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="High-intensity laser avoidance and reflex traversal simulator..."
              className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1.5">CONTROLS / INSTRUCTIONS</label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Arrow keys to navigate, Space to fire..."
              className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-zinc-300 font-bold mb-1.5">THUMBNAIL IMAGE URL</label>
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://..."
                className="w-full px-3.5 py-2.5 bg-[#050508] border border-zinc-800 text-white focus:outline-hidden focus:border-red-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => {
                  cyberAudio.playClick();
                  const next = DEFAULT_THUMBNAILS[(DEFAULT_THUMBNAILS.indexOf(thumbnail) + 1) % DEFAULT_THUMBNAILS.length];
                  setThumbnail(next);
                }}
                className="px-3 py-2.5 bg-zinc-900 border border-zinc-700 hover:border-red-500 text-red-400 whitespace-nowrap transition-colors"
                title="Cycle Cyber Cover Preset"
              >
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-zinc-800/80">
            <button
              type="button"
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="px-4 py-2 text-zinc-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider cyber-cut transition-all shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Save To Game Registry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
