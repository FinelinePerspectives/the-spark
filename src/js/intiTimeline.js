function initTimeline() {
    const currentPhase = parseInt(document.querySelector('#currentPhase').value);
    const markers = document.querySelectorAll('.timeline__marker');

    const image = document.querySelector('.timeline__image');
    image.classList.add(`p${currentPhase}`)

    let progress = 0;

    if (currentPhase === 1) progress = 12.5;
    if (currentPhase === 2) progress = 32.5;
    if (currentPhase === 3) progress = 50;
    if (currentPhase === 4) progress = 70;
    if (currentPhase === 5) progress = 90;
    if (currentPhase === 6) progress = 100;

    const progressBar = document.querySelector('#progressBar');

    function setProgress() {
        if (window.innerWidth <= 1024) {
            progressBar.style.height = `${progress}%`;
            progressBar.style.width = '20px';
        } else {
            progressBar.style.width = `${progress}%`;
            progressBar.style.height = '20px';
        }
    }

    window.addEventListener('load', () => setProgress());
    window.addEventListener('resize', () => setProgress());
    
    markers.forEach((marker, i) => i + 1 <= currentPhase && marker.classList.add('complete'));
}

export default initTimeline;