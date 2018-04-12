// define icons
const diamond = $('.fa .fa-diamond');
const plane = $('.fa .fa-paper-plane-o');
const anchor = $('.fa .fa-anchor');
const bolt = $('.fa .fa-bolt');
const cube = $('.fa .fa-cube');
const leaf = $('.fa .fa-leaf');
const bicycle = $('.fa .fa-bicycle');
const bomb = $('.fa .fa-bomb');
let card = $('.card');
//create a list holds all icons
let cardsArray = [...card];
console.log(cardsArray);
//define new array used to put matched cards into new array
let matchedCards = [];
//define matching cards Variable
let match = $('.match');
//define matched cards to get match count
let matchCards = 0;
//define deck
const deck = $('.deck');
// define move Variable
let counter = 0;
const moves = $('#moves');
// define star icon Variable
const stars = $('.fa-star');
//define for timer function
let timer = $('#timer');
let second = 0;
let minute = 0;
let interval;
//define modal
let modal = $('#modal');
// define stars list
let starsList = $('.stars li');
// close icon for modal
let close = $('.close');
//define game end
let gameEnd = $('.popup');
//define play playAgain
let againButton = $('#play-again');

// @description: function start game will shuffle and display each card
function start() {
  cards = shuffle(cardsArray);
  // remove all default classes from each card on the deck
  for (let index in cards) {
    deck.html = ''; // empty deck
    cards.forEach(function(item) {
      deck.append(item);
    });
    matchedCards = [];
  }
  resetGame();
  startTimer();
}
//@description: reset Game function
function resetGame() {
  $(cards).removeClass('show open match disabled');
  //set/reset matchCards count
  matchCards = 0;
  //reset Moves
  counter = 0;
  moves.text(counter);
  //reset star rating
  for (let index in stars) {
    star = 3;
    stars.css('visibility', 'visible');
  }
  // set game timer / reset on reload
  second = 0;
  minute = 0;
  timer.text('0 minute 00 seconds');
  clearInterval(interval);
}
//@description: check Cards if match
function check(element) {
  // debug for more than 2 clicks
  if ($(element).hasClass('show') || $(element).hasClass('match')) {
    return true;
  }
  $(element).addClass('show open');
  matchedCards.push(element);
  let length = matchedCards.length;
  if (length === 2) {
    counter++;
    if (matchedCards[0].type === matchedCards[1].type) {
      matched();
      console.log('yeah, that was a match - keep on going :)');
    } else {
      unmatched();
      matchedCards = [];
      console.log('sorry, no match - try another pair ;)');
    }
  }
}
//for if cards matching
function matched() {
  deck.find('.open').addClass('match');
  setTimeout(function() {
    deck.find('.match').removeClass('open');
  }, 500);
  matchCards++;
  matchedCards = [];
}
//for if cards not matching
function unmatched() {
  deck.find('.open').addClass('unmatched');
  setTimeout(function() {
    deck.find('.open').removeClass('open show unmatched');
    matchedCards = [];
  }, 500);
}

//@description: the counter moves on each pair click
//@description: star rating changes deppens on moves
function moveCounter() {
  counter++;
  moves.text(counter);
  //start timer on first moves
  if (counter == 1) {
    second = 0;
    minute = 0;
    startTimer();
  }
  //star rating
  if (counter < 12) {
    star = 3;
  } else if (counter > 13 && counter < 19) {
    star = 2;
    stars.eq(2).css('visibility', 'collapse');
  } else if (counter > 20) {
    star = 1;
    stars.eq(1).css('visibility', 'collapse');
  }
}
//@description: game timer runs proper
function startTimer() {
  interval = setInterval(function() {
    timer.text(`${minute} minute ${second} seconds`);
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (second < 10) {
      second = `0${second}`;
    }
  }, 1000);
}

//@description: If player found all pairs a winner modal appears
function winner() {
  gameEnd.addClass('show');
  const timerResult = timer.text();
  $('.winner-message').html(
    `<p class="winner-title">Congrats!</p><p class="winner-text">You finished in ${timerResult}!<p class="winner-text">You needed ${counter} moves</p><p class="winner-text">For this you get ${star} stars.</p>`
  );
  clearInterval(interval);
  closeModal();
  playAgain();
}
// for the close Icon in the winner Modal
function closeModal() {
  close.click(function(e) {
    gameEnd.removeClass('show');
    start();
  });
}
// for the playAgain button in the winner modal
function playAgain() {
  againButton.click(function(e) {
    gameEnd.removeClass('show');
    start();
  });
}

// @description: shuffles cards (provided)
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//event listener
card.click(function() {
  check(this);
  moves.text(counter);
  if (matchCards == 8) {
    winner();
  }
});

start();
