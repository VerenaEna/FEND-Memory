 // define icons
var diamond = $('.fa-diamond');
var plane = $('.fa-paper-plane-o');
var anchor = $('.fa-anchor');
var bolt = $('.fa-bolt');
var cube = $('.fa-cube');
var leaf = $('.fa-leaf');
var bicycle = $('.fa-bicycle');
var bomb = $('.fa-bomb');
//create a list holds all icons
var cardsArray = [diamond,diamond,plane,plane,anchor,anchor,bolt,bolt,cube,cube,leaf,leaf,bicycle,bicycle,bomb,bomb];
console.log(cardsArray);
//define new array used to put matched cards into new array
var matchedCards = [];
//define deck
var deck = $('.deck');
// define move Variable
var counter = 0;
var moves = $('.moves');

//@description: check Cards if match
function check(e){
  $(e).addClass('open show');
  matchedCards.push(e);
  var length = matchedCards.length;
  if(length === 2){
    if(matchedCards[0].type === matchedCards[1].type){
      matched();
      console.log(matchedCards);
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
  deck.find('.open').addClass('match');
  setTimeout(function(){
    deck.find('.match').removeClass('show open');
    matchedCards = [];
  }, 1000);
}
//for if cards not matching
function unmatched(){
  deck.find('.open').addClass('unmatched');
  //TODO: disabled();
  setTimeout(function(){
    deck.find('.unmatched').removeClass('show open unmatched');
    //TODO: enable();
    matchedCards = [];
  }, 1000);
}
//@description: the counter moves on each pair click
function moveCounter(){
  counter++;
  moves.html = counter;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


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
 $('.card').click(function(){
   check(this);
   moves.text(counter);
 });
