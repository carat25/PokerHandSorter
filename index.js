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

  /**
   * player 1: [ 0, 1, 1, 0, 0, 0 ]
   * player 2: [ 1, 0, 0, 1, 1, 1 ]
   */
  let player1WinCount = [];
  let player2WinCount = [];

  hands.map((hand) => {
    let getPlayer1Cards = getCardEquivalent(hand.player1Cards);
    let getPlayer2Cards = getCardEquivalent(hand.player2Cards);

    if (calculatePlayer1Score(hand) > calculatePlayer2Score(hand)) {
      player1WinCount.push(1);
      player2WinCount.push(0);
    } else if (calculatePlayer1Score(hand) === calculatePlayer2Score(hand)) {
      let getPlayer1NextHighestCard =
        calculatePlayer1Score(hand) + nextHighestCard(getPlayer1Cards);
      let getPlayer2NextHighestCard =
        calculatePlayer2Score(hand) + nextHighestCard(getPlayer2Cards);
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

    const player1NumWins = player1WinCount.filter((x) => {
      return x === 1;
    }).length;
    const player2NumWins = player2WinCount.filter((value) => {
      return value === 1;
    }).length;

    console.log(`Player 1: ${player1NumWins} hands`);
    console.log(`Player 2: ${player2NumWins} hands`);
  });
});
