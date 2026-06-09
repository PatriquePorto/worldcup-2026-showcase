export function initAudio() {
  const audioToggle = document.getElementById('audioToggle');
  if (!audioToggle) return;

  const audioText = audioToggle.querySelector('.audio-text');
  const audio = new Audio('/assets/audio/stadium-roar-concert.mp3');
  audio.loop = true;
  audio.volume = 0.35;
  audio.preload = 'none';

  audioToggle.addEventListener('click', async () => {
    if (audio.paused) {
      try {
        await audio.play();
        audioToggle.classList.add('active');
        audioText.textContent = 'STADIUM SOUND: ON';
      } catch {
        audioText.textContent = 'AUDIO BLOCKED';
      }
    } else {
      audio.pause();
      audioToggle.classList.remove('active');
      audioText.textContent = 'STADIUM SOUND: OFF';
    }
  });
}
