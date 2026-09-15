document.querySelectorAll('.view-switch').forEach(group => {
  group.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    const video = group.closest('figure').querySelector('video');
    const playing = !video.paused;
    const time = video.currentTime;
    video.pause();
    group.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    video.poster = button.dataset.poster;
    video.querySelector('source').src = button.dataset.src;
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(time, Math.max(0, video.duration - 0.05));
      if (playing) video.play().catch(() => {});
    }, {once:true});
    video.load();
  });
});
document.querySelectorAll('video').forEach(video => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach(other => { if (other !== video) other.pause(); });
  });
});
