# Round 1

Valid HTML: true

## Raw Output



<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>GTM Tool Master</title>
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
canvas.width = 960;
canvas.height = 640;

let score = 0;
let combo = 0;
let lastStation = null;
let particles = [];
let floatingTexts = [];
let screenShake = 0;
let gameTime = 0;

const keys = {};
window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; e.preventDefault(); });
window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 22,
    speed: 4,
    color: '#00d2ff',
    trail: [],
    angle: 0,
    bobPhase: 0,
    dashCooldown: 0,
    glowIntensity: 0
};

const stations = [
    { name: 'CRM', icon: '👥', color: '#ff6b6b', glow: '#ff6b6b', x: 120, y: 120, size: 50, cooldown: 0, maxCooldown: 180, points: 10, pulsePhase: 0, ready: true, timesUsed: 0, desc: 'Manage Contacts' },
    { name: 'Email', icon: '📧', color: '#ffd93d', glow: '#ffd93d', x: canvas.width - 120, y: 120, size: 50, cooldown: 0, maxCooldown: 150, points: 15, pulsePhase: 1, ready: true, timesUsed: 0, desc: 'Send Campaigns' },
    { name: 'Analytics', icon: '📊', color: '#6bcb77', glow: '#6bcb77', x: 120, y: canvas.height - 120, size: 50, cooldown: 0, maxCooldown: 200, points: 20, pulsePhase: 2, ready: true, timesUsed: 0, desc: 'Track Metrics' },
    { name: 'Social', icon: '💬', color: '#4d96ff', glow: '#4d96ff', x: canvas.width - 120, y: canvas.height - 120, size: 50, cooldown: 0, maxCooldown: 120, points: 12, pulsePhase: 3, ready: true, timesUsed: 0, desc: 'Engage Audience' },
    { name: 'SEO', icon: '🔍', color: '#9b59b6', glow: '#9b59b6', x: canvas.width / 2, y: 100, size: 50, cooldown: 0, maxCooldown: 220, points: 25, pulsePhase: 4, ready: true, timesUsed: 0, desc: 'Optimize Rankings' },
    { name: 'Ads', icon: '📢', color: '#e17055', glow: '#e17055', x: canvas.width / 2, y: canvas.height - 100, size: 50, cooldown: 0, maxCooldown: 160, points: 18, pulsePhase: 5, ready: true, timesUsed: 0, desc: 'Run Campaigns' }
];

const powerUps = [];
let nextPowerUp = 300;

function spawnPowerUp() {
    const types = [
        { name: '2X', color: '#ffeb3b', effect: 'double' },
        { name: '⚡', color: '#00e5ff', effect: 'speed' },
        { name: '❄️', color: '#80deea', effect: 'freeze' }
    ];
    const type = types[Math.floor(Math.random() * types.length)];
    powerUps.push({
        ...type,
        x: 100 + Math.random() * (canvas.width - 200),
        y: 100 + Math.random() * (canvas.height - 200),
        size: 18,
        life: 400,
        phase: 0
    });
}

let activeEffects = { double: 0, speed: 0, freeze: 0 };

function spawnParticles(x, y, color, count = 15) {
    for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 / count) * i + Math.random() * 0.5;
        const speed = 2 + Math.random() * 4;
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

function spawnFloatingText(x, y, text, color) {
    floatingTexts.push({ x, y, text, color, life: 60, maxLife: 60 });
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

function drawFloor() {
    const tileSize = 48;
    for (let x = 0; x < canvas.width; x += tileSize) {
        for (let y = 0; y < canvas.height; y += tileSize) {
            const checker = ((x / tileSize) + (y / tileSize)) % 2 === 0;
            ctx.fillStyle = checker ? '#16213e' : '#1a1a3e';
            ctx.fillRect(x, y, tileSize, tileSize);
        }
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += tileSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }
}

function drawStation(s) {
    const pulse = Math.sin(gameTime * 0.05 + s.pulsePhase) * 0.3 + 0.7;
    const readyGlow = s.ready ? pulse : 0.2;

    // Outer glow
    const gradient = ctx.createRadialGradient(s.x, s.y, s.size * 0.5, s.x, s.y, s.size * 2.5);
    gradient.addColorStop(0, s.color + Math.floor(readyGlow * 60).toString(16).padStart(2, '0'));
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // Platform
    const platformY = s.y + s.size * 0.3;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(s.x, platformY + s.size * 0.8, s.size * 1.2, s.size * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Station body
    const bodyBob = Math.sin(gameTime * 0.03 + s.pulsePhase) * 3;
    drawRoundedRect(s.x - s.size, s.y - s.size + bodyBob, s.size * 2, s.size * 2, 12);
    const bodyGrad = ctx.createLinearGradient(s.x, s.y - s.size + bodyBob, s.x, s.y + s.size + bodyBob);
    bodyGrad.addColorStop(0, s.ready ? s.color : '#555');
    bodyGrad.addColorStop(1, s.ready ? shadeColor(s.color, -40) : '#333');
    ctx.fillStyle = bodyGrad;
    ctx.fill();
    ctx.strokeStyle = s.ready ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Icon
    ctx.font = `${s.size * 0.8}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(s.icon, s.x, s.y - 2 + bodyBob);

    // Label
    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(s.name, s.x, s.y + s.size + 18 + bodyBob);

    // Description
    ctx.font = '10px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillText(s.desc, s.x, s.y + s.size + 32 + bodyBob);

    // Cooldown ring
    if (!s.ready) {
        const progress = 1 - (s.cooldown / s.maxCooldown);
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(s.x, s.y + bodyBob, s.size + 8, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress);
        ctx.stroke();
        ctx.lineCap = 'butt';
    }

    // Ready indicator
    if (s.ready) {
        const indicatorPulse = Math.sin(gameTime * 0.1 + s.pulsePhase) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255,255,255,${indicatorPulse * 0.6})`;
        ctx.font = '11px "Segoe UI", sans-serif';
        ctx.fillText('READY', s.x, s.y - s.size - 14 + bodyBob);
    }
}

function shadeColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.max(0, Math.min(255, (num >> 16) + amt));
    const G = Math.max(0, Math.min(255, (num >> 8 & 0x00FF) + amt));
    const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
    return `rgb(${R},${G},${B})`;
}

function drawPlayer() {
    const bob = Math.sin(player.bobPhase) * 3;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(player.x, player.y + player.size + 5, player.size * 0.8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Trail
    player.trail.forEach((t, i) => {
        const alpha = (i / player.trail.length) * 0.3;
        ctx.fillStyle = `rgba(0,210,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 3 + i * 0.2, 0, Math.PI * 2);
        ctx.fill();
    });

    // Glow
    if (player.glowIntensity > 0) {
        const glow = ctx.createRadialGradient(player.x, player.y + bob, 0, player.x, player.y + bob, player.size * 3);
        glow.addColorStop(0, `rgba(0,210,255,${player.glowIntensity * 0.3})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(player.x, player.y + bob, player.size * 3, 0, Math.PI * 2);
        ctx.fill();
    }

    // Body
    const bodyGrad = ctx.createRadialGradient(player.x - 5, player.y - 5 + bob, 2, player.x, player.y + bob, player.size);
    bodyGrad.addColorStop(0, '#5ef7ff');
    bodyGrad.addColorStop(0.6, '#00d2ff');
    bodyGrad.addColorStop(1, '#0088aa');
    ctx.fillStyle = bodyGrad;
    ctx.beginPath();
    ctx.arc(player.x, player.y + bob, player.size, 0, Math.PI * 2);
    ctx.fill();

    // Face
    ctx.fillStyle = '#fff';
    const eyeOffX = Math.cos(player.angle) * 4;
    const eyeOffY = Math.sin(player.angle) * 3;
    ctx.beginPath();
    ctx.arc(player.x - 7 + eyeOffX, player.y - 4 + bob + eyeOffY, 4, 0, Math.PI * 2);
    ctx.arc(player.x + 7 + eyeOffX, player.y - 4 + bob + eyeOffY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#1a1a2e';
    ctx.beginPath();
    ctx.arc(player.x - 6 + eyeOffX * 1.3, player.y - 4 + bob + eyeOffY * 1.3, 2, 0, Math.PI * 2);
    ctx.arc(player.x + 8 + eyeOffX * 1.3, player.y - 4 + bob + eyeOffY * 1.3, 2, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(player.x + eyeOffX * 0.5, player.y + 2 + bob + eyeOffY * 0.5, 7, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Speed effect
    if (activeEffects.speed > 0) {
        ctx.strokeStyle = `rgba(0,229,255,${0.3 + Math.sin(gameTime * 0.2) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y + bob, player.size + 6, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Double effect
    if (activeEffects.double > 0) {
        ctx.strokeStyle = `rgba(255,235,59,${0.3 + Math.sin(gameTime * 0.2) * 0.2})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y + bob, player.size + 10, 0, Math.PI * 2);
        ctx.stroke();
    }

    player.glowIntensity *= 0.95;
}

function drawHUD() {
    // Score panel
    drawRoundedRect(15, 10, 200, 55, 10);
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.font = 'bold 12px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.textAlign = 'left';
    ctx.fillText('SCORE', 30, 30);

    ctx.font = 'bold 28px "Segoe UI", sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(score.toString(), 30, 55);

    // Combo
    if (combo > 1) {
        drawRoundedRect(230, 10, 120, 55, 10);
        const comboGrad = ctx.createLinearGradient(230, 10, 350, 65);
        comboGrad.addColorStop(0, 'rgba(233,69,96,0.6)');
        comboGrad.addColorStop(1, 'rgba(233,69,96,0.3)');
        ctx.fillStyle = comboGrad;
        ctx.fill();

        ctx.font = 'bold 12px "Segoe UI", sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.8)';
        ctx.textAlign = 'center';
        ctx.fillText('COMBO', 290, 30);

        ctx.font = 'bold 24px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ff6b9d';
        ctx.fillText(`x${combo}`, 290, 55);
    }

    // Active effects
    let effectY = 10;
    if (activeEffects.double > 0) {
        drawRoundedRect(canvas.width - 120, effectY, 105, 25, 6);
        ctx.fillStyle = 'rgba(255,235,59,0.3)';
        ctx.fill();
        ctx.font = 'bold 11px "Segoe UI", sans-serif';
        ctx.fillStyle = '#ffeb3b';
        ctx.textAlign = 'right';
        ctx.fillText(`2X ${Math.ceil(activeEffects.double / 60)}s`, canvas.width - 25, effectY + 17);
        effectY += 30;
    }
    if (activeEffects.speed > 0) {
        drawRoundedRect(canvas.width - 120, effectY, 105, 25, 6);
        ctx.fillStyle = 'rgba(0,229,255,0.3)';
        ctx.fill();
        ctx.font = 'bold 11px "Segoe UI", sans-serif';
        ctx.fillStyle = '#00e5ff';
        ctx.textAlign = 'right';
        ctx.fillText(`SPEED ${Math.ceil(activeEffects.speed / 60)}s`, canvas.width - 25, effectY + 17);
        effectY += 30;
    }
    if (activeEffects.freeze > 0) {
        drawRoundedRect(canvas.width - 120, effectY, 105, 25, 6);
        ctx.fillStyle = 'rgba(128,222,234,0.3)';
        ctx.fill();
        ctx.font = 'bold 11px "Segoe UI", sans-serif';
        ctx.fillStyle = '#80deea';
        ctx.textAlign = 'right';
        ctx.fillText(`FREEZE ${Math.ceil(activeEffects.freeze / 60)}s`, canvas.width - 25, effectY + 17);
    }

    // Instructions
    ctx.font = '11px "Segoe UI", sans-serif';
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.textAlign = 'center';
    ctx.fillText('WASD / Arrow Keys to move — Walk into stations to activate them!', canvas.width / 2, canvas.height - 12);
}

function drawPowerUp(p) {
    p.phase += 0.05;
    const bob = Math.sin(p.phase) * 5;
    const pulse = Math.sin(p.phase * 2) * 0.2 + 0.8;

    // Glow
    const glow = ctx.createRadialGradient(p.x, p.y + bob, 0, p.x, p.y + bob, 30);
    glow.addColorStop(0, p.color + '60');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(p.x, p.y + bob, 30, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = p.color;
    ctx.globalAlpha = pulse;
    ctx.beginPath();
    ctx.arc(p.x, p.y + bob, p.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    ctx.font = 'bold 14px "Segoe UI", sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.name, p.x, p.y + bob);

    // Fade warning
    if (p.life < 60) {
        ctx.globalAlpha = (Math.sin(gameTime * 0.3) + 1) / 2;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y + bob, p.size + 5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
}

function update() {
    gameTime++;

    // Player movement
    let dx = 0, dy = 0;
    if (keys['w'] || keys['arrowup']) dy = -1;
    if (keys['s'] || keys['arrowdown']) dy = 1;
    if (keys['a'] || keys['arrowleft']) dx = -1;
    if (keys['d'] || keys['arrowright']) dx = 1;

    if (dx !== 0 || dy !== 0) {
        const len = Math.sqrt(dx * dx + dy * dy);
        dx /= len; dy /= len;
        const spd = player.speed * (activeEffects.speed > 0 ? 1.8 : 1);
        player.x += dx * spd;
        player.y += dy * spd;
        player.angle = Math.atan2(dy, dx);
        player.bobPhase += 0.15;

        player.trail.push({ x: player.x, y: player.y });
        if (player.trail.length > 12) player.trail.shift();
    }

    // Bounds
    player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));
    player.y = Math.max(player.size, Math.min(canvas.height - player.size, player.y));

    // Station interaction
    stations.forEach(s => {
        if (activeEffects.freeze <= 0) {
            if (s.cooldown > 0) {
                s.cooldown--;
                if (s.cooldown <= 0) {
                    s.ready = true;
                    spawnParticles(s.x, s.y, s.color, 8);
                }
            }
        }

        const dist = Math.sqrt((player.x - s.x) ** 2 + (player.y - s.y) ** 2);
        if (dist < s.size + player.size && s.ready) {
            s.ready = false;
            s.cooldown = s.maxCooldown;
            s.timesUsed++;

            // Score
            let points = s.points;
            if (lastStation && lastStation !== s.name) {
                combo++;
                points *= combo;
            } else {
                combo = 1;
            }
            if (activeEffects.double > 0) points *= 2;
            score += points;
            lastStation = s.name;

            // Effects
            spawnParticles(s.x, s.y, s.color, 25);
            spawnFloatingText(s.x, s.y - s.size - 20, `+${points}`, s.color);
            if (combo > 1) spawnFloatingText(s.x, s.y - s.size - 40, `${combo}x COMBO!`, '#ff6b9d');
            player.glowIntensity = 1;
            screenShake = 5;
        }
    });

    // Power-ups
    nextPowerUp--;
    if (nextPowerUp <= 0) {
        spawnPowerUp();
        nextPowerUp = 300 + Math.random() * 200;
    }

    powerUps.forEach((p, i) => {
        p.life--;
        const dist = Math.sqrt((player.x - p.x) ** 2 + (player.y - p.y) ** 2);
        if (dist < p.size + player.size) {
            activeEffects[p.effect] = 300;
            spawnParticles(p.x, p.y, p.color, 20);
            spawnFloatingText(p.x, p.y - 30, p.effect.toUpperCase() + '!', p.color);
            p.life = 0;
        }
    });

    for (let i = powerUps.length - 1; i >= 0; i--) {
        if (powerUps[i].life <= 0) powerUps.splice(i, 1);
    }

    // Effects timers
    for (const key in activeEffects) {
        if (activeEffects[key] > 0) activeEffects[key]--;
    }

    // Particles
    particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life--;
    });
    particles = particles.filter(p => p.life > 0);

    // Floating texts
    floatingTexts.forEach(t => {
        t.y -= 1.2;
        t.life--;
    });
    floatingTexts = floatingTexts.filter(t => t.life > 0);

    // Screen shake
    if (screenShake > 0) screenShake *= 0.8;
    if (screenShake < 0.1) screenShake = 0;
}

function draw() {
    ctx.save();
    if (screenShake > 0) {
        ctx.translate(
            (Math.random() - 0.5) * screenShake * 2,
            (Math.random() - 0.5) * screenShake * 2
        );
    }

    // Background
    ctx.fillStyle = '#0f0f23';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawFloor();

    // Connection lines between stations
    ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i < stations.length; i++) {
        for (let j = i + 1; j < stations.length; j++) {
            ctx.beginPath();
            ctx.moveTo(stations[i].x, stations[i].y);
            ctx.lineTo(stations[j].x, stations[j].y);
            ctx.stroke();
        }
    }

    // Power-ups
    powerUps.forEach(drawPowerUp);

    // Stations
    stations.forEach(drawStation);

    // Particles
    particles.forEach(p => {
        const alpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (p.life / p.maxLife), 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Floating texts
    floatingTexts.forEach(t => {
        const alpha = t.life / t.maxLife;
        const scale = 1 + (1 - alpha) * 0.3;
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.scale(scale, scale);
        ctx.font = 'bold 18px "Segoe UI", sans-serif';
        ctx.fillStyle = t.color;
        ctx.globalAlpha = alpha;
        ctx.textAlign = 'center';
        ctx.fillText(t.text, 0, 0);
        ctx.restore();
    });

    // Player
    drawPlayer();

    // HUD
    drawHUD();

    ctx.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
</script>
</body>
</html>
