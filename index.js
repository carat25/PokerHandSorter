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
  // console.log(JSON.stringify(hands));
  hands.map((hand) => {
    // For player 1
    // console.log(hand.player1Cards)
    const player1ScoreCard = [];
    const player2ScoreCard = [];
    if (isARoyalFlush(hand.player1Cards)) {
      // player1ScoreCard.push(combination.royalFlush);
      // console.log(player1ScoreCard);
      console.log("Player 1 has a royal flush");
    } else if (isStraightFlush(hand.player1Cards)) {
      console.log("Player 1 has Straight Flush");
    } else if (isFourOfAKind(hand.player1Cards)) {
      console.log("Player 1 has four of a kind");
    } else if (isFullHouse(hand.player1Cards)) {
      console.log("Player 1 has a full house");
    } else if (isAFlush(hand.player1Cards)) {
      console.log("Player 1 has a flush");
    } else if (isAStraight(hand.player1Cards)) {
      console.log("Player 1 has a straight");
    } else if (isThreeOfAKind(hand.player1Cards)) {
      console.log("Player 1 has three of a kind");
    } else if (isTwoPairs(hand.player1Cards)) {
      console.log("Player 1 has two pairs");
    } else if (isAPair(hand.player1Cards)) {
      console.log("Player 1 has a pair");
    } else if (isAHighCard(hand.player1Cards)) {
      console.log("Player 1 has a high Card");
    }
  });
});



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

  if (isAFlush(cards) && checkCardsIfConsecutiveOrder(cards).includes(true)) {
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

  const pairCount = _.countBy(getValues, (y) => y);
  console.log(pairCount);
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

  return Math.max(getCardEquivalent(cards));
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

  return handValues.map((value) => {
    const numValue = listOfCards[value];
    return numValue;
  });
};

const sortCards = (cards) => {
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
      return true;
    } else {
      return false;
    }
  });

  //check that the elements in an array are equal
  return newArray.every((value) => {
    return value === newArray[0];
  });
};

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
