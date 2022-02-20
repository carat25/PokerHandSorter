import { expect, it } from "@jest/globals";

const {
  suitsCount,
  cardCount,
  getCardValues,
  getCardEquivalent,
  sortCards,
  checkCardsIfConsecutiveOrder,
} = require("./poker");

describe("Poker Hand Sorter tests", () => {
  //suitsCount test
  it("Calculate number of suit occurrences if suits are exactly the same", () => {
    expect(
      suitsCount([
        { value: "T", suit: "D" },
        { value: "J", suit: "D" },
        { value: "Q", suit: "D" },
        { value: "K", suit: "D" },
        { value: "A", suit: "D" },
      ])
    ).toMatchObject({ D: 5 });
  });

  it("Calculate number of suit occurrences if suits are not the same", () => {
    expect(
      suitsCount([
        { value: "9", suit: "C" },
        { value: "9", suit: "D" },
        { value: "8", suit: "D" },
        { value: "7", suit: "C" },
        { value: "3", suit: "C" },
      ])
    ).toMatchObject({ C: 3, D: 2 });
  });

  //cardCount test
  it("Calculate number of card occurrences if cards are not the same", () => {
    expect(
      cardCount([
        { value: "A", suit: "H" },
        { value: "3", suit: "C" },
        { value: "T", suit: "H" },
        { value: "5", suit: "C" },
        { value: "7", suit: "C" },
      ])
    ).toMatchObject({ 3: 1, 5: 1, 7: 1, A: 1, T: 1 });
  });

  it("Calculate number of card occurrences if some cards are the same", () => {
    expect(
      cardCount([
        { value: "Q", suit: "D" },
        { value: "Q", suit: "C" },
        { value: "5", suit: "D" },
        { value: "5", suit: "H" },
        { value: "Q", suit: "S" },
      ])
    ).toMatchObject({ 5: 2, Q: 3 });
  });

  //getCardValues test
  it("Get the card values and put them in a separate array", () => {
    expect(
      getCardValues([
        { value: "4", suit: "D" },
        { value: "2", suit: "D" },
        { value: "7", suit: "H" },
        { value: "8", suit: "D" },
        { value: "3", suit: "C" },
      ])
    ).toMatchObject(["4", "2", "7", "8", "3"]);
  });

  //getCardEquivalent test
  it("Get the equivalent of the card values and put them in an array", () => {
    expect(
      getCardEquivalent([
        { value: "T", suit: "D" },
        { value: "6", suit: "C" },
        { value: "2", suit: "C" },
        { value: "T", suit: "C" },
        { value: "K", suit: "S" },
      ])
    ).toMatchObject([10, 6, 2, 10, 13]);
  });

  //sort card test
  it("Sort an array of integers when integers are not the same", () => {
    expect(
      sortCards([
        { value: "A", suit: "D" },
        { value: "7", suit: "D" },
        { value: "K", suit: "H" },
        { value: "Q", suit: "H" },
        { value: "T", suit: "C" },
      ])
    ).toMatchObject([7, 10, 12, 13, 14]);
  });

  //check if cards are in consecutive order test
  it("Sort an array of integers when integers are not the same", () => {
    expect(
      sortCards([
        { value: "A", suit: "D" },
        { value: "7", suit: "D" },
        { value: "K", suit: "H" },
        { value: "Q", suit: "H" },
        { value: "T", suit: "C" },
      ])
    ).toMatchObject([7, 10, 12, 13, 14]);
  });
});
