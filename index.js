#!/usr/bin/env node

const readline = require("readline");
const _ = require("lodash");
const prompts = readline.createInterface(process.stdin, process.stdout);
const inputArray = [];
prompts.on("line", (response) => {
  if (response === "") {
    prompts.close();
  }
  inputArray.push(response);
});

prompts.on("close", () => {
  const hands = processHands(inputArray);
  console.log(JSON.stringify(hands));
  hands.forEach((hand) => {
    // For player 1
    console.log(hand.player1Cards)
    if (isARoyalFlush(hand.player1Cards)) {
      console.log("True");
    } else {
      console.log("False");
    }
    // Player 2
  });

});




function processHands(inputsArr) {
  return inputsArr.map((arr) => {
    const splitArr = arr.split(" ").map((element) => {
      return {
        value: element.substring(0, 1),
        suit: element.substring(1, 2),
      };
    });
    console.log(splitArr);
    const player1Cards = splitArr.slice(0, 5);
    const player2Cards = splitArr.slice(5, 10);
    console.log(player1Cards);
    console.log(player2Cards);
    return { player1Cards, player2Cards };

  });

}


//(D) diamond, (H) hearts, (S) spades. (C) clubs
const suit = {
  diamonds: "D",
  hearts: "H",
  spades: "S",
  clubs: "C",
};

const cards = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const combination = {
  highCard: 100,
  pair: 200,
  twoPairs: 400,
  threeOfAKind: 600,
  straight: 800,
  flush: 1000,
  fullHouse: 1200,
  fourOfAKind: 1400,
  straightFlush: 1600,
  royalFlush: 2000,
}

//check if same suit, then check if there's Ten, Jack, Queen, King and Ace
function isARoyalFlush(cards) {

  //counting the number of occurences for each suit
  const countingSuits = suitsCount(cards);

  //if suitCount returns 5, check the card values.
  let cardValue = [];
  cards.map(object => {
    return cardValue.push(object.value);
  })
  console.log(cardValue);
  if (Object.values(countingSuits).includes(5)) {
    let royalCards = ["T", "J", "Q", "K", "A"];

    let test = royalCards.every(item => cardValue.includes(item));
    console.log("I AM TEST", test);
    if (test === true) {
      console.log("I am True");
    } else {
      console.log("I am False");
    }

  }


}




function isStraightFlush(value) {
  //counting the number of occurences for each suit
  suitsCount(value);
  
}


//function to count the number of occurences for each suit
function suitsCount(cards) {
  return _.countBy(cards, (card) => card.suit);


}