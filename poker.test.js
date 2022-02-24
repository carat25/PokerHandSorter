import { expect, it } from "@jest/globals";

const {
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
} = require("./poker");

describe("Calculate player score", () => {
  it("Cards is a royal flush", () => {
    const input = [
      { value: "T", suit: "D" },
      { value: "J", suit: "D" },
      { value: "Q", suit: "D" },
      { value: "K", suit: "D" },
      { value: "A", suit: "D" },
    ];
    expect(isARoyalFlush(input)).toEqual(true);
  });
});

describe("Check if cards is a royal flush", () => {
  it("Cards is a royal flush", () => {
    const input = [
      { value: "T", suit: "D" },
      { value: "J", suit: "D" },
      { value: "Q", suit: "D" },
      { value: "K", suit: "D" },
      { value: "A", suit: "D" },
    ];
    expect(isARoyalFlush(input)).toEqual(true);
  });
  it("Cards is NOT a royal flush because one has a different suit", () => {
    const input = [
      { value: "T", suit: "C" },
      { value: "J", suit: "C" },
      { value: "Q", suit: "H" },
      { value: "K", suit: "C" },
      { value: "A", suit: "C" },
    ];
    expect(isARoyalFlush(input)).toEqual(false);
  });
  it("Cards is NOT a royal flush because two don't have the right card value", () => {
    const input = [
      { value: "9", suit: "S" },
      { value: "2", suit: "S" },
      { value: "Q", suit: "S" },
      { value: "K", suit: "S" },
      { value: "A", suit: "S" },
    ];
    expect(isARoyalFlush(input)).toEqual(false);
  });
});

describe("Check if cards is a straight flush", () => {
  it("Cards is a straight flush", () => {
    const input = [
      { value: "2", suit: "H" },
      { value: "3", suit: "H" },
      { value: "4", suit: "H" },
      { value: "5", suit: "H" },
      { value: "6", suit: "H" },
    ];
    expect(isStraightFlush(input)).toEqual(true);
  });
  it("Cards is NOT a straight flush because one has a different suit", () => {
    const input = [
      { value: "5", suit: "H" },
      { value: "6", suit: "H" },
      { value: "7", suit: "C" },
      { value: "8", suit: "H" },
      { value: "9", suit: "H" },
    ];
    expect(isStraightFlush(input)).toEqual(false);
  });
  it("Cards is NOT a straight flush because card values are not in consecutive order", () => {
    const input = [
      { value: "9", suit: "C" },
      { value: "T", suit: "C" },
      { value: "Q", suit: "C" },
      { value: "K", suit: "C" },
      { value: "A", suit: "C" },
    ];
    expect(isStraightFlush(input)).toEqual(false);
  });
});

describe("Check if cards is a four of a kind", () => {
  it("Cards is a four of a kind", () => {
    const input = [
      { value: "9", suit: "C" },
      { value: "8", suit: "H" },
      { value: "8", suit: "D" },
      { value: "8", suit: "C" },
      { value: "8", suit: "S" },
    ];
    expect(isFourOfAKind(input)).toEqual(true);
  });
  it("Cards is NOT a four of a kind because there are no four cards of same value", () => {
    const input = [
      { value: "2", suit: "H" },
      { value: "2", suit: "D" },
      { value: "3", suit: "S" },
      { value: "2", suit: "C" },
      { value: "9", suit: "H" },
    ];
    expect(isFourOfAKind(input)).toEqual(false);
  });
});

describe("Check if cards is a full house", () => {
  it("Cards is a full house", () => {
    const input = [
      { value: "9", suit: "S" },
      { value: "T", suit: "S" },
      { value: "T", suit: "C" },
      { value: "9", suit: "D" },
      { value: "9", suit: "H" },
    ];
    expect(isFullHouse(input)).toEqual(true);
  });
  it("Cards is NOT a full house since there is no 3 of a kind and only 2 pairs", () => {
    const input = [
      { value: "8", suit: "S" },
      { value: "2", suit: "C" },
      { value: "5", suit: "H" },
      { value: "2", suit: "D" },
      { value: "5", suit: "D" },
    ];
    expect(isFullHouse(input)).toEqual(false);
  });
});

describe("Check if cards is a flush", () => {
  it("Cards is a flush", () => {
    const input = [
      { value: "5", suit: "H" },
      { value: "T", suit: "H" },
      { value: "K", suit: "H" },
      { value: "3", suit: "H" },
      { value: "A", suit: "H" },
    ];
    expect(isAFlush(input)).toEqual(true);
  });
  it("Cards is NOT a flush because one of the cards is of different suit", () => {
    const input = [
      { value: "6", suit: "S" },
      { value: "5", suit: "D" },
      { value: "4", suit: "S" },
      { value: "T", suit: "S" },
      { value: "8", suit: "S" },
    ];
    expect(isAFlush(input)).toEqual(false);
  });
});

describe("Check if cards is a straight", () => {
  it("Cards is a straight", () => {
    const input = [
      { value: "7", suit: "C" },
      { value: "9", suit: "D" },
      { value: "8", suit: "D" },
      { value: "T", suit: "C" },
      { value: "J", suit: "C" },
    ];
    expect(isAStraight(input)).toEqual(true);
  });
  it("Cards is NOT a straight because the cards are not in consecutive order", () => {
    const input = [
      { value: "3", suit: "S" },
      { value: "T", suit: "D" },
      { value: "9", suit: "D" },
      { value: "8", suit: "H" },
      { value: "A", suit: "D" },
    ];
    expect(isAStraight(input)).toEqual(false);
  });
});

describe("Check if cards is a three of a kind", () => {
  it("Cards is a three of a kind", () => {
    const input = [
      { value: "A", suit: "H" },
      { value: "A", suit: "D" },
      { value: "A", suit: "S" },
      { value: "J", suit: "C" },
      { value: "9", suit: "H" },
    ];
    expect(isThreeOfAKind(input)).toEqual(true);
  });
  it("Cards is NOT a three of a kind because there are no 3 cards of same value", () => {
    const input = [
      { value: "5", suit: "S" },
      { value: "K", suit: "C" },
      { value: "6", suit: "H" },
      { value: "6", suit: "C" },
      { value: "Q", suit: "S" },
    ];
    expect(isThreeOfAKind(input)).toEqual(false);
  });
});

describe("Check if cards has two pairs", () => {
  it("Cards has two pairs", () => {
    const input = [
      { value: "T", suit: "H" },
      { value: "Q", suit: "C" },
      { value: "8", suit: "D" },
      { value: "Q", suit: "H" },
      { value: "T", suit: "S" },
    ];
    expect(isTwoPairs(input)).toEqual(true);
  });

  it("Cards does NOT have 2 pairs", () => {
    const input = [
      { value: "J", suit: "C" },
      { value: "8", suit: "D" },
      { value: "6", suit: "H" },
      { value: "J", suit: "H" },
      { value: "7", suit: "S" },
    ];
    expect(isTwoPairs(input)).toEqual(false);
  });
});

describe("Check if cards has a pair", () => {
  it("Cards has a pair", () => {
    const input = [
      { value: "5", suit: "D" },
      { value: "7", suit: "S" },
      { value: "K", suit: "D" },
      { value: "5", suit: "S" },
      { value: "A", suit: "H" },
    ];
    expect(isAPair(input)).toEqual(true);
  });

  it("Cards does NOT have a pair", () => {
    const input = [
      { value: "3", suit: "H" },
      { value: "2", suit: "C" },
      { value: "K", suit: "S" },
      { value: "Q", suit: "H" },
      { value: "5", suit: "S" },
    ];
    expect(isAPair(input)).toEqual(false);
  });
});

describe("Check if cards is a high card", () => {
  it("Cards is a high card", () => {
    const input = [7, 10, 14, 2, 4];
    const output = 14;
    expect(isAHighCard(input)).toEqual(output);
  });
});

describe("Check for cards next highest card value", () => {
  it("Cards next highest card value", () => {
    const input = [13, 11, 5, 4, 8];
    const output = 11;
    expect(nextHighestCard(input)).toEqual(output);
  });
});

describe("Check for cards third highest card value", () => {
  it("Cards third highest card value", () => {
    const input = [14, 8, 2, 12, 7];
    const output = 8;
    expect(thirdHighestCard(input)).toEqual(output);
  });
});

describe("Check for cards fourth highest card value", () => {
  it("Cards fourth highest card value", () => {
    const input = [13, 10, 5, 4, 8];
    const output = 5;
    expect(fourthHighestCard(input)).toEqual(output);
  });
});

describe("Suit occurrences check", () => {
  it("Calculate number of suit occurrences if suits are exactly the same", () => {
    const input = [
      { value: "T", suit: "D" },
      { value: "J", suit: "D" },
      { value: "Q", suit: "D" },
      { value: "K", suit: "D" },
      { value: "A", suit: "D" },
    ];
    const output = { D: 5 };
    expect(suitsCount(input)).toMatchObject(output);
  });

  it("Calculate number of suit occurrences if suits are not the same", () => {
    const input = [
      { value: "9", suit: "C" },
      { value: "9", suit: "D" },
      { value: "8", suit: "D" },
      { value: "7", suit: "C" },
      { value: "3", suit: "C" },
    ];
    const output = { C: 3, D: 2 };
    expect(suitsCount(input)).toMatchObject(output);
  });
});

describe("Card count check", () => {
  it("Calculate number of card occurrences if cards are not the same", () => {
    const input = [
      { value: "A", suit: "H" },
      { value: "3", suit: "C" },
      { value: "T", suit: "H" },
      { value: "5", suit: "C" },
      { value: "7", suit: "C" },
    ];
    const output = { 3: 1, 5: 1, 7: 1, A: 1, T: 1 };
    expect(cardCount(input)).toMatchObject(output);
  });

  it("Calculate number of card occurrences if some cards are the same", () => {
    const input = [
      { value: "Q", suit: "D" },
      { value: "Q", suit: "C" },
      { value: "5", suit: "D" },
      { value: "5", suit: "H" },
      { value: "Q", suit: "S" },
    ];
    const output = { 5: 2, Q: 3 };
    expect(cardCount(input)).toMatchObject(output);
  });

  describe("Card count check", () => {
    it("Get the card values and put them in a separate array", () => {
      const input = [
        { value: "4", suit: "D" },
        { value: "2", suit: "D" },
        { value: "7", suit: "H" },
        { value: "8", suit: "D" },
        { value: "3", suit: "C" },
      ];
      const output = ["4", "2", "7", "8", "3"];
      expect(getCardValues(input)).toMatchObject(output);
    });
  });

  describe("Get card value euivalent from list of cards object", () => {
    it("Get the equivalent of the card values and put them in an array", () => {
      const input = [
        { value: "T", suit: "D" },
        { value: "6", suit: "C" },
        { value: "2", suit: "C" },
        { value: "T", suit: "C" },
        { value: "K", suit: "S" },
      ];
      const output = [10, 6, 2, 10, 13];
      expect(getCardEquivalent(input)).toEqual(output);
    });
  });

  describe("Sort array values", () => {
    it("Sort an array of integers when integers are not the same", () => {
      const input = [
        { value: "A", suit: "D" },
        { value: "7", suit: "D" },
        { value: "K", suit: "H" },
        { value: "Q", suit: "H" },
        { value: "T", suit: "C" },
      ];
      const output = [7, 10, 12, 13, 14];
      expect(sortCards(input)).toMatchObject(output);
    });
  });

  it("Sort an array of integers when some integers are the same", () => {
    const input = [
      { value: "Q", suit: "H" },
      { value: "A", suit: "D" },
      { value: "A", suit: "H" },
      { value: "Q", suit: "C" },
      { value: "5", suit: "D" },
    ];
    const output = [5, 12, 12, 14, 14];
    expect(sortCards(input)).toMatchObject(output);
  });
});

describe("Consecutive order check", () => {
  it("Consecutive order is false", () => {
    const input = [
      { value: "A", suit: "D" },
      { value: "7", suit: "D" },
      { value: "K", suit: "H" },
      { value: "Q", suit: "H" },
      { value: "T", suit: "C" },
    ];
    expect(checkCardsIfConsecutiveOrder(input)).toEqual(false);
  });

  it("Consecutive order is true", () => {
    const input = [
      { value: "2", suit: "H" },
      { value: "3", suit: "H" },
      { value: "4", suit: "H" },
      { value: "5", suit: "H" },
      { value: "6", suit: "H" },
    ];
    expect(checkCardsIfConsecutiveOrder(input)).toEqual(true);
  });
});

describe("Find duplicate elements in an array", () => {
  it("Only one duplicate element", () => {
    const input = [5, 7, 13, 5, 14];
    const output = { 5: 2, 7: 1, 13: 1, 14: 1 };
    expect(findDuplicateItems(input)).toMatchObject(output);
  });
  it("Two duplicate elements", () => {
    const input = [10, 12, 8, 12, 10];
    const output = { 8: 1, 10: 2, 12: 2 };
    expect(findDuplicateItems(input)).toMatchObject(output);
  });
});

describe("Calculate the sum of duplicate items", () => {
  it("Sum of duplicate items", () => {
    const input = ["2", "12"];
    const output = 14;
    expect(sumOfDuplicatedItems(input)).toEqual(output);
  });
});
