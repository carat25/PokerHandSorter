#!/usr/bin/env node

const readline = require("readline");
const {
  processHands,
  calculatePlayer1Score,
  calculatePlayer2Score,
  getCardEquivalent,
  nextHighestCard,
  thirdHighestCard,
  fourthHighestCard,
} = require("./poker");

//this checks the user input, if the input is empty (""),
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

  /**
   * player 1: [ 0, 1, 1, 0, 0, 0 ]
   * player 2: [ 1, 0, 0, 1, 1, 1 ]
   */
  let player1WinCount = [];
  let player2WinCount = [];

  hands.map((hand) => {
    let getPlayer1Cards = getCardEquivalent(hand.player1Cards);
    let getPlayer2Cards = getCardEquivalent(hand.player2Cards);
    let player1 = calculatePlayer1Score(hand);
    let player2 = calculatePlayer2Score(hand);

    if (player1 > player2 ) {
      player1WinCount.push(1);
      player2WinCount.push(0);
    } else if (player1 === player2) {
      let getPlayer1NextHighestCard =
        player1 + nextHighestCard(getPlayer1Cards);
      let getPlayer2NextHighestCard =
        player2 + nextHighestCard(getPlayer2Cards);
      if (getPlayer1NextHighestCard > getPlayer2NextHighestCard) {
        player1WinCount.push(1);
        player2WinCount.push(0);
      } else if (getPlayer1NextHighestCard === getPlayer2NextHighestCard) {
        let getPlayer1ThirdHighestCard =
          getPlayer1NextHighestCard + thirdHighestCard(getPlayer1Cards);
        let getPlayer2ThirdHighestCard =
          getPlayer2NextHighestCard + thirdHighestCard(getPlayer2Cards);
        if (getPlayer1ThirdHighestCard > getPlayer2ThirdHighestCard) {
          player1WinCount.push(1);
          player2WinCount.push(0);
        } else if (getPlayer1ThirdHighestCard === getPlayer2ThirdHighestCard) {
          let getPlayer1FourthHighestCard =
            getPlayer1ThirdHighestCard + fourthHighestCard(getPlayer1Cards);
          let getPlayer2FourthHighestCard =
            getPlayer2ThirdHighestCard + fourthHighestCard(getPlayer2Cards);
          if (getPlayer1FourthHighestCard > getPlayer2FourthHighestCard) {
            player1WinCount.push(1);
            player2WinCount.push(0);
          } else {
            player2WinCount.push(1);
            player1WinCount.push(0);
          }
        } else {
          player2WinCount.push(1);
          player1WinCount.push(0);
        }
      } else {
        player2WinCount.push(1);
        player1WinCount.push(0);
      }
    } else {
      player2WinCount.push(1);
      player1WinCount.push(0);
    }

    const player1NumWins = player1WinCount.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    const player2NumWins = player2WinCount.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      0
    );

    console.log(`Player 1: ${player1NumWins} hands`);
    console.log(`Player 2: ${player2NumWins} hands`);
  });
});
