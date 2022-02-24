const _ = require("lodash");
const { listOfCards, combination } = require("./structure");

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
    const cardDelimiter = " ";
    //split the user input (e.g. 9H) and set first string to be "value" and second string to be the "suit"
    const splitArr = arr.split(cardDelimiter).map((element) => {
      const [value, suit] = element.split("");
      return { value, suit };
    });
    //there's always 10 cards in each data input. Here we are dividing the data to 2 groups,
    //first half belongs to player 1 and second half belongs to player 2
    const player1Cards = splitArr.slice(0, 5);
    const player2Cards = splitArr.slice(5, 10);

    return { player1Cards, player2Cards };
  });
};

const playerScoreCard = [];
let playerScore;

const calculatePlayerScore = (cards) => {
  let pairValue = findDuplicateItems(getCardEquivalent(cards));
  let getCardValue = getCardEquivalent(cards);
  let fourOfAKindCard =
    Object.keys(pairValue)[Object.values(pairValue).indexOf(4)];
  //from the list of duplicate items array, get the key or card value that has a value of 3
  let threeOfAKindCard =
    Object.keys(pairValue)[Object.values(pairValue).indexOf(3)];
  let pairCard = Object.keys(pairValue)[Object.values(pairValue).indexOf(2)];
  let duplicates = Object.keys(pairValue).filter(
    (value) => pairValue[value] === 2
  );

  if (isARoyalFlush(cards)) {
    playerScore = combination.isARoyalFlush;
    playerScoreCard.push(combination.royalFlush);
  } else if (isStraightFlush(cards)) {
    playerScore = combination.straightFlush + isAHighCard(getCardValue);
    playerScoreCard.push(playerScore);
  } else if (isFourOfAKind(cards)) {
    playerScore = combination.fourOfAKind + parseInt(fourOfAKindCard);
    playerScoreCard.push(playerScore);
  } else if (isFullHouse(cards)) {
    playerScore = combination.fullHouse + parseInt(threeOfAKindCard);
    playerScoreCard.push(playerScore);
  } else if (isAFlush(cards)) {
    playerScore = combination.flush + isAHighCard(getCardValue);
    playerScoreCard.push(playerScore);
  } else if (isAStraight(cards)) {
    playerScore = combination.straight + isAHighCard(getCardValue);
    playerScoreCard.push(playerScore);
  } else if (isThreeOfAKind(cards)) {
    playerScore = combination.threeOfAKind + parseInt(threeOfAKindCard);
    playerScoreCard.push(playerScore);
  } else if (isTwoPairs(cards)) {
    playerScore =
      combination.twoPairs + parseInt(sumOfDuplicatedItems(duplicates));
    playerScoreCard.push(playerScore);
  } else if (isAPair(cards)) {
    playerScore = combination.pair + parseInt(pairCard);
    playerScoreCard.push(playerScore);
  } else {
    playerScore = isAHighCard(getCardValue);
    playerScoreCard.push(playerScore);
  }
  console.log(playerScore);
  return playerScore;
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
  return isAFlush(cards) && checkCardValues === true;
};

const isStraightFlush = (cards) => {
  /**
   * All five cards in consecutive value order, with the same suit
   */

  return isAFlush(cards) && checkCardsIfConsecutiveOrder(cards) === true;
};

const isFourOfAKind = (cards) => {
  /**
   * Four cards of same value
   */

  //counting the number of occurences for each card value
  const fourCount = cardCount(cards);

  //check if one of the card values count up to 4

  return Object.values(fourCount).includes(4);
};

const isFullHouse = (cards) => {
  /**
   * Three of a kind and a Pair
   */

  //check if one of the card values count up to 3 and the rest of the cards is a pair
  return isThreeOfAKind(cards) && isAPair(cards);
};

const isAFlush = (cards) => {
  /**
   * All five cards having the same suit
   */

  const fiveSuits = suitsCount(cards);

  return Object.values(fiveSuits).includes(5);
};

const isAStraight = (cards) => {
  /**
   * All five cards in consecutive value order
   */

  return checkCardsIfConsecutiveOrder(cards) === true;
};

const isThreeOfAKind = (cards) => {
  /**
   * Three cards of the same value
   */

  const threeCount = cardCount(cards);

  return Object.values(threeCount).includes(3);
};

const isTwoPairs = (cards) => {
  /**
   * Two different pairs
   */

  const cardNum = cardCount(cards);

  const getValues = Object.values(cardNum);

  const pairCount = _.countBy(getValues, (value) => value);

  return Object.values(pairCount).includes(2);
};

const isAPair = (cards) => {
  /**
   * Two cards of the same value
   */

  const pairCount = cardCount(cards);
  //if pairCount = 2, then declare a pair
  return Object.values(pairCount).includes(2);
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
  calculatePlayerScore,
  isARoyalFlush,
  isStraightFlush,
  isFourOfAKind,
  isFullHouse,
  isAFlush,
  isAStraight,
  isThreeOfAKind,
  isTwoPairs,
  isAPair,
  isAHighCard,
  nextHighestCard,
  thirdHighestCard,
  fourthHighestCard,
  suitsCount,
  cardCount,
  getCardValues,
  getCardEquivalent,
  sortCards,
  checkCardsIfConsecutiveOrder,
  findDuplicateItems,
  sumOfDuplicatedItems,
};
