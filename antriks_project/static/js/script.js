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
      const cached = localStorage.getItem("launchData");
      if (cached) {
        console.log("✅ Using cached data");
        displayLaunches(JSON.parse(cached));
        return;
      }

      try {
        const response = await fetch("https://ll.thespacedevs.com/2.3.0/launches/upcoming/?limit=3");
        if (!response.ok) throw new Error("Network response was not ok: " + response.status);

        const data = await response.json();
        localStorage.setItem("launchData", JSON.stringify(data)); // cache the data
        displayLaunches(data);

      } catch (error) {
        console.error("Error fetching launch data:", error);
      }
    }

    function displayLaunches(data) {
      const launches = data.results || [];
      const cards = document.querySelectorAll(".launch-card");

      launches.forEach((launch, index) => {
        const card = cards[index];
        if (!card) return;

        const details = card.querySelector(".launch-details");
        const pEls = details.querySelectorAll("p");
        const titleEl = details.querySelector("h2");

        if (titleEl) titleEl.textContent = launch.name || "Unknown mission";
        if (pEls[0]) pEls[0].textContent = launch.rocket?.configuration?.name || "Unknown rocket";
        if (pEls[1]) pEls[1].textContent = launch.net ? new Date(launch.net).toLocaleString() : "Unknown date";
        if (pEls[2]) pEls[2].textContent = launch.pad?.location?.name || "Unknown site";

        const countdownEl = details.querySelector(".countdown");
        if (countdownEl && launch.net) {
          startCountdown(countdownEl, launch.net);
        }

        const img = card.querySelector(".hero-card-img");

if (img) {
  console.log("Launch image field:", launch.image);
  console.log("Full launch object:", launch);

  img.src =
    (launch.image && String(launch.image)) ||
    launch.rocket?.configuration?.image_url ||
    "sc1.jpg";
}

      });
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

    // Run after page loads
    document.addEventListener("DOMContentLoaded", loadLaunches);