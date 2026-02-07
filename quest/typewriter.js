function startScene(sceneIndex) {
  const scenes = document.querySelectorAll(".scene");
  if (sceneIndex >= scenes.length) return;

  const scene = scenes[sceneIndex];
  scene.classList.add("active");

  // Find the typewriter element inside the scene
  const el = scene.querySelector(".typewriter");
  
  // Only type lines if a typewriter exists
  if (el) {
    typeLinesSequentially(storyScenes[sceneIndex], el);
  }
}


let currentScene = 0;
const speed = 40; // typing speed per character

// Define your story lines for each scene
const storyScenes = [
  {
    lines: [
      ""
    ],
    autoNext: false //1
  },
  {
    lines: [
      ""
    ],
    autoNext: false //2
  },
  {
    lines:   [
    "Hey Jinny, I've got a quest for you!",
    "I hope you're up for the challenge...",
    "Because if you're not...",
    "I will cry.",
    "...",
    ""
  ],
    autoNext: true //3
  },
  {
    lines: [
      "I'm sure you're wondering what this is all about...",
      "...",
      "Keep wondering <3",
      "ANYWAYS... LETS GET STARTED!!",
      ""
    ],
    autoNext: false //2
  }
];



// Type one line, then callback
function typeLine(line, el, callback) {
  el.textContent = "";
  el.style.visibility = "visible";

  let i = 0;
  function type() {
    if (i < line.length) {
      el.textContent += line[i++];
      setTimeout(type, speed);
    } else {
      setTimeout(callback, 2500); // wait before next line
    }
  }
  type();
}

// Type all lines sequentially in one element
function typeLinesSequentially(lines, el, finished) {
  if (!lines || !lines.length) {
    finished?.();
    return;
  }

  let index = 0;

  function nextLine() {
    if (index < lines.length) {
      typeLine(lines[index], el, () => {
        index++;
        nextLine();
      });
    } else {
      finished?.(); // All lines done
    }
  }

  nextLine();
}


// Start a scene
function startScene(sceneIndex) {
  const scenes = document.querySelectorAll(".scene");
  if (sceneIndex >= scenes.length) return;

  const scene = scenes[sceneIndex];
  scene.classList.add("active");

  const el = scene.querySelector(".typewriter");
  const data = storyScenes[sceneIndex];

  // Only type if we have both element + data
  if (el && data && data.lines) {
    typeLinesSequentially(data.lines, el, () => {
      
      // Auto-advance if enabled
      if (data.autoNext) {
        setTimeout(nextScene, 800);
      }

    });
  }
}


// Go to next scene
function nextScene() {
  const scenes = document.querySelectorAll(".scene");
  if (currentScene >= scenes.length) return;

  scenes[currentScene].classList.remove("active");
  currentScene++;

  if (currentScene < scenes.length) {
    startScene(currentScene);
  }
}

// Wait until DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  startScene(0);
});
