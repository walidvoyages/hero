const progress = document.getElementById('progress');
const scenes = [...document.querySelectorAll('.scene')];

const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}, { threshold: 0.28 });
scenes.forEach(s => io.observe(s));

function updateProgress(){
  const max = document.documentElement.scrollHeight - innerHeight;
  const pct = max > 0 ? (scrollY / max) * 100 : 0;
  progress.style.width = pct + '%';
}
addEventListener('scroll', updateProgress, {passive:true});
updateProgress();

// subtle parallax on destination backgrounds
addEventListener('scroll', () => {
  document.querySelectorAll('.destination').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      const y = (r.top / innerHeight) * 18;
      el.style.backgroundPosition = `center calc(50% + ${y}px)`;
    }
  });
}, {passive:true});
