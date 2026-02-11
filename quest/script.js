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
  },
  { lines: [
    "Do you like puzzles?",
    "I like puzzles.",
    "...",
    "Do you know what the quest exactly is?",
    "I have no idea either.",
    "All I know is this is leading somewhere.. I think?",
    "...",
    "...",
    "...",
    "I think there's a hidden key in this photo",
    "It would be a shame if you skipped and forgot what it was...",
    "...",
    "Do you want dinner? I'll pay.",
    "...",
    "Hey Papyrus!",
    "Bone-appetite.",
    "...",
    "I have a Quest-tion.",
    "Okay I'll shut up...",
    "You totally could get the key without doing the puzzle...",
    "Please don't this was a pain to code."
  ], autoNext: false
  },
  { lines: [
      "YOU DID IT!",
      "I DID IT! - jinny probably",
      "Nice work! That didn't take long at all...",
      "I hope you found the key!",
      "...",
      "I think there's supposed to be a boss fight now or something?",
      "...",
      "*Lazy procrastination groans in the background*",
      "...",
      "Uh, I think you might be off the hook for thi-"
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
    crossFade(track1, track2, 5000, 0.3);
  }

  if (sceneIndex === 5) {
    crossFade(track2, track3, 2000, 0.3);
  }

  if (sceneIndex === 6) {
    window.location.href = "https://libraryoflau.ca/quest-path/";
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
function crossFade(outAudio, inAudio, duration = 5000, targetVol = 0.3) {
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










  const size = 3;              // 3x3 grid
  const boardSize = 400;      // px
  const tileSize = boardSize / size;

  const puzzle = document.getElementById("puzzle");
  const message = document.getElementById("message");

  let tiles = [];


  // Initialize
  function init() {

    tiles = [];

    for (let i = 0; i < size * size; i++) {
      tiles.push(i);
    }

    draw();
    shuffle(); // auto shuffle
  }


  // Draw puzzle
  function draw() {

    puzzle.innerHTML = "";

    tiles.forEach((num, index) => {

      const tile = document.createElement("div");
      tile.classList.add("tile");

      // Empty tile (last one)
      if (num === size * size - 1) {
        tile.classList.add("empty");
      } else {

        const row = Math.floor(num / size);
        const col = num % size;

        // Precise background position (no overlap)
        tile.style.backgroundPosition =
          `-${col * tileSize}px -${row * tileSize}px`;

        tile.style.backgroundSize =
          `${boardSize}px ${boardSize}px`;

        tile.addEventListener("click", () => move(index));
      }

      puzzle.appendChild(tile);
    });

    checkWin();
  }


  // Move logic
  function move(index) {

    const emptyIndex = tiles.indexOf(size * size - 1);

    const row = Math.floor(index / size);
    const col = index % size;

    const emptyRow = Math.floor(emptyIndex / size);
    const emptyCol = emptyIndex % size;

    const adjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (adjacent) {

      [tiles[index], tiles[emptyIndex]] =
      [tiles[emptyIndex], tiles[index]];

      draw();
    }
  }


  // Shuffle (solvable)
  function shuffle() {

    message.textContent = "";

    for (let i = 0; i < 400; i++) {

      const empty = tiles.indexOf(size * size - 1);

      const moves = [];

      const row = Math.floor(empty / size);
      const col = empty % size;

      if (row > 0) moves.push(empty - size);
      if (row < size - 1) moves.push(empty + size);
      if (col > 0) moves.push(empty - 1);
      if (col < size - 1) moves.push(empty + 1);

      const rand =
        moves[Math.floor(Math.random() * moves.length)];

      [tiles[empty], tiles[rand]] =
      [tiles[rand], tiles[empty]];
    }

    draw();
  }


  // Win check
  function checkWin() {

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i] !== i) return;
    }

    message.textContent = "You da twin to my tower!";

  }


  init();