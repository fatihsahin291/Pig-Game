'use strict';

// Selecting elements
const plyer0El = document.querySelector('.player--0');
const plyer1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const switcPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer === 0 ? 1 : 0;
  plyer0El.classList.toggle('player--active');
  plyer1El.classList.toggle('player--active');
};

let scores, currentScore, activeplayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  plyer0El.classList.remove('player--winner');
  plyer1El.classList.remove('player--winner');
  plyer0El.classList.add('player--active');
  plyer1El.classList.remove('player--active');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);
    //3.Check for rolled 1:if true, switch to the next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;

      //current0El.textContent = currentScore; //CHANGE LATER
    } else if (dice === 1) {
      //switch to the next player
      switcPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add current score to active players's score
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];

    //2.Check if player's score is >= 100
    if (scores[activeplayer] >= 100) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switcPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
