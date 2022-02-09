//sample input
const Hands = ["9C"]
const Player1 = []
//Array of suits defined as (D)Diamonds, (H)Hearts, (S)Spades, (C)Clubs
const Suits = ["D", "H", "S", "C"];

const CardValue = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 11,
    Q: 12,
    K: 13,
    A: 14,
}

const PokerHandCombo = {
    High_Card: 20,
    Two_Pairs: 40,
    Three_OfA_Kind: 60, 
    Straight: 80, 
    Flush: 100, 
    Full_House: 120, 
    Four_OfA_Kind: 140,
    Straight_Flush: 160,
    Royal_Flush: 180,

}

//1. check the 1st index of each input then map to the cardvalue array to get the card value, then store the value to player1