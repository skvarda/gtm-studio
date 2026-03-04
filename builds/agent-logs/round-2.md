# Round 2

Valid HTML: true

## Raw Output



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GTM Tool Rush!</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #1a1a2e; display: flex; justify-content: center; align-items: center; height: 100vh; overflow: hidden; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
canvas { border: 3px solid #e94560; border-radius: 8px; box-shadow: 0 0 30px rgba(233, 69, 96, 0.3); }
</style>
</head>
<body>
<canvas id="game"></canvas>
<script>
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 600;

const keys = {};
window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const player = {
  x: 450, y: 300, size: 28, speed: 3.5, color: '#f8e71c',
  trail: [], emoji: '🏃'
};

let score = 0;
let combo = 1;
let comboTimer = 0;
let message = '';
let messageTimer = 0;
let particles = [];
let floatingTexts = [];
let time = 0;

const stations = [
  { name: 'CRM', x: 100, y: 80, color: '#e94560', icon: '👥', desc: 'Customer Relations', cooldown: 0, basePoints: 10, visits: 0, glowColor: '#ff6b81' },
  { name: 'Email', x: 750, y: 80, color: '#0f3460', icon: '📧', desc: 'Email Campaigns', cooldown: 0, basePoints: 15, visits: 0, glowColor: '#5f7fb8' },
  { name: 'Analytics', x: 100, y: 460, color: '#16c79a', icon: '📊', desc: 'Data Analytics', cooldown: 0, basePoints: 20, visits: 0, glowColor: '#4aedc4' },
  { name: 'Social', x: 750, y: 460, color: '#ff6b35', icon: '📱', desc: 'Social Media', cooldown: 0, basePoints: 12, visits: 0, glowColor: '#ffa07a' },
  { name: 'SEO', x: 420, y: 80, color: '#7b2d8e', icon: '🔍', desc: 'Search Engine Opt.', cooldown: 0, basePoints: 18, visits: 0, glowColor: '#b86fc6' },
  { name: 'Ads', x: 420, y: 460, color: '#f0c929', icon: '📢', desc: 'Ad Campaigns', cooldown: 0, basePoints: 14, visits: 0, glowColor: '#ffe066' }
];

const stationSize = 70;

const challenges = [
  { text: 'Visit CRM!', target: 'CRM', bonus: 50 },
  { text: 'Check Analytics!', target: 'Analytics', bonus: 50 },
  { text: 'Run Email Campaign!', target: 'Email', bonus: 50 },
  { text: 'Post on Social!', target: 'Social', bonus: 50 },
  { text: 'Optimize SEO!', target: 'SEO', bonus: 50 },
  { text: 'Launch Ads!', target: 'Ads', bonus: 50 },
  { text: 'Visit all stations!', target: 'all', bonus: 200 },
];

let currentChallenge = null;
let challengeTimer = 0;
let visitedForChallenge = new Set();
let totalVisits = 0;

function spawnChallenge() {
  const c = challenges[Math.floor(Math.random() * challenges.length)];
  currentChallenge = { ...c };
  challengeTimer = 600;
  visitedForChallenge.clear();
}

function spawnParticles(x, y, color, count = 15) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
    const speed = 1.5 + Math.random() * 3;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 40 + Math.random() * 20,
      maxLife: 60,
      color,
      size: 2 + Math.random() * 4
    });
  }
}

function spawnFloatingText(x, y, text, color) {
  floatingTexts.push({ x, y, text, color, life: 60, vy: -1.5 });
}

function drawRoundedRect(x, y, w, h, r) {
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
}

function drawStation(s) {
  const pulse = Math.sin(time * 0.05 + stations.indexOf(s)) * 0.15 + 0.85;
  const isReady = s.cooldown <= 0;
  const half = stationSize / 2;

  // Glow
  if (isReady) {
    const gradient = ctx.createRadialGradient(s.x, s.y, half * 0.5, s.x, s.y, half * 1.8);
    gradient.addColorStop(0, s.glowColor + '40');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(s.x - half * 2, s.y - half * 2, stationSize * 2, stationSize * 2);
  }

  // Platform shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(s.x, s.y + half + 8, half * 0.9, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Station body
  const scale = isReady ? pulse : 0.7;
  ctx.save();
  ctx.translate(s.x, s.y);
  ctx.scale(scale, scale);

  drawRoundedRect(-half, -half, stationSize, stationSize, 12);
  const bodyGrad = ctx.createLinearGradient(-half, -half, half, half);
  bodyGrad.addColorStop(0, isReady ? s.color : '#555');
  bodyGrad.addColorStop(1, isReady ? s.glowColor : '#333');
  ctx.fillStyle = bodyGrad;
  ctx.fill();

  ctx.strokeStyle = isReady ? '#fff' : '#777';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Icon
  ctx.font = '30px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(s.icon, 0, -5);

  // Name
  ctx.font = 'bold 12px "Segoe UI", sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText(s.name, 0, 25);

  ctx.restore();

  // Cooldown bar
  if (!isReady) {
    const barW = stationSize * 0.8;
    const barH = 5;
    const bx = s.x - barW / 2;
    const by = s.y + half + 15;
    ctx.fillStyle = '#333';
    drawRoundedRect(bx, by, barW, barH, 2);
    ctx.fill();
    const prog = 1 - (s.cooldown / 180);
    ctx.fillStyle = s.color;
    drawRoundedRect(bx, by, barW * prog, barH, 2);
    ctx.fill();
  }

  // Description on hover proximity
  const dx = player.x - s.x;
  const dy = player.y - s.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 80) {
    ctx.font = '11px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.textAlign = 'center';
    ctx.fillText(s.desc, s.x, s.y - half - 15);
    ctx.fillText(isReady ? `+${s.basePoints * combo} pts` : 'Recharging...', s.x, s.y - half - 3);
  }
}

function drawPlayer() {
  // Trail
  for (let i = 0; i < player.trail.length; i++) {
    const t = player.trail[i];
    const alpha = i / player.trail.length * 0.4;
    const size = player.size * (i / player.trail.length) * 0.6;
    ctx.fillStyle = `rgba(248, 231, 28, ${alpha})`;
    ctx.beginPath();
    ctx.arc(t.x, t.y, size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Body glow
  const glow = ctx.createRadialGradient(player.x, player.y, 0, player.x, player.y, player.size * 1.5);
  glow.addColorStop(0, 'rgba(248, 231, 28, 0.3)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(player.x - 50, player.y - 50, 100, 100);

  // Body
  const bob = Math.sin(time * 0.15) * 2;
  ctx.save();
  ctx.translate(player.x, player.y + bob);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, player.size / 2 + 4, player.size * 0.5, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Character circle
  const grad = ctx.createRadialGradient(-5, -5, 2, 0, 0, player.size / 2);
  grad.addColorStop(0, '#fff7a8');
  grad.addColorStop(0.5, player.color);
  grad.addColorStop(1, '#d4a800');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, player.size / 2, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Face
  ctx.fillStyle = '#333';
  ctx.beginPath();
  ctx.arc(-5, -3, 3, 0, Math.PI * 2);
  ctx.arc(5, -3, 3, 0, Math.PI * 2);
  ctx.fill();

  // Smile
  ctx.beginPath();
  ctx.arc(0, 2, 6, 0.1, Math.PI - 0.1);
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

function drawFloor() {
  // Grid pattern
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }
  for (let y = 0; y < canvas.height; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }
}

function drawHUD() {
  // Score panel
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  drawRoundedRect(10, 10, 200, 45, 8);
  ctx.fill();
  ctx.strokeStyle = '#e94560';
  ctx.lineWidth = 1;
  drawRoundedRect(10, 10, 200, 45, 8);
  ctx.stroke();

  ctx.font = 'bold 22px "Segoe UI", sans-serif';
  ctx.fillStyle = '#f8e71c';
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${score}`, 22, 38);

  // Combo
  if (combo > 1) {
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    drawRoundedRect(220, 10, 100, 45, 8);
    ctx.fill();
    ctx.strokeStyle = '#16c79a';
    ctx.lineWidth = 1;
    drawRoundedRect(220, 10, 100, 45, 8);
    ctx.stroke();
    ctx.font = 'bold 18px "Segoe UI", sans-serif';
    ctx.fillStyle = '#16c79a';
    ctx.textAlign = 'center';
    ctx.fillText(`x${combo} Combo`, 270, 38);
  }

  // Challenge
  if (currentChallenge) {
    const cw = 260;
    const cx = canvas.width / 2 - cw / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    drawRoundedRect(cx, 555, cw, 35, 8);
    ctx.fill();
    ctx.strokeStyle = '#f0c929';
    ctx.lineWidth = 1;
    drawRoundedRect(cx, 555, cw, 35, 8);
    ctx.stroke();

    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillStyle = '#f0c929';
    ctx.textAlign = 'center';
    ctx.fillText(`⭐ ${currentChallenge.text} (+${currentChallenge.bonus})`, canvas.width / 2, 577);

    // Timer bar
    const tp = challengeTimer / 600;
    ctx.fillStyle = `rgba(240, 201, 41, 0.3)`;
    drawRoundedRect(cx + 5, 585, (cw - 10) * tp, 3, 1);
    ctx.fill();
  }

  // Total visits
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  drawRoundedRect(canvas.width - 160, 10, 150, 45, 8);
  ctx.fill();
  ctx.font = '14px "Segoe UI", sans-serif';
  ctx.fillStyle = '#aaa';
  ctx.textAlign = 'right';
  ctx.fillText(`Visits: ${totalVisits}`, canvas.width - 22, 38);

  // Message
  if (messageTimer > 0) {
    const alpha = Math.min(1, messageTimer / 20);
    ctx.font = `bold 20px "Segoe UI", sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.textAlign = 'center';
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 50);
  }

  // Instructions
  if (time < 300) {
    const alpha = Math.max(0, 1 - time / 300);
    ctx.font = `16px "Segoe UI", sans-serif`;
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.textAlign = 'center';
    ctx.fillText('Use WASD or Arrow Keys to move! Visit stations to score!', canvas.width / 2, canvas.height / 2 + 80);
  }
}

function update() {
  time++;

  // Player movement
  let dx = 0, dy = 0;
  if (keys['arrowleft'] || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;
  if (keys['arrowup'] || keys['w']) dy -= 1;
  if (keys['arrowdown'] || keys['s']) dy += 1;

  if (dx !== 0 && dy !== 0) {
    dx *= 0.707;
    dy *= 0.707;
  }

  player.x += dx * player.speed;
  player.y += dy * player.speed;

  // Bounds
  const margin = player.size / 2;
  player.x = Math.max(margin, Math.min(canvas.width - margin, player.x));
  player.y = Math.max(margin, Math.min(canvas.height - margin, player.y));

  // Trail
  if (dx !== 0 || dy !== 0) {
    player.trail.push({ x: player.x, y: player.y });
    if (player.trail.length > 12) player.trail.shift();
  } else if (player.trail.length > 0) {
    player.trail.shift();
  }

  // Combo timer
  if (comboTimer > 0) {
    comboTimer--;
    if (comboTimer <= 0) combo = 1;
  }

  // Station interactions
  stations.forEach(s => {
    if (s.cooldown > 0) s.cooldown--;

    const ddx = player.x - s.x;
    const ddy = player.y - s.y;
    const dist = Math.sqrt(ddx * ddx + ddy * ddy);

    if (dist < stationSize / 2 + player.size / 2 && s.cooldown <= 0) {
      const points = s.basePoints * combo;
      score += points;
      s.cooldown = 180;
      s.visits++;
      totalVisits++;

      spawnParticles(s.x, s.y, s.color, 20);
      spawnFloatingText(s.x, s.y - 50, `+${points}`, s.glowColor);

      comboTimer = 180;
      combo = Math.min(combo + 1, 5);

      message = `${s.icon} ${s.name} activated!`;
      messageTimer = 60;

      // Challenge check
      if (currentChallenge) {
        if (currentChallenge.target === s.name) {
          score += currentChallenge.bonus;
          spawnFloatingText(canvas.width / 2, canvas.height / 2, `⭐ +${currentChallenge.bonus} BONUS!`, '#f0c929');
          spawnParticles(player.x, player.y, '#f0c929', 30);
          currentChallenge = null;
        } else if (currentChallenge.target === 'all') {
          visitedForChallenge.add(s.name);
          if (visitedForChallenge.size >= 6) {
            score += currentChallenge.bonus;
            spawnFloatingText(canvas.width / 2, canvas.height / 2, `⭐ +${currentChallenge.bonus} ALL VISITED!`, '#f0c929');
            spawnParticles(player.x, player.y, '#f0c929', 40);
            currentChallenge = null;
          }
        }
      }
    }
  });

  // Challenge timer
  if (currentChallenge) {
    challengeTimer--;
    if (challengeTimer <= 0) currentChallenge = null;
  }
  if (!currentChallenge && time % 300 === 0) {
    spawnChallenge();
  }

  // Message timer
  if (messageTimer > 0) messageTimer--;

  // Particles
  particles = particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.97;
    p.vy *= 0.97;
    p.life--;
    return p.life > 0;
  });

  // Floating texts
  floatingTexts = floatingTexts.filter(ft => {
    ft.y += ft.vy;
    ft.life--;
    return ft.life > 0;
  });
}

function draw() {
  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
  bg.addColorStop(0, '#1a1a2e');
  bg.addColorStop(1, '#16213e');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawFloor();

  // Stations
  stations.forEach(drawStation);

  // Particles
  particles.forEach(p => {
    const alpha = p.life / p.maxLife;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;

  // Player
  drawPlayer();

  // Floating texts
  floatingTexts.forEach(ft => {
    const alpha = ft.life / 60;
    ctx.font = `bold 18px "Segoe UI", sans-serif`;
    ctx.fillStyle = ft.color;
    ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';
    ctx.fillText(ft.text, ft.x, ft.y);
  });
  ctx.globalAlpha = 1;

  drawHUD();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Start first challenge after a delay
setTimeout(spawnChallenge, 3000);
gameLoop();
</script>
</body>
</html>
