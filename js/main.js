// Small UI enhancements: header pointer-follow accent and gentle hover micro-interactions
(function(){
  function clamp(v,min,max){return Math.max(min,Math.min(max,v));}

  const header = document.querySelector('header');
  if (!header) return;

  // update CSS variables on pointer move inside header
  header.addEventListener('pointermove', (e)=>{
    const rect = header.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    header.style.setProperty('--accent-x', clamp(x,0,100) + '%');
    header.style.setProperty('--accent-y', clamp(y,0,100) + '%');
  });

  // Slightly dim the accent when pointer leaves
  header.addEventListener('pointerleave', ()=>{
    header.style.setProperty('--accent-x','50%');
    header.style.setProperty('--accent-y','50%');
  });

  // Add small ripple on clickable .cta click via JS (non-intrusive)
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.cta');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = '8px';
    ripple.style.background = 'rgba(255,255,255,0.18)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%,-50%) scale(1)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'transform 520ms ease, opacity 520ms ease';
    btn.appendChild(ripple);
    requestAnimationFrame(()=>{
      ripple.style.transform = 'translate(-50%,-50%) scale(40)';
      ripple.style.opacity = '0';
    });
    setTimeout(()=>{ try{ btn.removeChild(ripple);}catch(e){} }, 600);
  });
})();
