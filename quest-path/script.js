// ----------------------
// GLOBAL
// ----------------------
const scenes = document.querySelectorAll(".scene");
let currentScene = 0;
const speed = 40;

// Music
const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");
const track3 = document.getElementById("track3");
const track4 = document.getElementById("track4");

// Unlock audio
document.addEventListener("click", () => {
  track1.volume = 0.3;
  track1.play();
}, { once: true });

// Select sound
const selectSound = document.getElementById("selectSound");
const select = document.querySelectorAll(".select");

select.forEach(btn => {
  btn.addEventListener("click", () => {
    selectSound.volume = 0.3;
    selectSound.currentTime = 0;
    selectSound.play();
  });
});

// Story lines
const storyScenes = [
  { lines: [""], autoNext: false },
  { lines: [
      "Prepare yourself.",
      "This is the zero context boss fight.",
      "I hope you're ready.",
      "All you need to do is live long enough for me to code the next part of the quest.",
      "Good luck.",
      "..."
    ], autoNext: true
  },
  { lines: [
      "...",
      "Watch out, don't die.",
      "...",
      "Coding: 5% Complete",
      "Coding: 7% Complete",
      "Some of these bullets target where you last were.",
      "Coding: 9% Complete",
      "HOLD ON! I'M GETTING THERE!",
      "Coding: 12% Complete",
      "Coding: 14% Complete",
      "Insert placeholder text here",
      "Coding: 16% Complete",
      "Hey Alexa, order Arizona.",
      "Coding: 18% Complete",
      "Coding: 20% Complete",
      "How do I open google?",
      "Coding: 25% Complete",
      "Coding: 30% Complete",
      "Hold on, gotta doomscroll",
      "Coding: 35% Complete",
      "Coding: 40% Complete",
      "Jinny.",
      "Coding: 45% Complete",
      "Coding: 50% Complete",
      "Listen...",
      "I gotta tell you something",
      "Coding: 55% Complete",
      "Coding: 60% Complete",
      "So about this progress bar...",
      "Coding: 65% Complete",
      "Coding: 67% Complete",
      "Coding: 69% Complete",
      "Coding: 70% Complete",
      "Coding: 75% Complete",
      "I know this is pre-coded...",
      "But you gotta know something",
      "I'm extending the length of this fight to reach the end of the song.",
      "Coding: 80% Complete",
      "Sorry, you're gunna have to hang in there",
      "Coding: 85% Complete",
      "HANG IN THERE!!",
      "Coding: 90% Complete",
      "UIAUIAUIAUIAUIAUIA",
      "Coding: 95% Complete",
      "DONT DIE!!!",
      "Coding: 99% Complete",
      "How do I commit to github again?",
      "Coding: 99.5% Complete",
      "Coding: 99.99% Complete",
      "Figured it out!",
      "Coding: 100% Complete",
      "ALRIGHT LOADING THE NEXT PART!!",
      "WELL DONE YOU MADE IT!"
    ], autoNext: true
  }, 
  { lines: [
      "You made it!",
      "Congratulations.",
      "Now all we need is that key..."
    ], autoNext: true
  },
  { lines: [
    ""
  ], autoNext: false  
  }, 
  { lines: [
    "Well Jinny, you made it to the end of the quest.",
    "I didn't have much time to do anything else.",
    "Thanks for joining me on this quest.",
    "Even though there was absolutely no story to it at all.",
    "...",
    "Thanks for playing!",
    "That's all!",
    "...",
    "I guess there's one last thing I need to ask.",
    "and it's VERY VERY VERY IMPORTANT you say YES.",
    "Because if you don't I'm sending you back to the start.",
    "...",
    "Let me buy you dinner?"
  ], autoNext: true
  },   
  { lines: [
    ""
  ], autoNext: false  
  },
  { lines: [
    ":]",
    "I knew you'd say yes.",
    "...",
    "Good night <3"
  ], autoNext: false  
  }
];

// ----------------------
// TYPEWRITER
// ----------------------
function typeLine(line, el, callback) {
  el.textContent = "";
  el.style.visibility = "visible";

  let i = 0;
  function type() {
    if (i < line.length) {
      el.textContent += line[i++];
      setTimeout(type, speed);
    } else {
      setTimeout(callback, 2000);
    }
  }
  type();
}

function typeLinesSequentially(lines, el, finished) {
  if (!lines || !lines.length) { finished?.(); return; }

  let index = 0;
  function nextLine() {
    if (index < lines.length) {
      typeLine(lines[index], el, () => {
        index++;
        nextLine();
      });
    } else {
      finished?.();
    }
  }
  nextLine();
}

// ----------------------
// SCENE CONTROL
// ----------------------
function startScene(sceneIndex) {
  if (sceneIndex >= scenes.length) return;

  const scene = scenes[sceneIndex];
  const data = storyScenes[sceneIndex];

  scene.classList.add("active");

  const el = scene.querySelector(".typewriter");

  if (el && data?.lines) {
    typeLinesSequentially(data.lines, el, () => {
      if (data.autoNext) {
        setTimeout(nextScene, 800);
      }
    });
  }

  // Example: music fade on scene 4
  if (sceneIndex === 2) {
    crossFade(track1, track2, 2000, 0.3);
    runNextAttack();
  }

  if (sceneIndex === 3) {
    crossFade(track2, track3, 2000, 0.3);
    stopEverything();
  }

  if (sceneIndex === 5) {
    crossFade(track3, track4, 2000, 0.3);
  }

}

function nextScene() {
  scenes[currentScene].classList.remove("active");
  currentScene++;
  if (currentScene < scenes.length) startScene(currentScene);
}

function goToScene(n) {
  scenes[currentScene].classList.remove("active");
  currentScene = n;
  startScene(currentScene);
}

// ----------------------
// MUSIC CROSSFADE
// ----------------------
function crossFade(outAudio, inAudio, duration = 2000, targetVol = 0.3) {
  let start = null;
  inAudio.volume = 0;
  inAudio.play();
  const startVol = outAudio.volume;

  function step(time) {
    if (!start) start = time;
    const progress = (time - start) / duration;
    const t = Math.min(progress, 1);
    outAudio.volume = startVol * (1 - t);
    inAudio.volume = targetVol * t;
    if (t < 1) requestAnimationFrame(step);
    else outAudio.pause();
  }

  requestAnimationFrame(step);
}

// ----------------------
// INIT
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
  startScene(0);
});


/* ===================== SETUP ===================== */
const box = document.getElementById("battle-box");
const heart = document.getElementById("heart");
const hpDisplay = document.getElementById("hp");

let hp = 35;

let heartX = 192;
let heartY = 220;
const heartSpeed = 2;

const keys = {};
const bullets = [];

/* ===================== INPUT ===================== */
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

/* ===================== CONSTANTS ===================== */
const HEART_RADIUS = 3;
const BULLET_RADIUS = 6;

/* ===================== HEART ===================== */
function moveHeart() {
  if (keys["ArrowLeft"]) heartX -= heartSpeed;
  if (keys["ArrowRight"]) heartX += heartSpeed;
  if (keys["ArrowUp"]) heartY -= heartSpeed;
  if (keys["ArrowDown"]) heartY += heartSpeed;

  heartX = Math.max(0, Math.min(384, heartX));
  heartY = Math.max(0, Math.min(284, heartY));

  heart.style.left = heartX + "px";
  heart.style.top = heartY + "px";
}

/* ===================== DAMAGE ===================== */
function damage() {
  hp--;
  hpDisplay.textContent = hp;

  if (hp <= 0) {
    alert("You died.");
    location.reload();
  }
}

/* ===================== BULLETS ===================== */
function spawnBullet(x, y, vx, vy) {
  const el = document.createElement("div");
  el.className = "bullet";
  el.style.left = x + "px";
  el.style.top = y + "px";

  box.appendChild(el);
  bullets.push({ x, y, vx, vy, el });
}

/* ===================== COLLISION ===================== */
function checkCollision(b) {
  const dx = (b.x + BULLET_RADIUS) - (heartX + 8);
  const dy = (b.y + BULLET_RADIUS) - (heartY + 8);
  return Math.hypot(dx, dy) < (BULLET_RADIUS + HEART_RADIUS);
}

/* ===================== UPDATE BULLETS ===================== */
function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const b = bullets[i];
    b.x += b.vx;
    b.y += b.vy;

    b.el.style.left = b.x + "px";
    b.el.style.top = b.y + "px";

    if (checkCollision(b)) {
      damage();
      b.el.remove();
      bullets.splice(i, 1);
      continue;
    }

    if (b.x < -50 || b.x > 450 || b.y < -50 || b.y > 350) {
      b.el.remove();
      bullets.splice(i, 1);
    }
  }
}

/* ===================== PATTERNS ===================== */
// 1. Radial burst
function radialBurst() {
  const cx = 200;
  const cy = 150;
  const count = 16;
  const speed = 2.5;

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 / count) * i;
    spawnBullet(cx, cy, Math.cos(angle) * speed, Math.sin(angle) * speed);
  }
}

// 2. Spiral burst
let spiralAngle = 0;
function spiral() {
  const cx = 200;
  const cy = 150;
  const speed = 2.2;

  spawnBullet(cx, cy, Math.cos(spiralAngle) * speed, Math.sin(spiralAngle) * speed);
  spiralAngle += 0.25;
}

// 3. Aimed shot
function aimedShot() {
  const cx = 200;
  const cy = 0;

  const dx = heartX + 8 - cx;
  const dy = heartY + 8 - cy;
  const len = Math.hypot(dx, dy);

  spawnBullet(cx, cy, (dx / len) * 3, (dy / len) * 3);
  spawnBullet(cx, cy, (dx / len) * 3, (dy / len) * 3);
  spawnBullet(cx, cy, (dx / len) * 3, (dy / len) * 3);
}

// 4. Wave wall
function waveWall() {
  for (let x = 0; x <= 400; x += 50) {
    spawnBullet(x, -10, 0, 2.5);
  }
}

function incomingBarrage() {
  const directions = ["top", "bottom", "left", "right"];
  const count = 4; // bullets per side
  const speed = 3.0;

  directions.forEach(dir => {
    for (let i = 0; i < count; i++) {
      let x, y, vx, vy;

      switch (dir) {
        case "top":
          x = (i / count) * 400; // evenly spaced across top
          y = -20;
          vx = 0;
          vy = speed;
          break;
        case "bottom":
          x = (i / count) * 400;
          y = 320;
          vx = 0;
          vy = -speed;
          break;
        case "left":
          x = -20;
          y = (i / count) * 300;
          vx = speed;
          vy = 0;
          break;
        case "right":
          x = 420;
          y = (i / count) * 300;
          vx = -speed;
          vy = 0;
          break;
      }

      spawnBullet(x, y, vx, vy);
    }
  });
}

/* ===================== ATTACK QUEUE ===================== */
const attackQueue = [
  { fn: waveWall, delay: 1000 },
  { fn: radialBurst, delay: 250 },
  { fn: radialBurst, delay: 500 },
  { fn: waveWall, delay: 1000 },
  
  { fn: aimedShot, delay: 100 },
  { fn: aimedShot, delay: 200 },
  { fn: spiral, delay: 0, repeat: 40, repeatInterval: 80 },
  { fn: aimedShot, delay: 300 },
  { fn: aimedShot, delay: 400 },

  { fn: spiral, delay: 5000, repeat: 40, repeatInterval: 80 },


  { fn: waveWall, delay: 250 },
  { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
  { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
  { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
  { fn: aimedShot, delay: 0 },

  { fn: waveWall, delay: 1250 },
  { fn: waveWall, delay: 250 },
    { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
    { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
    { fn: aimedShot, delay: 0 },

  { fn: waveWall, delay: 1000 },
  { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
  { fn: aimedShot, delay: 0 },
  { fn: waveWall, delay: 250 },
  { fn: waveWall, delay: 250 },

  { fn: radialBurst, delay: 1000 },

  { fn: spiral, delay: 2000, repeat: 40, repeatInterval: 80 },
  { fn: incomingBarrage, delay: 3000 },
  { fn: radialBurst, delay: 500 }
];

let attackIndex = 0;

let attackTimeouts = []; // store all scheduled timeouts
let attackRunning = true;

function runNextAttack() {
  if (!attackRunning) return; // stop if disabled

  if (attackIndex >= attackQueue.length) attackIndex = 0;
  const attack = attackQueue[attackIndex];

  if (attack.repeat) {
    for (let i = 0; i < attack.repeat; i++) {
      const t = setTimeout(() => attack.fn(), i * attack.repeatInterval);
      attackTimeouts.push(t);
    }
  } else {
    attack.fn();
  }

  attackIndex++;
  const t = setTimeout(runNextAttack, attack.delay);
  attackTimeouts.push(t);
}

// To stop attacks:
function stopAttacks() {
  attackRunning = false;
  attackTimeouts.forEach(t => clearTimeout(t)); // cancel all scheduled attacks
  attackTimeouts = [];
}

// Start the attack sequence
//runNextAttack();

/* ===================== GAME LOOP ===================== */
function gameLoop() {
  moveHeart();
  updateBullets();
  requestAnimationFrame(gameLoop);
}

gameLoop();


// To stop attacks:
function stopAttacks() {
  attackRunning = false;
  attackTimeouts.forEach(t => clearTimeout(t)); // cancel all scheduled attacks
  attackTimeouts = [];
}

function clearBullets() {
  bullets.forEach(b => b.el.remove()); // remove from DOM
  bullets.length = 0; // clear array
}

function stopEverything() {
  stopAttacks(); // stop queue
  clearBullets(); // remove bullets
}