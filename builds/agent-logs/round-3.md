# Round 3

Valid HTML: true

## Raw Output



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GTM Tool Room</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; }
canvas { border: 3px solid #e94560; border-radius: 8px; box-shadow: 0 0 30px rgba(233,69,96,0.3); }
</style>
</head>
<body>
<canvas id="game"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 640;

let score = 0;
let message = '';
let messageTimer = 0;
let particles = [];
let frameCount = 0;

const keys = {};
window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const player = {
  x: 450, y: 320, size: 28, speed: 3.5, color: '#00d2ff',
  trail: [], facing: 0, bobPhase: 0
};

const stations = [
  { name: 'CRM', icon: '👥', color: '#ff6b6b', glow: '#ff3333', x: 120, y: 100, size: 52, desc: 'Manage customer relationships!', points: 10, cooldown: 0, pulsePhase: 0 },
  { name: 'Email', icon: '📧', color: '#feca57', glow: '#ffaa00', x: 750, y: 100, size: 52, desc: 'Send targeted campaigns!', points: 15, cooldown: 0, pulsePhase: 1 },
  { name: 'Analytics', icon: '📊', color: '#48dbfb', glow: '#0099ff', x: 120, y: 320, size: 52, desc: 'Crunch those numbers!', points: 20, cooldown: 0, pulsePhase: 2 },
  { name: 'Social', icon: '💬', color: '#ff9ff3', glow: '#ff55dd', x: 750, y: 320, size: 52, desc: 'Boost engagement!', points: 12, cooldown: 0, pulsePhase: 3 },
  { name: 'SEO', icon: '🔍', color: '#55efc4', glow: '#00cc88', x: 120, y: 530, size: 52, desc: 'Climb the rankings!', points: 18, cooldown: 0, pulsePhase: 4 },
  { name: 'Ads', icon: '📢', color: '#a29bfe', glow: '#7755ff', x: 750, y: 530, size: 52, desc: 'Launch ad campaigns!', points: 25, cooldown: 0, pulsePhase: 5 }
];

const floatingTexts = [];

function spawnParticles(x, y, color, count) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1 + Math.random() * 4;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 40 + Math.random() * 30,
      maxLife: 40 + Math.random() * 30,
      color,
      size: 2 + Math.random() * 4
    });
  }
}

function drawRoom() {
  // Floor
  const floorGrad = ctx.createRadialGradient(450, 320, 50, 450, 320, 500);
  floorGrad.addColorStop(0, '#2d2d5e');
  floorGrad.addColorStop(1, '#16213e');
  ctx.fillStyle = floorGrad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
  }

  // Border decoration
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 5]);
  ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
  ctx.setLineDash([]);
}

function drawStation(s) {
  const pulse = Math.sin(frameCount * 0.05 + s.pulsePhase * 1.2) * 0.3 + 0.7;
  const isReady = s.cooldown <= 0;

  // Glow
  if (isReady) {
    const glowSize = s.size + 20 + Math.sin(frameCount * 0.03 + s.pulsePhase) * 8;
    const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowSize);
    glow.addColorStop(0, s.glow + '44');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(s.x, s.y, glowSize, 0, Math.PI * 2);
    ctx.fill();
  }

  // Platform
  ctx.fillStyle = isReady ? s.color + '33' : '#33333355';
  ctx.strokeStyle = isReady ? s.color : '#555';
  ctx.lineWidth = 3;
  const platformSize = s.size + 12;
  roundRect(s.x - platformSize, s.y - platformSize, platformSize * 2, platformSize * 2, 12, true, true);

  // Inner box
  ctx.fillStyle = isReady ? s.color + '22' : '#22222244';
  ctx.strokeStyle = isReady ? s.color + 'aa' : '#444';
  ctx.lineWidth = 2;
  roundRect(s.x - s.size, s.y - s.size, s.size * 2, s.size * 2, 8, true, true);

  // Cooldown overlay
  if (!isReady) {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(Math.ceil(s.cooldown / 60) + 's', s.x, s.y + 6);
  }

  // Icon
  if (isReady) {
    ctx.font = `${28 + pulse * 4}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.icon, s.x, s.y - 4);
  }

  // Label
  ctx.font = 'bold 14px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = isReady ? s.color : '#666';
  ctx.fillText(s.name, s.x, s.y + s.size + 24);

  // Points indicator
  if (isReady) {
    ctx.font = '11px monospace';
    ctx.fillStyle = '#ffffff88';
    ctx.fillText('+' + s.points + ' pts', s.x, s.y + s.size + 38);
  }
}

function drawPlayer() {
  player.bobPhase += 0.1;
  const bob = Math.sin(player.bobPhase) * 2;

  // Trail
  for (let i = 0; i < player.trail.length; i++) {
    const t = player.trail[i];
    const alpha = i / player.trail.length * 0.4;
    const size = player.size * (i / player.trail.length) * 0.6;
    ctx.fillStyle = `rgba(0, 210, 255, ${alpha})`;
    ctx.beginPath();
    ctx.arc(t.x, t.y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(player.x, player.y + player.size + 4, player.size * 0.8, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body glow
  const bodyGlow = ctx.createRadialGradient(player.x, player.y + bob, 5, player.x, player.y + bob, player.size + 10);
  bodyGlow.addColorStop(0, '#00d2ff44');
  bodyGlow.addColorStop(1, 'transparent');
  ctx.fillStyle = bodyGlow;
  ctx.beginPath();
  ctx.arc(player.x, player.y + bob, player.size + 10, 0, Math.PI * 2);
  ctx.fill();

  // Body
  const bodyGrad = ctx.createRadialGradient(player.x - 5, player.y + bob - 5, 2, player.x, player.y + bob, player.size);
  bodyGrad.addColorStop(0, '#66efff');
  bodyGrad.addColorStop(0.6, '#00d2ff');
  bodyGrad.addColorStop(1, '#0077aa');
  ctx.fillStyle = bodyGrad;
  ctx.beginPath();
  ctx.arc(player.x, player.y + bob, player.size, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#00ffff88';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x, player.y + bob, player.size, 0, Math.PI * 2);
  ctx.stroke();

  // Face
  const eyeOffX = player.facing * 4;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.ellipse(player.x - 8 + eyeOffX, player.y + bob - 5, 6, 7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(player.x + 8 + eyeOffX, player.y + bob - 5, 6, 7, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath();
  ctx.arc(player.x - 6 + eyeOffX * 1.3, player.y + bob - 4, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(player.x + 10 + eyeOffX * 1.3, player.y + bob - 4, 3, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(player.x + eyeOffX * 0.5, player.y + bob + 4, 8, 0.1 * Math.PI, 0.9 * Math.PI);
  ctx.stroke();

  // Label
  ctx.font = 'bold 12px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#00d2ff';
  ctx.fillText('YOU', player.x, player.y + bob - player.size - 8);
}

function drawHUD() {
  // Score panel
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  roundRect(canvas.width / 2 - 100, 8, 200, 40, 10, true, false);
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 2;
  roundRect(canvas.width / 2 - 100, 8, 200, 40, 10, false, true);

  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#feca57';
  ctx.fillText('⭐ ' + score, canvas.width / 2, 35);

  // Title
  ctx.font = 'bold 11px monospace';
  ctx.fillStyle = '#e94560';
  ctx.textAlign = 'left';
  ctx.fillText('GTM TOOL ROOM', 14, canvas.height - 10);

  // Instructions
  ctx.textAlign = 'right';
  ctx.fillStyle = '#ffffff55';
  ctx.font = '11px monospace';
  ctx.fillText('WASD/Arrows to move | Touch stations to score', canvas.width - 14, canvas.height - 10);
}

function drawMessage() {
  if (messageTimer > 0) {
    const alpha = Math.min(1, messageTimer / 20);
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'center';
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 + 80);
    messageTimer--;
  }
}

function drawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.vx *= 0.99;
    p.life--;
    const alpha = p.life / p.maxLife;
    ctx.fillStyle = p.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
    ctx.fill();
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function drawFloatingTexts() {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    const ft = floatingTexts[i];
    ft.y -= 1.5;
    ft.life--;
    const alpha = ft.life / ft.maxLife;
    ctx.font = `bold ${ft.size}px monospace`;
    ctx.textAlign = 'center';
    ctx.fillStyle = ft.color + Math.floor(alpha * 255).toString(16).padStart(2, '0');
    ctx.fillText(ft.text, ft.x, ft.y);
    if (ft.life <= 0) floatingTexts.splice(i, 1);
  }
}

function roundRect(x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function update() {
  let dx = 0, dy = 0;
  if (keys['arrowleft'] || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;
  if (keys['arrowup'] || keys['w']) dy -= 1;
  if (keys['arrowdown'] || keys['s']) dy += 1;

  if (dx !== 0 || dy !== 0) {
    const len = Math.sqrt(dx * dx + dy * dy);
    dx /= len; dy /= len;
    player.x += dx * player.speed;
    player.y += dy * player.speed;
    player.facing = dx;

    player.trail.push({ x: player.x, y: player.y });
    if (player.trail.length > 12) player.trail.shift();
  } else {
    if (player.trail.length > 0) player.trail.shift();
  }

  // Clamp to room
  player.x = Math.max(player.size + 20, Math.min(canvas.width - player.size - 20, player.x));
  player.y = Math.max(player.size + 20, Math.min(canvas.height - player.size - 20, player.y));

  // Check station collisions
  for (const s of stations) {
    if (s.cooldown > 0) {
      s.cooldown--;
      continue;
    }
    const dist = Math.hypot(player.x - s.x, player.y - s.y);
    if (dist < player.size + s.size) {
      score += s.points;
      s.cooldown = 180; // 3 seconds at 60fps
      message = s.desc;
      messageTimer = 90;
      spawnParticles(s.x, s.y, s.color, 25);
      floatingTexts.push({
        x: s.x, y: s.y - s.size - 10,
        text: '+' + s.points,
        color: s.color,
        size: 24,
        life: 50, maxLife: 50
      });
    }
  }

  // Ambient particles
  if (frameCount % 30 === 0) {
    particles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 5,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -0.5 - Math.random(),
      life: 100 + Math.random() * 60,
      maxLife: 160,
      color: ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#55efc4', '#a29bfe'][Math.floor(Math.random() * 6)],
      size: 1 + Math.random() * 2
    });
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoom();
  drawParticles();
  for (const s of stations) drawStation(s);
  drawPlayer();
  drawFloatingTexts();
  drawMessage();
  drawHUD();
}

function gameLoop() {
  frameCount++;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>
