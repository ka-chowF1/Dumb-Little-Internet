const moveButtons = [...document.querySelectorAll('[data-move]')];
const player = document.querySelector('#player-hand');
const opponent = document.querySelector('#opponent-hand');
const gunCallout = document.querySelector('#gun-callout');
const play = document.querySelector('#play');
const result = document.querySelector('#result');
const countdown = document.querySelector('#countdown');
const stage = document.querySelector('.stage');
const bazookaMove = document.querySelector('#bazooka-move');
const secret = document.querySelector('#secret');
const playerHTML = player.innerHTML;
let unlocked = false;
let selected = 'rock';
let phase = 'ready';
const shapes = { rock: 'fist', paper: 'paper', scissors: 'scissors' };
function resetRound() {
  phase = 'ready';
  opponent.className = 'hand fist';
  gunCallout?.classList.remove('visible');
  opponent.setAttribute('aria-label', 'Opponent hand: closed fist');
  countdown.textContent = 'VS';
  result.className = '';
  result.textContent = 'Pick your move. No pressure.';
  play.textContent = 'Play ↗';
  moveButtons.forEach(button => { button.disabled = false; });
}
moveButtons.forEach(button => button.addEventListener('click', () => {
  if (phase !== 'ready') return;
  selected = button.dataset.move;
  if (selected === 'bazooka') {
    player.innerHTML = '<img class="held-bazooka" src="bazooka.png" alt="">';
    player.className = 'hand bazooka-hand';
  } else {
    player.innerHTML = playerHTML;
    player.className = `hand ${shapes[selected]}`;
  }
  player.setAttribute('aria-label', `Your hand: ${selected}`);
  document.querySelector('#move-label').textContent = `/ ${selected.toUpperCase()}`;
  moveButtons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
}));
play.addEventListener('click', () => {
  if (phase === 'finished') { resetRound(); return; }
  if (phase !== 'ready') return;
  phase = 'countdown';
  moveButtons.forEach(button => { button.disabled = true; });
  play.disabled = true;
  play.textContent = 'Here we go…';
  result.textContent = 'Rock. Paper. Scissors.';
  stage.classList.add('shaking');
  countdown.textContent = '3';
  setTimeout(() => { countdown.textContent = '2'; }, 500);
  setTimeout(() => { countdown.textContent = '1'; }, 1000);
  setTimeout(() => {
    phase = 'reveal';
    stage.classList.remove('shaking');
    countdown.textContent = '!';
    opponent.className = 'hand finger-gun';
    gunCallout?.classList.add('visible');
    opponent.setAttribute('aria-label', 'Opponent hand: finger gun');
    result.textContent = '';
  }, 1500);
  setTimeout(() => {
    phase = 'finished';
    result.textContent = selected === 'bazooka' ? 'BAZOOKA! You win.' : 'You lose!  Skill issue.';
    result.className = 'punchline';
    play.textContent = 'Play Again ↗';
    play.disabled = false;
    if (!unlocked) secret.hidden = false;
  }, 1900);
});

// The shiny thing: click it to add the Bazooka to your choices.
secret.addEventListener('click', () => {
  if (unlocked) return;
  unlocked = true;
  bazookaMove.hidden = false;
  secret.hidden = true;
  if (phase === 'ready') result.textContent = 'Bazooka acquired. Legally questionable.';
});
