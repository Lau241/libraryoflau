//fade animation

const scenes = document.querySelectorAll(".scene");
let current = 0;

function nextScene() {
  scenes[current].classList.remove("active");

  current++;

  if (current < scenes.length) {
    scenes[current].classList.add("active");
  }
}

function goToScene(n) {
  scenes[current].classList.remove("active");
  current = n;
  scenes[current].classList.add("active");
}

//<div onclick="goToScene(3)">Take Left Path</div>



//music for bg
const audio = document.getElementById("bgMusic");

document.addEventListener("click", () => {
    audio.volume = 0.1;
    audio.play();
}, { once: true });

//select sound
const selectSound = document.getElementById("selectSound");
const select = document.querySelectorAll(".select");

// Add click sound to each .select element
select.forEach(btn => {
    btn.addEventListener("click", () => {
        selectSound.volume = 0.1;
        selectSound.currentTime = 0; // allow replay
        selectSound.play();
    });
});
