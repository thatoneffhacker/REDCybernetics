import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Download, Upload, RotateCcw, FileCode, AlertCircle } from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

export const JsonEditorModal = ({
  games,
  isOpen,
  onClose,
  onUpdateGames,
  onResetDefaults,
}) => {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(games, null, 2));
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setJsonText(JSON.stringify(games, null, 2));
      setErrorMsg(null);
      setSavedSuccess(false);
    }
  }, [isOpen, games]);

  if (!isOpen) return null;

  const handleCopy = () => {
    cyberAudio.playClick();
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    cyberAudio.playClick();
    const blob = new Blob([jsonText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'games.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleApplyJson = () => {
    try {
      cyberAudio.playClick();
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error('Root element must be a JSON array of games.');
      }
      for (const item of parsed) {
        if (!item.id || !item.title || !item.iframeUrl) {
          throw new Error('Each game object requires "id", "title", and "iframeUrl".');
        }
      }
      onUpdateGames(parsed);
      setErrorMsg(null);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      cyberAudio.playGlitch();
      setErrorMsg(err.message || 'Invalid JSON syntax');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result;
        JSON.parse(content);
        setJsonText(content);
        setErrorMsg(null);
      } catch {
        setErrorMsg('Selected file does not contain valid JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl bg-[#09090e] border border-red-600/40 cyber-cut flex flex-col max-h-[90vh] shadow-[0_0_40px_rgba(255,0,60,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-red-950 bg-red-950/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-600/10 border border-red-600/30 text-red-500">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-white tracking-wider flex items-center gap-2">
                DATABASE TERMINAL // <span className="text-red-500">GAMES.JSON</span>
              </h2>
              <p className="text-xs font-mono-code text-zinc-400">
                Primary data store for all embedded iframe titles and URLs (/public/games.json)
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

        {/* Toolbar */}
        <div className="px-6 py-3 bg-[#0d0d14] border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-code">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download games.json</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-red-500 transition-colors cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Load JSON File</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                cyberAudio.playClick();
                if (window.confirm('Reset games library to initial default games.json?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>

        {/* Error / Success message */}
        {errorMsg && (
          <div className="px-6 py-2.5 bg-red-950/80 border-b border-red-600 text-red-200 text-xs font-mono-code flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>ERROR: {errorMsg}</span>
          </div>
        )}

        {savedSuccess && (
          <div className="px-6 py-2.5 bg-emerald-950/80 border-b border-emerald-600 text-emerald-200 text-xs font-mono-code flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>SUCCESS: Games database parsed and hot-reloaded into active session.</span>
          </div>
        )}

        {/* Code Editor */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col bg-[#050508]">
          <textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            spellCheck={false}
            className="w-full flex-1 p-4 bg-[#0a0a10] border border-zinc-800 text-zinc-200 font-mono-code text-xs leading-relaxed focus:outline-hidden focus:border-red-500 resize-none font-medium selection:bg-red-900 selection:text-white"
          />
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0d0d14] border-t border-zinc-800/80 flex items-center justify-between">
          <div className="text-xs font-mono-code text-zinc-500">
            Current registry count: <span className="text-red-400 font-bold">{games.length}</span> titles
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs font-mono-code text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyJson}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-mono-code text-xs font-bold uppercase tracking-wider cyber-cut transition-all shadow-[0_0_15px_rgba(255,0,60,0.5)] cursor-pointer"
            >
              Commit & Reload Games
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
