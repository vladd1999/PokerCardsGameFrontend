import { FC } from "react";
import { TableCardsDiv } from "../styles";
import "../style.scss";
import Card from "./CardComponent";
import { cardRank, gameState, Suit } from "../statics";
import { CardModel } from "./dropdownMenu";


const TableCards: FC = () => {
  let cards: JSX.Element[] = [];
  let card: CardModel[] = JSON.parse(window.sessionStorage.getItem(gameState) + '').tableCardModels;
  for (let j = 0; j < 5; j++) {
    cards[j] = <Card suits={Suit[card[j].suit]} card={cardRank[card[j].rank]} id={0} key={j} />
  }
  return (
    <div>
      <TableCardsDiv>
        {cards}
      </TableCardsDiv>
    </div>
  )
}
export default TableCards;