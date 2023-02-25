import { FC, useState } from "react";
import { gameSession, gameState, PokerHandPower, Rank, STRAIGHT, Suit } from "../statics";
import { MenuDiv } from "../styles";
import Card from "./CardComponent";
import DropDown from "./Dropdown";
import { PlayerModel } from "./table";


export interface Move {
  pokerHandPower: number,
  value: number,
  secondValue?: number
}
export interface Information {
  pokerHandPower: PokerHandPower,
  value: number,
  secondValue: number|null
}
export interface KeyValue {
  id: number,
  value: string
}

enum TypeOfMove {
  waiting,
  trustOrNot,
  pickHand,
  isLying
}
export interface CardModel {
  suit: Suit;
  rank: Rank;
}
export interface GameState {
  id: number,
  maxPlayer: number,
  players: PlayerModel[],
  currentPlayerId: number// if null => game didnt start yet
  typeOfMove: TypeOfMove, //0-not your turn, 1- pick hand, 2- trust or not
  tableCardModels: CardModel[],
  myCardModels: CardModel[],
  lastInfo: Move;
}
interface Props{
  pickhand:any;

}
const Menu: FC<Props> = (props:Props): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showSecondDropDown, setShowSecondDropDown] = useState<boolean>(true);
  const [showThirdDropDown, setShowThirdDropDown] = useState<boolean>(true);
  const [move, setMove] = useState<Information>({ pokerHandPower: 0, value: 0, secondValue: 0 });

  let cards: KeyValue[] = [];
  let id = 0;
  let hands: KeyValue[] = [];
  let temp: boolean = false;
  const lastInfo = JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'];

  if (JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'] == null) {
    Object.keys(PokerHandPower).forEach((v) => {
      if (isNaN(parseFloat(v))) {
        hands.push({ id: id++, value: v });
      }
    });
  }
  else
    Object.keys(PokerHandPower).forEach((v) => {
      if (isNaN(parseFloat(v))) {
        if(v == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].pokerHandPower){
          temp=true;
          if(JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value==Rank.ACE){
            temp=false;
          }
        }
        if (temp) {
          hands.push({ id: id++, value: v });
        }
        
        if(JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value==Rank.ACE
        && v == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].pokerHandPower){
          temp=true;
        }
      }
    });
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
  const toggleSecondDropDown = () => {
    setShowSecondDropDown(!showSecondDropDown);
  };
  const toggleThirdDropDown = () => {
    setShowThirdDropDown(!showThirdDropDown);
  };

  function createFirstValueList(): KeyValue[] {
    id = 0;
    cards = [];
    if (JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'] == null) {
      if(move.pokerHandPower == PokerHandPower.STRAIGHT 
        || move.pokerHandPower == PokerHandPower.STRAIGHTFLUSH){
          Object.keys(STRAIGHT).forEach((v) => {
            if (isNaN(parseFloat(v))) {
              cards.push({ id: id++, value: v });
            }
          });
        }
        else{

          Object.keys(Rank).forEach((v) => {
            if (isNaN(parseFloat(v))) {
              cards.push({ id: id++, value: v });
            }
          });
        }
    } 
    else {
      let temp = false;
      let pokerHandPower = JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].pokerHandPower;
      let pokerHandPowerNumericValue = Object.values(PokerHandPower).indexOf(pokerHandPower as unknown as PokerHandPower);
      if (move.pokerHandPower > pokerHandPowerNumericValue) {
        temp = true;
      }
      if(move.pokerHandPower == PokerHandPower.STRAIGHT 
        || move.pokerHandPower == PokerHandPower.STRAIGHTFLUSH){
        Object.keys(STRAIGHT).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            if (temp) {
              cards.push({ id: id++, value: v });
            }
            if (PokerHandPower[move.pokerHandPower] === pokerHandPower 
              && Object.values(STRAIGHT).indexOf(v as unknown as STRAIGHT) == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value) {
              temp = true;
            }
          }
        });
      }else{
        Object.keys(Rank).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            if (PokerHandPower[move.pokerHandPower] === pokerHandPower 
            && Object.values(Rank).indexOf(v as unknown as Rank) == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value 
            &&JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].secondValue!==Rank.ACE) {
            temp = true;
          }
          
            if (temp) {
              cards.push({ id: id++, value: v });
            }
            if (PokerHandPower[move.pokerHandPower] === pokerHandPower 
              && Object.values(Rank).indexOf(v as unknown as Rank) == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value) {
              temp = true;
            }
          }
        });
      }
    }
    return cards;
  }

  function createSecondValueList(): KeyValue[] {
    id = 0;
    cards = [];
    let temp = false;
    if (JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'] == null) {
      if (move.pokerHandPower === PokerHandPower.STRAIGHTFLUSH ) {
        Object.keys(Suit).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            cards.push({ id: id++, value: v });
          }
        })
      } 
      else {
        Object.keys(Rank).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            cards.push({ id: id++, value: v });
          }
        })
      }
    }
    else {
      
      let value = JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value;
      let pokerHandPowerNumericValue = Object.values(PokerHandPower).indexOf(JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].pokerHandPower as unknown as PokerHandPower);
      if (move.pokerHandPower === PokerHandPower.STRAIGHTFLUSH ) {
        Object.keys(Suit).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            cards.push({ id: id++, value: v });
          }
        })
      }
      else {
        if (move.pokerHandPower>pokerHandPowerNumericValue || (move.pokerHandPower==pokerHandPowerNumericValue && move.value > value)||(move.pokerHandPower==pokerHandPowerNumericValue && move.value == value)) {
          temp = true;
        }
        Object.keys(Rank).forEach((v) => {
          if (isNaN(parseFloat(v))) {
            if (temp&&Object.values(Rank).indexOf(v as unknown as Rank)!=move.value) {
              cards.push({ id: id++, value: v });
            }
            if (PokerHandPower[move.value] === value && Object.values(Rank).indexOf(v as unknown as Rank) == JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].secondValue) {
              temp = true;
            }

          }
        });
      }
    }
    return cards;
  }

  const handSelection = (hand: string): void => {
    let move2 = move;
    move2.pokerHandPower = Object.values(PokerHandPower).indexOf(hand as unknown as PokerHandPower);
    move2.value=0;
    setMove(move2);

  };
  const pickFirstValue = (card: string) => {
    let move2 = move;
    move2.value = Object.values(Rank).indexOf(card as unknown as Rank);
    if( move.pokerHandPower === PokerHandPower.HIGHCARD 
      || move.pokerHandPower === PokerHandPower.PAIR 
      || move.pokerHandPower === PokerHandPower.THREEOFAKIND 
      || move.pokerHandPower === PokerHandPower.FOUROFAKIND 
      || move.pokerHandPower === PokerHandPower.STRAIGHT){
        move2.secondValue=null;
    }
    move2.secondValue=null;
    setMove(move2);
  }
  const pickSecondValue = (card: string) => {
    let move2 = move;
    if (move2.pokerHandPower == PokerHandPower.STRAIGHTFLUSH ) {
      move2.secondValue = Object.values(Suit).indexOf(card as unknown as Suit);
    } else {
      move2.secondValue = Object.values(Rank).indexOf(card as unknown as Rank);
    }
    setMove(move2);
  }


  const handleClick = () => {
    props.pickhand(move);
  }


  return (
    <>
    <MenuDiv>
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
      >
        <div>{Object.values(PokerHandPower)[move.pokerHandPower]} </div>
        {showDropDown && (
          <DropDown
            hands={hands}
            showDropDown={showDropDown}
            toggleDropDown={(): void => toggleDropDown()}
            handSelection={handSelection}
          />
        )}
      </button>

      {move.pokerHandPower != null ?
        <>
          <button className={showSecondDropDown ? "active" : undefined}
            onClick={(): void => toggleSecondDropDown()} >
            <div>{move.value != null ? "Select: " + Object.values(Rank)[move.value] : "Select ..."} </div>
            {(
              <DropDown
                hands={createFirstValueList()}
                showDropDown={showSecondDropDown}
                toggleDropDown={(): void => toggleSecondDropDown()}
                handSelection={pickFirstValue}
              />
            )}
          </button>
        </>

        : ''
      }

      {((move.pokerHandPower === PokerHandPower.TWOPAIRS || move.pokerHandPower === PokerHandPower.FULLHOUSE || move.pokerHandPower === PokerHandPower.STRAIGHTFLUSH) && move.value != null) ?
        <>
          <button className={showThirdDropDown ? "active" : undefined}
            onClick={(): void => toggleThirdDropDown()} >
            {(move.pokerHandPower === PokerHandPower.STRAIGHTFLUSH )?
            <div>{move.secondValue != null ? "Select: " + Object.values(Suit)[move.secondValue] : "Select ..."} </div>:
            <div>{move.secondValue != null ? "Select: " + Object.values(Rank)[move.secondValue] : "Select ..."} </div>
            
            }
            {(
              <DropDown
                hands={createSecondValueList()}
                showDropDown={showThirdDropDown}
                toggleDropDown={(): void => toggleThirdDropDown()}
                handSelection={pickSecondValue}
              />
            )
            }
          </button>
        </>

        : ''
      }
      <button onClick={handleClick}>Pick hand!</button>
      </MenuDiv>
    </>
  );
};

export default Menu;
