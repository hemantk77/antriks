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
