(async function(){
  const btn = document.getElementById('scrollTop');
  if(!btn) return;
  const showAfter = 300;
  window.addEventListener('scroll', () => {
    if (window.scrollY > showAfter) btn.classList.add('show');
    else btn.classList.remove('show');
  }, { passive: true });

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

const text = "Humanity's gaze has always been fixed on the cosmos, dreaming of the worlds beyond our own. Today, that dream unfolds in real-time with every launch that lights up the sky. Antriks is your front-row seat to this grand endeavor, charting the missions that define our future. Witness the next chapter begin.";
const typingE1 = document.getElementById("typing");

let i = 0;
function typeWriter() {
  if (i < text.length) {
    typingE1.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 10);
  }
}
typeWriter();


document.addEventListener("DOMContentLoaded", () => {
  const countdownElements = document.querySelectorAll(".countdown");
  
  countdownElements.forEach(element => {
    const launchTime = element.getAttribute("data-launch-time");
    if (launchTime) {
      startCountdown(element, launchTime);
    } else {
      element.textContent = "Time TBD";
    }
  });
});

function startCountdown(element, launchTime) {
  const launchDate = new Date(launchTime).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance < 0) {
      element.textContent = "Launched!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    element.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  updateCountdown(); // Run once immediately
  setInterval(updateCountdown, 1000); // Update every second
}