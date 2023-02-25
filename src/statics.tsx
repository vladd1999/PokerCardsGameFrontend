export const gameSession: string = 'gameSession';
export const playerList: string = 'playerList';
export const gameState: string = 'gameState';
export const playerName: string[] = [];
export enum PokerHandPower {
  HIGHCARD,
  PAIR,
  TWOPAIRS,
  THREEOFAKIND,
  STRAIGHT,
  FULLHOUSE,
  FOUROFAKIND,
  STRAIGHTFLUSH
}
export enum Rank {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE
}
export enum STRAIGHT {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN
}
export enum Suit {
  DIAMONDS,
  CLUBS,
  HEARTS,
  SPADES
}
export const cardRank:string[]=[ "2",
"3",
"4",
"5",
"6",
'7',
'8',
 '9',
 '10',
 'J',
 'Q',
 'K',
 'A' ];
 export const cardSuit :string[]=['diamonds','clubs','hearts','spades']
 export const handPowerString :string[]=["high card",
 "pair",
 "two pairs",
 "three of a kind",
 "straight",
 "full house",
 "four of a kind",
 "straight flush"]
