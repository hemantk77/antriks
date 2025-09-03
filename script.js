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

// Fetch and display launch data
async function loadLaunches() {
  console.log("Requesting data from the API...");
  try {
    const response = await fetch("https://ll.thespacedevs.com/2.3.0/launches/?limit=3");
    if (!response.ok) throw new Error('Network response was not ok: ' + response.status);

    const data = await response.json();
    const launches = data.results || [];

    const cards = document.querySelectorAll('.launch-card');
    if (cards.length === 0) {
      console.warn('No .launch-card elements found in the DOM.');
      return;
    }

    launches.forEach((launch, index) => {
      const card = cards[index];
      if (!card) return;

      const details = card.querySelector('.launch-details');
      if (details) {
        const titleEl = details.querySelector('h2');
        const pEls = details.querySelectorAll('p');

        if (titleEl) titleEl.textContent = launch.name || 'Unknown mission';
        if (pEls[0]) pEls[0].textContent = launch.rocket?.configuration?.name || 'Unknown rocket';
        if (pEls[1]) pEls[1].textContent = launch.net ? new Date(launch.net).toLocaleString() : 'Unknown date';
        if (pEls[2]) pEls[2].textContent = launch.pad?.location?.name || 'Unknown site';

        // Countdown
        const countdownEl = details.querySelector('.countdown');
        if (countdownEl && launch.net) {
          startCountdown(countdownEl, launch.net);
        }
      }

      // Image
      const img = card.querySelector('.hero-card-img');
      if (img) {
        img.src = launch.image || "default.jpg";
      }
    });

  } catch (error) {
    console.error("Error fetching launch data:", error);
  }
}

function startCountdown(element, launchTime) {
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = new Date(launchTime).getTime() - now;

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

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

loadLaunches();
