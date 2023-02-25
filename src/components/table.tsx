import { FC, useEffect, useState } from "react";
import Player from "../components/player";
import { cardRank, cardSuit, gameSession, gameState, handPowerString, PokerHandPower } from "../statics";

import { Container, LastPlayerHand, TableContainer } from "../styles";
import BelieveOrNot from "./believeOrNot";
import Menu, { CardModel, Information } from "./dropdownMenu";
import TableCards from "./TableCards";


export interface PlayerModel {
  id: number,
  name: string,
  numberOfCards: number
  hand: CardModel[] | null
}

interface Props {
  gameStatus: string,
  id: number,
  currentPlayerId: number,
  players: PlayerModel[] | null,
  myCardModels: CardModel[] | null,
  typeOfMove: string,
  maxPlayer: number,
  lastInfo: Information | null
}


const Table: FC = () => {
  const [gameStatus, setGameStatus] = useState<Props>({ gameStatus: "", id: -1, currentPlayerId: -1, players: null, typeOfMove: "", maxPlayer: -1, myCardModels: null, lastInfo: null });
  let renderStatus: boolean = true;
  let myId: number = JSON.parse(window.sessionStorage.getItem(gameSession) + '')['playerId'];


  const getData = (value: string) => {
    if (gameStatus) {
      setGameStatus((c) => { return { ...c, typeOfMove: value } });
    }
  }
  const handleLie = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: JSON.parse(window.sessionStorage.getItem(gameState) + '')['id'] })
    };
    renderStatus = true;

    const data = JSON.parse(window.sessionStorage.getItem(gameState) + '');
    data.currentPlayerId = -1;
    window.sessionStorage.setItem(gameState, JSON.stringify(data));

    fetch('http://localhost:8080/game/is-lying', requestOptions)
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: JSON.parse(window.sessionStorage.getItem(gameSession) + '')['id'],
      playerId: JSON.parse(window.sessionStorage.getItem(gameSession) + '')['playerId'],
    })
  };


  function getAlerts() {
    if ((!JSON.parse(window.sessionStorage.getItem(gameState) + '') || JSON.parse(window.sessionStorage.getItem(gameState) + '')['currentPlayerId'] == null)
      || JSON.parse(window.sessionStorage.getItem(gameState) + '')['currentPlayerId'] != myId
      || renderStatus) {
      fetch('http://localhost:8080/game/retrieve-state', requestOptions)
        .then(response => response.json())
        .then(res => {
          res = res as unknown as Props;
          if (res !== gameStatus) {
            setGameStatus(res);
          }
          window.sessionStorage.setItem(gameState, JSON.stringify(res));
          renderStatus = false;
        })
    }
    // console.log(JSON.parse(window.sessionStorage.getItem(gameSession) + ''));
  }
  useEffect(() => {
    setTimeout(function tick() {
      getAlerts();
      setTimeout(tick, 5000); // (*)
    }, 5000);
  }, [])
  console.log(gameStatus);


  const handleClick = (move: Information) => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ informationModel: move, gameId: JSON.parse(window.sessionStorage.getItem(gameSession) + '')['id'] })
    };
    renderStatus = true;
    const data = JSON.parse(window.sessionStorage.getItem(gameState) + '');
    data.currentPlayerId = -1;
    window.sessionStorage.setItem(gameState, JSON.stringify(data));

    fetch('http://localhost:8080/game/set-accepted-move', requestOptions);
  }
  let players: JSX.Element[] = [];
  if (gameStatus && gameStatus.players) {
    for (let i = 0; i < gameStatus.players.length; i++) {
      players[i] = <Player id={gameStatus.players[i].id} key={gameStatus.players[i].id} name={gameStatus.players[i].name} numberOfCards={gameStatus.players[i].numberOfCards} hand={gameStatus.players[i].hand} />
    }

  }

  let dropdown: JSX.Element = <></>;
  if (gameStatus && gameStatus.currentPlayerId === JSON.parse(window.sessionStorage.getItem(gameSession) + '')['playerId']) {
    if (gameStatus.typeOfMove === "trustOrNot" && JSON.parse(window.sessionStorage.getItem(gameState) + '')["lastInfo"]) {
      dropdown = <BelieveOrNot getDataValue={getData} handleLie={handleLie} />;
    } else if (gameStatus.typeOfMove === "pickHand") {
      dropdown = <Menu pickhand={handleClick} />;
    }
  }
  let lastHandPicked: string = '';
  if (gameStatus.lastInfo) {
    let pokerHandNumericValue: number = Object.values(PokerHandPower).indexOf(JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].pokerHandPower as unknown as PokerHandPower);

    if (JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].secondValue !== null) {
      if (pokerHandNumericValue !== PokerHandPower.STRAIGHTFLUSH) {
        lastHandPicked = `Last hand picked: ${handPowerString[pokerHandNumericValue]} of ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value]} and ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].secondValue]}`;
      } else {
        lastHandPicked = `Last hand picked: ${handPowerString[pokerHandNumericValue]} from ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value]} to ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value + 4]} of ${cardSuit[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].secondValue]}`;
      }

    }
    else {
      if (pokerHandNumericValue !== PokerHandPower.STRAIGHT) {
        lastHandPicked = `Last hand picked: ${handPowerString[pokerHandNumericValue]} of ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value]}`;
      }
      else {
        lastHandPicked = `Last hand picked: ${handPowerString[pokerHandNumericValue]} from ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value]} to ${cardRank[JSON.parse(window.sessionStorage.getItem(gameState) + "")['lastInfo'].value + 4]}`;
      }
    }
  }


  return (
    <Container>
      <TableContainer>

        {players}
        {(window.sessionStorage.getItem(gameState) && JSON.parse(window.sessionStorage.getItem(gameState) + "")['tableCardModels']) ? <TableCards /> : undefined}
        {lastHandPicked !== '' ? <LastPlayerHand>{lastHandPicked}</LastPlayerHand> : <></>}
        {dropdown}
      </TableContainer>
    </Container>
  )
}
export default Table;