function initTimeline() {
    const completedPhases = [1, 2];
    const markers = document.querySelectorAll('.timeline__marker');
    const progress = (completedPhases.length / 6) * 100;
    const progressBar = document.querySelector('#progressBar');
    progressBar.style.width = `${progress}%`
    completedPhases.forEach((phase, i) => markers[i].classList.add('complete'));
}

export default initTimeline;