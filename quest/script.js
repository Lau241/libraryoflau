// ----------------------
// GLOBAL
// ----------------------
const scenes = document.querySelectorAll(".scene");
let currentScene = 0;
const speed = 40;

// Music
const track1 = document.getElementById("track1");
const track2 = document.getElementById("track2");

// Unlock audio
document.addEventListener("click", () => {
  track1.volume = 0.1;
  track1.play();
}, { once: true });

// Select sound
const selectSound = document.getElementById("selectSound");
const select = document.querySelectorAll(".select");

select.forEach(btn => {
  btn.addEventListener("click", () => {
    selectSound.volume = 0.1;
    selectSound.currentTime = 0;
    selectSound.play();
  });
});

// Story lines
const storyScenes = [
  { lines: [""], autoNext: false },
  { lines: [""], autoNext: false },
  { lines: [
      "Hey Jinny, I've got a quest for you!",
      "I hope you're up for the challenge...",
      "Because if you're not...",
      "I will cry.",
      "...",
      ""
    ], autoNext: true
  },
  { lines: [
      "I'm sure you're wondering what this is all about...",
      "...",
      "Keep wondering <3",
      "ANYWAYS... LETS GET STARTED!!"
    ], autoNext: true
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
      setTimeout(callback, 2500);
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
  if (sceneIndex === 4) {
    crossFade(track1, track2, 1000, 0.1);
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
function crossFade(outAudio, inAudio, duration = 2000, targetVol = 0.1) {
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
