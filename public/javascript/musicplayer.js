const player = document.getElementById('player');
let state = {
  playing: false,
};

player.addEventListener('click', () => {
  if (state.playing) {
    player.innerHTML = '<i class= "fa fa-play"></i>Play';
    sound.pause();
    state.playing = false;
    return;
  }
  console.log(state.playing);
  if (!state.playing) {
    player.innerHTML = '<i class= "fa fa-pause"></i>Pause';
    sound.play();
    state.playing = true;
    return;
  }
});
