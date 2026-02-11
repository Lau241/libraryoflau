const correctPassword = "I$<OUA23";



document.getElementById("submitBtn").addEventListener("click", () => {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    nextScene();
  } else {
    alert("Incorrect password. Try again.");
  }
});

// Optional: trigger enter key
document.getElementById("passwordInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    document.getElementById("submitBtn").click();
  }
});