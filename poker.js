const _ = require("lodash");

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

const processHands = (inputsArr) => {
  /**
     * user input cards, processHands will go through each card value,
     * split them by space, separate them by assigning 1st element to cardValue and second element to suitValue
     * then we split the cards by 5, 1st half belongs to player1 and the rest are for player2
     * will look like this for each player [
    { value: '2', suit: 'S' },
    { value: 'K', suit: 'D' },
    { value: 'T', suit: 'H' },
    { value: '9', suit: 'H' },
    { value: '8', suit: 'H' }
  ]
     */
  return inputsArr.map((arr) => {
    const splitArr = arr.split(" ").map((element) => {
      return {
        //split the user input (e.g. 9H) and set first string to be "value" and second string to be the "suit"
        value: element.substring(0, 1),
        suit: element.substring(1, 2),
      };
    });
    //there's always 10 cards in each data input. Here we are dividing the data to 2 groups,
    //first half belongs to player 1 and second half belongs to player 2
    const player1Cards = splitArr.slice(0, 5);
    const player2Cards = splitArr.slice(5, 10);

    return { player1Cards, player2Cards };
  });
};

const player1ScoreCard = [];
let player1Score;
const player2ScoreCard = [];
let player2Score;

const calculatePlayer1Score = (hand) => {
  let pairValue1 = findDuplicateItems(getCardEquivalent(hand.player1Cards));
  let getCardValue = getCardEquivalent(hand.player1Cards);
  let fourOfAKindCard =
    Object.keys(pairValue1)[Object.values(pairValue1).indexOf(4)];
  //from the list of duplicate items array, get the key or card value that has a value of 3
  let threeOfAKindCard =
    Object.keys(pairValue1)[Object.values(pairValue1).indexOf(3)];
  let pairCard = Object.keys(pairValue1)[Object.values(pairValue1).indexOf(2)];
  let duplicates = Object.keys(pairValue1).filter(
    (value) => pairValue1[value] === 2
  );

  if (isARoyalFlush(hand.player1Cards)) {
    player1Score = combination.isARoyalFlush;
    player1ScoreCard.push(combination.royalFlush);
  } else if (isStraightFlush(hand.player1Cards)) {
    player1Score = combination.straightFlush + isAHighCard(getCardValue);
    player1ScoreCard.push(player1Score);
  } else if (isFourOfAKind(hand.player1Cards)) {
      player1Score = combination.fourOfAKind + parseInt(fourOfAKindCard);
    player1ScoreCard.push(player1Score);
  } else if (isFullHouse(hand.player1Cards)) {
    player1Score = combination.fullHouse + parseInt(threeOfAKindCard);
    player1ScoreCard.push(player1Score);
  } else if (isAFlush(hand.player1Cards)) {
    player1Score = combination.flush + isAHighCard(getCardValue);
    player1ScoreCard.push(player1Score);
  } else if (isAStraight(hand.player1Cards)) {
    player1Score = combination.straight + isAHighCard(getCardValue);
    player1ScoreCard.push(player1Score);
  } else if (isThreeOfAKind(hand.player1Cards)) {
    player1Score = combination.threeOfAKind + parseInt(threeOfAKindCard);
    player1ScoreCard.push(player1Score);
  } else if (isTwoPairs(hand.player1Cards)) {
    player1Score =
      combination.twoPairs + parseInt(sumOfDuplicatedItems(duplicates));
    player1ScoreCard.push(player1Score);
  } else if (isAPair(hand.player1Cards)) {
    player1Score = combination.pair + parseInt(pairCard);
    player1ScoreCard.push(player1Score);
  } else {
    player1Score = isAHighCard(getCardValue);
    player1ScoreCard.push(player1Score);
  }
  return player1Score;
};

const calculatePlayer2Score = (hand) => {
  let pairValue2 = findDuplicateItems(getCardEquivalent(hand.player2Cards));
  let getCardValue = getCardEquivalent(hand.player2Cards);
  let fourOfAKindCard =
    Object.keys(pairValue2)[Object.values(pairValue2).indexOf(4)];
  //from the list of duplicate items array, get the key or card value that has a value of 3
  let threeOfAKindCard =
    Object.keys(pairValue2)[Object.values(pairValue2).indexOf(3)];
  let pairCard = Object.keys(pairValue2)[Object.values(pairValue2).indexOf(2)];
  let duplicates = Object.keys(pairValue2).filter(
    (value) => pairValue2[value] === 2
  );

  if (isARoyalFlush(hand.player2Cards)) {
    player2Score = combination.royalFlush;
    player2ScoreCard.push(combination.royalFlush);
  } else if (isStraightFlush(hand.player2Cards)) {
    player2Score = combination.straightFlush + isAHighCard(getCardValue);
    player2ScoreCard.push(player2Score);
  } else if (isFourOfAKind(hand.player2Cards)) {
    player2Score = combination.fourOfAKind + parseInt(fourOfAKindCard);
    player2ScoreCard.push(player2Score);
  } else if (isFullHouse(hand.player2Cards)) {
    player2Score = combination.fullHouse + parseInt(threeOfAKindCard);
    player2ScoreCard.push(player2Score);
  } else if (isAFlush(hand.player2Cards)) {
    player2Score = combination.flush + isAHighCard(getCardValue);
    player2ScoreCard.push(player2Score);
  } else if (isAStraight(hand.player2Cards)) {
    player2Score = combination.straight + isAHighCard(getCardValue);
    player2ScoreCard.push(player2Score);
  } else if (isThreeOfAKind(hand.player2Cards)) {
    player2Score = combination.threeOfAKind + parseInt(threeOfAKindCard);
    player2ScoreCard.push(player2Score);
  } else if (isTwoPairs(hand.player2Cards)) {
    player2Score =
      combination.twoPairs + parseInt(sumOfDuplicatedItems(duplicates));
    player2ScoreCard.push(player2Score);
  } else if (isAPair(hand.player2Cards)) {
    player2Score = combination.pair + parseInt(pairCard);
    player2ScoreCard.push(player2Score);
  } else {
    player2Score = isAHighCard(getCardValue);
    player2ScoreCard.push(player2Score);
  }
  return player2Score;
};

const isARoyalFlush = (cards) => {
  /**
   * Ten, Jack, Queen, King and Ace in the same suit
   */

  //check the cards on hand is same as royalCards
  let royalCards = ["T", "J", "Q", "K", "A"];
  let getCards = getCardValues(cards);
  let checkCardValues = royalCards.every((item) => getCards.includes(item));

  //if suitsCount = 5 and cards on Hand = royalCards, then it is a royal flush
  if (isAFlush(cards) && checkCardValues === true) {
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

  //check if one of the card values count up to 4
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

  //check if one of the card values count up to 3 and the rest of the cards is a pair
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

  //find the highest number within the card array and declare the highest card
  return cards.reduce((a, b) => {
    return Math.max(a, b);
  });
};

//find the next highest value in the card array
const nextHighestCard = (cards) => {
  let highestNum = isAHighCard(cards);
  let nextHighestNumArr = cards.filter((value) => {
    return value !== highestNum;
  });
  let nextHighestNum = isAHighCard(nextHighestNumArr);

  return nextHighestNum;
};

//find the third highest value in the card array
const thirdHighestCard = (cards) => {
  let highestNum = isAHighCard(cards);
  let nextHighestNum = nextHighestCard(cards);
  let thirdHighestNumArr = cards.filter((value) => {
    return value !== highestNum && value !== nextHighestNum;
  });
  let thirdHighestNum = isAHighCard(thirdHighestNumArr);
  return thirdHighestNum;
};

//find the fourth highest value in the card array
const fourthHighestCard = (cards) => {
  let highestNum = isAHighCard(cards);
  let nextHighestNum = nextHighestCard(cards);
  let thirdHighestNum = thirdHighestCard(cards);
  let fourthHighestNumArr = cards.filter((value) => {
    return (
      value !== highestNum &&
      value !== nextHighestNum &&
      value !== thirdHighestNum
    );
  });
  let fourthHighestNum = isAHighCard(fourthHighestNumArr);
  return fourthHighestNum;
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

//function to sort the cards array in ascending order
const sortCards = (cards) => {
  return getCardEquivalent(cards).sort((a, b) => {
    return a - b;
  });
};

//function to check if cards are in consecutive order
const checkCardsIfConsecutiveOrder = (cards) => {
  //first, we get the array of card values then sort them
  //e.g.[ 3, 7, 8, 9, 9 ]
  let sortedCards = sortCards(cards);

  //second, we map through the sorted cards array and starting from index 1 (2nd item),
  //we get the difference of the 2nd item and the first item and return the value to the new array
  //e.g. [ 4, 1, 1, 0 ]
  let newArray = sortedCards.slice(1).map((item, index) => {
    let newItem = item - sortedCards[index];
    if (newItem === 1) {
      return 1;
    } else {
      return newItem;
    }
  });

  //check that the elements in an array are all 1
  //if all elements are 1, it means they are in consecutive order,
  //in our e.g. it is FALSE
  return newArray.every((value) => {
    return value === newArray[0];
  });
};

//function to find the duplicate values in the cards array
const findDuplicateItems = (cards) => {
  
  const pairCount = _.countBy(cards, (value) => value);

  return pairCount;
  //   return cards.filter((item, index) => cards.indexOf(item) !== index);
};

const sumOfDuplicatedItems = (cards) => {
  //converts the string array to integers
  let convertToInt = cards.map((elements) => parseInt(elements));
  //calculate the sum of the int array
  let sum = convertToInt.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    0
  );

  return sum;
};

module.exports = {
  processHands,
  calculatePlayer1Score,
  calculatePlayer2Score,
  getCardEquivalent,
  nextHighestCard,
  thirdHighestCard,
  fourthHighestCard,
  suitsCount,
  cardCount,
  getCardValues,
  sortCards,
  checkCardsIfConsecutiveOrder,
  findDuplicateItems,
};
