#!/usr/bin/env node

const readline = require("readline");
const _ = require("lodash");
const {test} = require("./poker")

//this checks the user input, if the input is empty or "", 
//it then calls the close function which proceeds checking the user inputs
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
  let player1WinCount = [];
  let player2WinCount = [];

  hands.map((hand) => {
    
      if (calculatePlayer1Score(hand) > calculatePlayer2Score(hand)) {
        console.log("Player 1 wins!");
        player1WinCount.push(1);
        player2WinCount.push(0);
      } else {
        console.log("Player 2 wins!");
        player2WinCount.push(1);
        player1WinCount.push(0);
      }
    
    console.log("player 1:", player1WinCount);
    console.log("player 2:" ,player2WinCount);

    
    const player1NumWins = player1WinCount.filter((x) => { return x === 1 }).length;
    const player2NumWins = player2WinCount.filter((value) => { return value === 1 }).length;

    console.log(`Player 1: ${player1NumWins} hands`);
    console.log (`Player 2: ${player2NumWins} hands`);
    
 
  });
});

const listOfCards = {
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
};

const player1ScoreCard = [];
let player1Score;
const player2ScoreCard = [];
let player2Score;

const calculatePlayer1Score = (hand) => {

  if (isARoyalFlush(hand.player1Cards)) {
    player1Score = combination.isARoyalFlush;
    player1ScoreCard.push(combination.royalFlush);
    console.log("Player 1 has a royal flush");
  } else if (isStraightFlush(hand.player1Cards)) {
    player1Score = combination.straightFlush;
    player1ScoreCard.push(combination.straightFlush);
    console.log("Player 1 has Straight Flush");
  } else if (isFourOfAKind(hand.player1Cards)) {
    player1Score = combination.fourOfAKind;
    player1ScoreCard.push(combination.fourOfAKind);
    console.log("Player 1 has four of a kind");
  } else if (isFullHouse(hand.player1Cards)) {
    player1Score = combination.fullHouse;
    player1ScoreCard.push(combination.fullHouse);
    console.log("Player 1 has a full house");
  } else if (isAFlush(hand.player1Cards)) {
    player1Score = combination.flush;
    player1ScoreCard.push(combination.flush);
    console.log("Player 1 has a flush");
  } else if (isAStraight(hand.player1Cards)) {
    player1Score = combination.straight;
    player1ScoreCard.push(combination.straight);
    console.log("Player 1 has a straight");
  } else if (isThreeOfAKind(hand.player1Cards)) {
    player1Score = combination.threeOfAKind;
    player1ScoreCard.push(combination.threeOfAKind);
    console.log("Player 1 has three of a kind");
  } else if (isTwoPairs(hand.player1Cards)) {
    player1Score = combination.twoPairs;
    player1ScoreCard.push(combination.twoPairs);
    console.log("Player 1 has two pairs");
  } else if (isAPair(hand.player1Cards)) {
    player1Score = combination.pair;
    player1ScoreCard.push(combination.pair);
    console.log("Player 1 has a pair");
  } else {
    let getCardValue = getCardEquivalent(hand.player1Cards);
    player1Score = isAHighCard(getCardValue);
    player1ScoreCard.push(isAHighCard(getCardValue));
    console.log("Player 1 has a high Card");
  }
  return player1Score;
};


const calculatePlayer2Score = (hand) => { 
  if (isARoyalFlush(hand.player2Cards)) {
    player2Score = combination.royalFlush;
    player2ScoreCard.push(combination.royalFlush);
    console.log("Player 2 has a royal flush");
  } else if (isStraightFlush(hand.player2Cards)) {
    player2Score = combination.straightFlush;
    player2ScoreCard.push(combination.straightFlush);
    console.log("Player 2 has Straight Flush");
  } else if (isFourOfAKind(hand.player2Cards)) {
    player2Score = combination.fourOfAKind;
    player2ScoreCard.push(combination.fourOfAKind);
    console.log("Player 2 has four of a kind");
  } else if (isFullHouse(hand.player2Cards)) {
    player2Score = combination.fullHouse;
    player2ScoreCard.push(combination.fullHouse);
    console.log("Player 2 has a full house");
  } else if (isAFlush(hand.player2Cards)) {
    player2Score = combination.flush;
    player2ScoreCard.push(combination.flush);
    console.log("Player 2 has a flush");
  } else if (isAStraight(hand.player2Cards)) {
    player2Score = combination.straight;
    player2ScoreCard.push(combination.straight);
    console.log("Player 2 has a straight");
  } else if (isThreeOfAKind(hand.player2Cards)) {
    player2Score = combination.threeOfAKind;
    player2ScoreCard.push(combination.threeOfAKind);
    console.log("Player 2 has three of a kind");
  } else if (isTwoPairs(hand.player2Cards)) {
    player2Score = combination.twoPairs;
    player2ScoreCard.push(combination.twoPairs);
    console.log("Player 2 has two pairs");
  } else if (isAPair(hand.player2Cards)) {
    player2Score = combination.pair;
    player2ScoreCard.push(combination.pair);
    console.log("Player 2 has a pair");
  } else {
    let getCardValue = getCardEquivalent(hand.player2Cards);
    player2Score = isAHighCard(getCardValue);
    player2ScoreCard.push(isAHighCard(getCardValue));
    console.log("Player 2 has a high Card");
  }
  return player2Score;
}

const processHands = (inputsArr) => {
  /**
   * user input cards, processHands will go through each card value,
   * split them by space, separate them by assigning 1st element to cardValue and second element to suitValue
   * then we split the cards by 5, 1st half belongs to player1 and the rest are for player2
   */
  return inputsArr.map((arr) => {
    const splitArr = arr.split(" ").map((element) => {
      return {
        value: element.substring(0, 1),
        suit: element.substring(1, 2),
      };
    });
    // console.log(splitArr);
    const player1Cards = splitArr.slice(0, 5);
    const player2Cards = splitArr.slice(5, 10);
    console.log(player1Cards);
    console.log(player2Cards);
    return { player1Cards, player2Cards };
  });
};

const isARoyalFlush = (cards) => {
  /**
   * Ten, Jack, Queen, King and Ace in the same suit
   */

  //check the cards on hand is same as royalCards
  let royalCards = ["T", "J", "Q", "K", "A"];
  let checkCardValues = getCardValues(cards);
  let test = royalCards.every((item) => checkCardValues.includes(item));

  //if suitsCount = 5 and cards on Hand = royalCards, then it is a royal flush
  if (isAFlush(cards) && test === true) {
    return true;
  } else {
    return false;
  }
};

const isStraightFlush = (cards) => {
  /**
   * All five cards in consecutive value order, with the same suit
   */

  if (isAFlush(cards) && checkCardsIfConsecutiveOrder(cards) === true) {
    return true;
  } else {
    return false;
  }
};

const isFourOfAKind = (cards) => {
  /**
   * Four cards of same value
   */

  //counting the number of occurences for each card value
  const fourCount = cardCount(cards);

  if (Object.values(fourCount).includes(4)) {
    return true;
  } else {
    return false;
  }
};

const isFullHouse = (cards) => {
  /**
   * Three of a kind and a Pair
   */

  if (isThreeOfAKind(cards) && isAPair(cards)) {
    return true;
  } else {
    return false;
  }
};

const isAFlush = (cards) => {
  /**
   * All five cards having the same suit
   */

  const fiveSuits = suitsCount(cards);

  if (Object.values(fiveSuits).includes(5)) {
    return true;
  } else {
    return false;
  }
};

const isAStraight = (cards) => {
  /**
   * All five cards in consecutive value order
   */
  console.log(checkCardsIfConsecutiveOrder(cards));
  if (checkCardsIfConsecutiveOrder(cards) === true) {
    return true;
  } else {
    return false;
  }
};

const isThreeOfAKind = (cards) => {
  /**
   * Three cards of the same value
   */

  const threeCount = cardCount(cards);

  if (Object.values(threeCount).includes(3)) {
    return true;
  } else {
    return false;
  }
};

const isTwoPairs = (cards) => {
  /**
   * Two different pairs
   */

  const cardNum = cardCount(cards);

  const getValues = Object.values(cardNum);

  const pairCount = _.countBy(getValues, (value) => value);
  
  if (Object.values(pairCount).includes(2)) {
    return true;
  } else {
    return false;
  }
};

const isAPair = (cards) => {
  /**
   * Two cards of the same value
   */

  const pairCount = cardCount(cards);
  //if pairCount = 2, then declare a pair
  if (Object.values(pairCount).includes(2)) {
    return true;
  } else {
    return false;
  }
};

const isAHighCard = (cards) => {
  /**
   * Highest value card
   */
  return cards.reduce((a, b) => {
    return Math.max(a, b);
  }, -Infinity);
  
};

//function to count the number of occurences for each suit
const suitsCount = (cards) => {
  return _.countBy(cards, (card) => card.suit);
};

//function to count the number of occurences for each card
const cardCount = (cards) => {
  return _.countBy(cards, (value) => value.value);
};

//function to capture the card values and push them into an array of card values
const getCardValues = (cards) => {
  let cardValue = [];
  cards.map((object) => {
    return cardValue.push(object.value);
  });
  return cardValue;
};

//function to get the euivalent value of the cards on hand from the listOfCards
const getCardEquivalent = (cards) => {
  const handValues = getCardValues(cards);
  console.log(cards);
  console.log(handValues);
  return handValues.map((value) => {
    const numValue = listOfCards[value];
    return numValue;
  });
};

const sortCards = (cards) => {
  console.log(cards);
  return getCardEquivalent(cards).sort((a, b) => {
    return a - b;
  });
};

const checkCardsIfConsecutiveOrder = (cards) => {
  let sortedCards = sortCards(cards);

  //calculate the difference of the elements in an array and replace with true/false
  let newArray = sortedCards.slice(1).map((item, index) => {
    let newItem = item - sortedCards[index];
    if (newItem === 1) {
      return 1;
    } else {
      return newItem;
    }
  });
  console.log(newArray);
  //check that the elements in an array are equal
  return newArray.every((value) => {
    return value === newArray[0];
  });
};


