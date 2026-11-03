import React, { useEffect } from 'react';
import { FileText, Share2, MessageSquare, Clock } from 'lucide-react';
import { cyberAudio } from '../utils/audio.js';

export const StealthDisguise = ({ onClose }) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Google Docs - AP Bio: Unit 4 Cellular Respiration Notes';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        cyberAudio.playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.title = originalTitle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#f8f9fa] text-[#202124] font-sans flex flex-col select-text overflow-y-auto">
      {/* Google Docs Toolbar */}
      <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 shadow-xs z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded bg-[#4285f4] flex items-center justify-center text-white font-bold text-lg shadow-xs">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-800 text-base">
                AP Bio: Unit 4 Cellular Respiration & ATP Synthesis Notes
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Saved to Drive</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600 mt-0.5">
              <span className="hover:text-black cursor-pointer">File</span>
              <span className="hover:text-black cursor-pointer">Edit</span>
              <span className="hover:text-black cursor-pointer">View</span>
              <span className="hover:text-black cursor-pointer">Insert</span>
              <span className="hover:text-black cursor-pointer">Format</span>
              <span className="hover:text-black cursor-pointer">Tools</span>
              <span className="hover:text-black cursor-pointer">Extensions</span>
              <span className="hover:text-black cursor-pointer">Help</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center text-xs text-gray-500 gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Last edit was 2 minutes ago</span>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-full border border-gray-300">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Comments</span>
          </button>
          <button className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-medium bg-[#1a73e8] text-white rounded-full hover:bg-[#1557b0] shadow-xs">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
          {/* Secret exit trigger disguised as account profile */}
          <button
            onClick={() => {
              cyberAudio.playClick();
              onClose();
            }}
            title="Return to RED Cybernetics (or press ESC)"
            className="w-8 h-8 rounded-full bg-emerald-600 text-white font-medium text-xs flex items-center justify-center hover:opacity-80 transition-opacity ml-2 cursor-pointer"
          >
            S
          </button>
        </div>
      </header>

      {/* Disguised Document Workspace */}
      <main className="flex-1 bg-[#f0f2f5] p-6 flex justify-center">
        <div className="w-full max-w-[850px] bg-white min-h-[1100px] shadow-md p-14 border border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Section 4.3: Glycolysis and Krebs Citric Acid Cycle
          </h1>
          <p className="text-xs text-gray-500 mb-6 pb-2 border-b border-gray-200">
            Advanced Placement Biology · Semester 1 · Instructor: Dr. Harrison
          </p>

          <h2 className="text-lg font-semibold text-gray-800 mt-4 mb-2">1. Overview of Cellular Respiration</h2>
          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            Cellular respiration is a series of chemical reactions that break down glucose to produce ATP, which can be
            used as energy to power numerous metabolic activities throughout the biological system. The overall chemical
            equation is summarized as follows:
          </p>
          <div className="bg-gray-50 p-3 rounded font-mono text-xs text-gray-800 border-l-4 border-blue-500 mb-4">
            C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ~30-32 ATP (Energy)
          </div>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">2. Stages of Cellular Respiration</h2>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4">
            <li>
              <strong>Glycolysis:</strong> Takes place in the cytoplasm; does not require oxygen (anaerobic). Converts one
              glucose molecule (6C) into two pyruvate molecules (3C), yielding a net of 2 ATP and 2 NADH.
            </li>
            <li>
              <strong>Pyruvate Oxidation:</strong> Occurs as pyruvate enters the mitochondrial matrix, forming acetyl CoA,
              CO₂, and releasing high-energy electrons to reduce NAD+ to NADH.
            </li>
            <li>
              <strong>The Citric Acid (Krebs) Cycle:</strong> Systematic breakdown of acetyl groups, generating FADH₂,
              NADH, and GTP/ATP along with byproduct CO₂.
            </li>
            <li>
              <strong>Oxidative Phosphorylation (ETC & Chemiosmosis):</strong> Generates the majority of ATP across the
              inner mitochondrial membrane via ATP synthase proton gradients.
            </li>
          </ul>

          <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">3. Study Questions & Assignment Checklist</h2>
          <div className="text-sm text-gray-700 space-y-1.5">
            <p>• Explain how electron transport chain complexes create a proton-motive force.</p>
            <p>• Compare efficiency ratios of substrate-level phosphorylation vs. oxidative phosphorylation.</p>
            <p>• Complete Chapter 9 Review questions #1–15 by Friday end of day.</p>
          </div>

          <div className="mt-16 pt-6 border-t border-gray-200 text-xs text-gray-400 flex items-center justify-between">
            <span>Page 1 of 3</span>
            <span
              onClick={() => {
                cyberAudio.playClick();
                onClose();
              }}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              [Press ESC or click here to restore RED Cybernetics]
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
