import { expect, it } from "@jest/globals";
import { processHands, suitsCount, getCardValues } from "./functions.js";


describe('Poker Hand Sorter test', () => {


it('Calculate number of occurrences if suits are exactly the same', () => {
  expect(suitsCount([
    { value: 'T', suit: 'D' },
    { value: 'J', suit: 'D' },
    { value: 'Q', suit: 'D' },
    { value: 'K', suit: 'D' },
    { value: 'A', suit: 'D' }
  ])).toMatchObject({ D: 5 });
});

it('Calculate number of occurrences if suits are not the same', () => {
  expect(suitsCount([
    { value: '9', suit: 'C' },
    { value: '9', suit: 'D' },
    { value: '8', suit: 'D' },
    { value: '7', suit: 'C' },
    { value: '3', suit: 'C' }
  ])).toMatchObject({ C: 3, D: 2 });
});

it('Get card values', () => {
  expect(getCardValues([
    { value: '9', suit: 'C' },
    { value: '9', suit: 'D' },
    { value: '8', suit: 'D' },
    { value: '7', suit: 'C' },
    { value: '3', suit: 'C' }
  ])).toMatchObject(["9", "9", "8", "7", "3"]);
});

});

//test isStraightFlush
//check number of occurrences of suits
//if 