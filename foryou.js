let slideIndex = 0;
let confettiInterval;

function openEnvelope() {
  document.querySelector(".envelope").classList.add("open");
  startSlideshow();
  startConfetti();
  setTimeout(stopConfetti, 10000);
  playMusic();
}
function startSlideshow() {
  let slides = document.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach(slide => slide.style.display = "none");
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = slides.length; }
    slides[slideIndex - 1].style.display = "block";

    if (slideIndex < slides.length) {
      setTimeout(showSlides, 2000);
    } else {
      // 🎉 Show feedback after slideshow ends
      document.querySelector(".feedback").style.display = "block";
    }
  }

  showSlides();
}


function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
  document.getElementById("confetti").appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

function startConfetti() {
  if (!confettiInterval) {
    confettiInterval = setInterval(createHeart, 300);
  }
}
function stopConfetti() {
  clearInterval(confettiInterval);
  confettiInterval = null;
}

function playMusic() {
  const audio = document.getElementById("bg-music");
  audio.volume = 0.7;
  audio.play().catch(() => console.log("Autoplay blocked"));
}
function sendFeedback(answer) {
  fetch("https://envelopeforyou-e9g3.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer })
  })
    .then(res => res.json())
    .then(data => {
      console.log("✅ Server response:", data);
      alert(data.message);
    })
    .catch(err => {
      console.error("❌ Error sending feedback:", err);
      alert("Error sending feedback.");
    });
}
