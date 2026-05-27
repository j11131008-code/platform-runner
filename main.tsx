import { useEffect, useRef } from "react";

const W = 640;
const H = 360;
const GROUND_H = 48;
const GROUND_Y = H - GROUND_H;
const GRAVITY = 1800;
const JUMP_FORCE = 650;
const DOUBLE_JUMP_FORCE = 520;
const START_SPEED = 250;
const SPEED_INC = 10;
const PLAYER_W = 36;
const PLAYER_H = 36;

type Scene = "game" | "lose";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  r: number; color: string;
}

interface Spike {
  x: number; y: number; w: number; h: number;
  kind: "spike";
}

interface Enemy {
  x: number; y: number; w: number; h: number;
  spawnY: number; offset: number;
  kind: "enemy";
}

type Obstacle = Spike | Enemy;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function overlaps(ax: number, ay: number, aw: number, ah: number,
                  bx: number, by: number, bw: number, bh: number) {
  const PAD = 6;
  return ax + PAD < bx + bw - PAD && ax + aw - PAD > bx + PAD &&
         ay + PAD < by + bh - PAD && ay + ah - PAD > by + PAD;
}

function hsl(h: number, s: number, l: number, a = 1) {
  return `hsla(${h},${s}%,${l}%,${a})`;
}

function drawBean(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, angle: number) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.fillStyle = "#6495ED";
  ctx.beginPath();
  ctx.ellipse(0, 4, w * 0.42, h * 0.46, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(-w * 0.08, -h * 0.22, w * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(w * 0.06, -h * 0.15, w * 0.14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(w * 0.1, -h * 0.13, w * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.6)";
  ctx.beginPath();
  ctx.arc(w * 0.12, -h * 0.17, w * 0.04, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawGhost(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cx = x + w / 2;
  const cy = y + h / 2;
  ctx.save();
  ctx.fillStyle = "#a78bfa";
  ctx.beginPath();
  ctx.arc(cx, cy - h * 0.05, w * 0.42, Math.PI, 0);
  ctx.lineTo(cx + w * 0.42, cy + h * 0.32);
  const segs = 4;
  const segW = (w * 0.84) / segs;
  for (let i = segs - 1; i >= 0; i--) {
    const bx = cx - w * 0.42 + i * segW + segW;
    ctx.quadraticCurveTo(bx - segW / 2, cy + h * 0.48, bx - segW, cy + h * 0.32);
  }
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath(); ctx.ellipse(cx - w * 0.14, cy - h * 0.05, w * 0.1, h * 0.13, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + w * 0.14, cy - h * 0.05, w * 0.1, h * 0.13, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#6d28d9";
  ctx.beginPath(); ctx.ellipse(cx - w * 0.11, cy - h * 0.04, w * 0.05, h * 0.07, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.ellipse(cx + w * 0.17, cy - h * 0.04, w * 0.05, h * 0.07, 0, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

export default function KaboomGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let scene: Scene = "game";
    let animId: number;
    let lastTime = performance.now();

    let speed = START_SPEED;
    let playerX = 80;
    let playerY = GROUND_Y - PLAYER_H;
    let playerVY = 0;
    let grounded = false;
    let canDoubleJump = false;
    let angle = 0;
    let targetAngle = 0;
    let obstacles: Obstacle[] = [];
    let particles: Particle[] = [];
    let score = 0;
    let highScore = Number(localStorage.getItem("hcHighScore") || 0);
    let shakeTimer = 0;
    let shakeIntensity = 0;
    let spawnTimer = 0;
    let nextSpawnIn = 1.2;
    let enemyTimer = 0;
    let nextEnemyIn = 3 + Math.random() * 3;
    let dead = false;
    let deadTimer = 0;
    let groundOffset = 0;

    const stars = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * GROUND_Y * 0.85,
      r: Math.random() * 1.5 + 0.3, speed: 0.15 + Math.random() * 0.4,
    }));

    // ... (以下省略，完整內容請看檔案)
  }, []);
}
