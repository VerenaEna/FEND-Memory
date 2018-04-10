// define icons
const diamond = $('.fa .fa-diamond');
const plane = $('.fa .fa-paper-plane-o');
const anchor = $('.fa .fa-anchor');
const bolt = $('.fa .fa-bolt');
const cube = $('.fa .fa-cube');
const leaf = $('.fa .fa-leaf');
const bicycle = $('.fa .fa-bicycle');
const bomb = $('.fa .fa-bomb');
const card = $('.card');
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
let millisec = 0;
let second = 0;
let minute = 0;
var interval;
//define modal
let modal = $('#modal');
// define stars list
let starsList = $('.stars li')
// close icon for modal
let close = $(".close");
//define game end
let gameEnd = $('.popup');
//define play playAgain
let againButton = $('#play-again');


  // @description: function start game will shuffle and display each card
  function start(){
    cards = shuffle(cardsArray);
     // remove all default classes from each card on the deck
     for (let index in cards){
       deck.html = ''; // empty deck
       cards.forEach(function(item){
         deck.append(item);
       });
       $(cards).removeClass('show open match disabled');
     }
     resetGame();
  }
  //@description: reset Game function
  function resetGame(){
    //set/reset matchCards count
    matchCards = 0;
    //reset Moves
    counter = 0;
    moves.text(counter);
    //reset star rating
    for(let index in stars){
      star = 3;
      stars.css('visibility', 'visible');
    };
    // set game timer / reset on reload
    second = 0;
    minute = 0;
    timer.text('0 minute 00 seconds');
    clearInterval(interval);
  }

  //@description: check Cards if match
  function check(type){
    $(type).addClass('open show');
    matchedCards.push(type);
    let length = matchedCards.length;
    if(length === 2){
      if(matchedCards[0].type === matchedCards[1].type){
        matched();
        matchCards++;
        console.log(type);
        console.log('yeah, that was a match - keep on going :)');
      } else {
        unmatched();
        console.log('sorry, no match - try another pair ;)');
      }
      moveCounter();
    }
  }
  //for if cards matching
  function matched(){
    deck.find('.open').addClass('match disabled');
    deck.find('.match').removeClass('show open');
    disabled();
    matchedCards = [];
  }
  //for if cards not matching
  function unmatched(){
    deck.find('.open').addClass('unmatched');
    disabled();
    setTimeout(function(){
      deck.find('.unmatched').removeClass('show open unmatched');
      enable();
      matchedCards = [];
    }, 500);
  }
  //disable cards temporarly
  function disabled(){
    deck.find('.match').addClass('disabled');
    deck.find('.unmatched').addClass('disabled');
  }
  //enable cards and disable matched cards
  function enable(){
    deck.find('.disabled').removeClass('disabled');
    for(let index of match){
      match.forEach(function(){
        deck.find('.unmatched').addClass('disabled');
      })
    };
  };
  //@description: the counter moves on each pair click
  //@description: star rating changes deppens on moves
  function moveCounter(){
    counter++;
    moves.text(counter);
    //start timer on first moves
    if(counter == 1){
      millisec = 0;
      second = 0;
      minute = 0;
      startTimer();
    }
    //star rating
    if (counter < 15 ){
      star = 3;
    } else if (counter > 16 && counter < 21){
      star = 2;
      stars.eq(2).css("visibility","collapse");
    } else if (counter > 22){
      star = 1
      stars.eq(1).css("visibility","collapse");
    }
  }
  //@description: game timer runs proper
  function startTimer(){
    interval = setInterval(function(){
      timer.text(`${minute} minute ${second} seconds`);
      second++;
      if(second == 60){
        minute++;
        second = 0;
      }
      if(second < 10){
        second = `0${second}`;
      }
    }, 1000);
  }

  //@description: If player found all pairs a winner modal appears
  function winner(){
    gameEnd.addClass('show');
    const timerResult = timer.text();
    let winnerMessage = $('.winner-message');
    let starsIcon = starsList.html();
    winnerMessage.html(`<p class="winner-title">Congrats!</p><p class="winner-text">You finished in ${timerResult}!<p class="winner-text">You needed ${counter} moves</p><p class="winner-text">For this you get ${star} ${starsIcon}</p>`);
    clearInterval(interval);
    closeModal();
    playAgain();
  }

  function closeModal(){
    close.click(function(e){
      gameEnd.removeClass("show");
      start();
    });
  }

  function playAgain(){
    againButton.click(function(){
      gameEnd.removeClass('show');
      start();
  })
};


  /*
  * Display the cards on the page
  *   - shuffle the list of cards using the provided "shuffle" method below
  *   - loop through each card and create its HTML
  *   - add each card's HTML to the page
  */

  // @description: shuffles cards (provided)
  // Shuffle function from http://stackoverflow.com/a/2450976
  function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;
     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }
     return array;
  }

  /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */

  //event listener
  card.click(function(){
    check(this);
    moves.text(counter);
    if(matchCards === 8){
      winner();
    }
  })
start();
