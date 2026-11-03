import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';

export const BuiltinFallbackGame = ({ onScoreUpdate }) => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('redline_builtin_highscore') || '0', 10);
  });

  const stateRef = useRef({
    gameState: 'idle',
    playerX: 300,
    playerY: 340,
    playerSpeed: 7,
    keys: { left: false, right: false, up: false, down: false },
    hazards: [],
    dataNodes: [],
    score: 0,
    lastSpawn: 0,
    animFrame: 0,
  });

  const startGame = () => {
    const s = stateRef.current;
    s.gameState = 'playing';
    s.playerX = 300;
    s.playerY = 340;
    s.hazards = [];
    s.dataNodes = [];
    s.score = 0;
    setScore(0);
    setGameState('playing');
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleKeyDown = (e) => {
      const k = stateRef.current.keys;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') k.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') k.right = true;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') k.up = true;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') k.down = true;
      if (e.key === ' ' && stateRef.current.gameState !== 'playing') {
        startGame();
      }
    };

    const handleKeyUp = (e) => {
      const k = stateRef.current.keys;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') k.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') k.right = false;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') k.up = false;
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') k.down = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    let animationId;

    const loop = (timestamp) => {
      const s = stateRef.current;
      const width = canvas.width;
      const height = canvas.height;

      // Draw background
      ctx.fillStyle = '#06060a';
      ctx.fillRect(0, 0, width, height);

      // Cyber grid lines scrolling down
      ctx.strokeStyle = 'rgba(255, 0, 60, 0.15)';
      ctx.lineWidth = 1;
      const gridOffset = (timestamp / 10) % 30;
      for (let y = gridOffset; y < height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      if (s.gameState === 'playing') {
        // Player movement
        if (s.keys.left && s.playerX > 20) s.playerX -= s.playerSpeed;
        if (s.keys.right && s.playerX < width - 20) s.playerX += s.playerSpeed;
        if (s.keys.up && s.playerY > 20) s.playerY -= s.playerSpeed;
        if (s.keys.down && s.playerY < height - 20) s.playerY += s.playerSpeed;

        // Spawn hazards
        if (timestamp - s.lastSpawn > Math.max(350, 900 - s.score * 12)) {
          s.lastSpawn = timestamp;
          const hazardW = 20 + Math.random() * 35;
          s.hazards.push({
            x: Math.random() * (width - hazardW),
            y: -30,
            speed: 3.5 + Math.random() * 3 + Math.min(6, s.score * 0.08),
            width: hazardW,
            height: 18 + Math.random() * 16,
            color: Math.random() > 0.4 ? '#ff003c' : '#ff4466',
          });

          // Chance to spawn data node (bonus point)
          if (Math.random() > 0.5) {
            s.dataNodes.push({
              x: 20 + Math.random() * (width - 40),
              y: -20,
              radius: 7,
              value: 5,
            });
          }
        }

        // Update hazards
        for (let i = s.hazards.length - 1; i >= 0; i--) {
          const h = s.hazards[i];
          h.y += h.speed;

          // Check collision with player ship
          if (
            s.playerX + 12 > h.x &&
            s.playerX - 12 < h.x + h.width &&
            s.playerY + 14 > h.y &&
            s.playerY - 14 < h.y + h.height
          ) {
            s.gameState = 'gameover';
            setGameState('gameover');
            if (s.score > highScore) {
              setHighScore(s.score);
              localStorage.setItem('redline_builtin_highscore', s.score.toString());
            }
          }

          // Offscreen check
          if (h.y > height + 40) {
            s.hazards.splice(i, 1);
            s.score += 1;
            setScore(s.score);
            if (onScoreUpdate) onScoreUpdate(s.score);
          }
        }

        // Update data nodes
        for (let i = s.dataNodes.length - 1; i >= 0; i--) {
          const d = s.dataNodes[i];
          d.y += 3;
          // Collect check
          const dist = Math.hypot(s.playerX - d.x, s.playerY - d.y);
          if (dist < 20) {
            s.score += d.value;
            setScore(s.score);
            s.dataNodes.splice(i, 1);
          } else if (d.y > height + 20) {
            s.dataNodes.splice(i, 1);
          }
        }
      }

      // Draw hazards
      s.hazards.forEach((h) => {
        ctx.fillStyle = h.color;
        ctx.shadowColor = '#ff003c';
        ctx.shadowBlur = 12;
        ctx.fillRect(h.x, h.y, h.width, h.height);
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.strokeRect(h.x + 2, h.y + 2, h.width - 4, h.height - 4);
      });

      // Draw bonus data nodes
      s.dataNodes.forEach((d) => {
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Player Ship (RED Cybernetics delta craft)
      ctx.save();
      ctx.translate(s.playerX, s.playerY);

      // Engine glow
      if (s.gameState === 'playing') {
        ctx.fillStyle = 'rgba(255, 0, 60, 0.8)';
        ctx.beginPath();
        ctx.moveTo(-6, 12);
        ctx.lineTo(6, 12);
        ctx.lineTo(0, 22 + Math.random() * 8);
        ctx.closePath();
        ctx.fill();
      }

      // Ship body
      ctx.fillStyle = '#14141e';
      ctx.strokeStyle = '#ff003c';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ff003c';
      ctx.shadowBlur = 10;

      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(14, 12);
      ctx.lineTo(0, 6);
      ctx.lineTo(-14, 12);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Cockpit red core
      ctx.fillStyle = '#ff003c';
      ctx.beginPath();
      ctx.arc(0, -2, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [highScore, onScoreUpdate]);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black select-none">
      <canvas
        ref={canvasRef}
        width={720}
        height={480}
        className="w-full max-w-[720px] max-h-[480px] border border-red-900/60 shadow-[0_0_30px_rgba(255,0,60,0.2)] aspect-[3/2] object-contain rounded-sm"
      />

      {/* HUD overlay */}
      <div className="absolute top-4 left-6 flex items-center gap-6 font-mono-code text-xs text-red-400">
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">SCORE:</span>
          <span className="text-red-500 font-bold text-sm tracking-widest">{score.toString().padStart(5, '0')}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-zinc-500">HI-RECORD:</span>
          <span className="text-zinc-300 font-bold">{highScore.toString().padStart(5, '0')}</span>
        </div>
      </div>

      {gameState === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-xs p-6 text-center">
          <div className="text-red-500 font-display font-black text-2xl tracking-widest mb-1 text-neon-glow">
            RED CYBERNETICS // CORE DEFENSE
          </div>
          <p className="text-zinc-400 font-mono-code text-xs max-w-md mb-6">
            Offline Built-in Protocol. Dodge incoming red laser barriers and absorb cyan energy nodes.
          </p>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-sm uppercase tracking-wider cyber-cut transition-all shadow-[0_0_20px_rgba(255,0,60,0.6)] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Engage Engine [SPACE]
          </button>
          <div className="mt-4 text-[11px] font-mono-code text-zinc-500">
            [WASD / ARROWS] TO MANEUVER
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xs p-6 text-center">
          <div className="text-red-600 font-display font-black text-3xl tracking-widest mb-1 animate-pulse text-neon-glow">
            // SHIP COMPROMISED //
          </div>
          <div className="text-zinc-400 font-mono-code text-sm mb-4">
            Final Vector Score: <span className="text-red-400 font-bold">{score}</span>
          </div>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-500 text-white font-mono-code font-bold text-sm uppercase tracking-wider cyber-cut transition-all shadow-[0_0_20px_rgba(255,0,60,0.6)] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Relaunch Core
          </button>
        </div>
      )}
    </div>
  );
};
