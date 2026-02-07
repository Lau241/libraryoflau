function hideBox() {
  const el = document.getElementById("box");

  // Add fade class
  el.classList.add("fade-out");

  // Wait for animation to finish
  setTimeout(() => {
    el.style.display = "none";
  }, 500); // must match CSS duration
}
