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

//typewriter

const elements = document.querySelectorAll(".typewriter");
const speed = 30; // ms per character

elements.forEach(el => {
    const text = el.textContent;
    el.textContent = "";

    let i = 0;

    function type() {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
});
