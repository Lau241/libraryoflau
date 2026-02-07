function hideBox(id) {
  const el = document.getElementById(id);

  el.classList.add("fade-out");

  setTimeout(() => {
    el.style.display = "none";
  }, 500);
}


const audio = document.getElementById("bgMusic");

document.addEventListener("click", () => {
    audio.volume = 0.5;
    audio.play();
}, { once: true });