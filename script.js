(function(){
        const btn = document.getElementById('scrollTop');
        if(!btn) return;
        const showAfter = 300; // px scrolled before showing
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
    setTimeout(typeWriter, 25);
  }
}

typeWriter();
