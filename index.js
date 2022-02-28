#!/usr/bin/env node

const readline = require("readline");
const {
  processHands,
  calculatePlayerScore,
  getCardEquivalent,
  nextHighestCard,
  thirdHighestCard,
  fourthHighestCard,
} = require("./utils/poker");
const { Scores } = require("./structure/structure");

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

  const player1Score = new Scores();
  const player2Score = new Scores();

  hands.map((hand) => {
    let getPlayer1Cards = getCardEquivalent(hand.player1Cards);
    let getPlayer2Cards = getCardEquivalent(hand.player2Cards);
    const player1 = calculatePlayerScore(hand.player1Cards);
    const player2 = calculatePlayerScore(hand.player2Cards);

    if (player1 > player2) {
      player1Score.toString();
    } else if (player1 === player2) {
      let getPlayer1NextHighestCard =
        player1 + nextHighestCard(getPlayer1Cards);
      let getPlayer2NextHighestCard =
        player2 + nextHighestCard(getPlayer2Cards);
      if (getPlayer1NextHighestCard > getPlayer2NextHighestCard) {
        player1Score.toString();
      } else if (getPlayer1NextHighestCard === getPlayer2NextHighestCard) {
        let getPlayer1ThirdHighestCard =
          getPlayer1NextHighestCard + thirdHighestCard(getPlayer1Cards);
        let getPlayer2ThirdHighestCard =
          getPlayer2NextHighestCard + thirdHighestCard(getPlayer2Cards);
        if (getPlayer1ThirdHighestCard > getPlayer2ThirdHighestCard) {
          player1Score.toString();
        } else if (getPlayer1ThirdHighestCard === getPlayer2ThirdHighestCard) {
          let getPlayer1FourthHighestCard =
            getPlayer1ThirdHighestCard + fourthHighestCard(getPlayer1Cards);
          let getPlayer2FourthHighestCard =
            getPlayer2ThirdHighestCard + fourthHighestCard(getPlayer2Cards);
          if (getPlayer1FourthHighestCard > getPlayer2FourthHighestCard) {
            player1Score.toString();
          } else {
            player2Score.toString();
          }
        } else {
          player2Score.toString();
        }
      } else {
        player2Score.toString();
      }
    } else {
      player2Score.toString();
    }
  });
  console.log(`Player 1: ${player1Score} hands`);
  console.log(`Player 2: ${player2Score} hands`);
});
