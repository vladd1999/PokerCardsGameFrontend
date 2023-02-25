import { FC } from "react";
import { CardsContainer, PlayerContainer, ProfileImg } from "../styles";
import "../style.scss";
import profile from "../img/profile.jpg";
import Card from "./CardComponent";
import { cardRank, gameSession, Suit } from "../statics";
import { CardModel } from "./dropdownMenu";
interface Props {
    id: number;
    name:string;
    numberOfCards:number;
    hand:CardModel[]|null
}

const Player: FC<Props> = (props) => {
    const id = props.id;
    const name = props.name;
  let cards: JSX.Element[] = [];
  let playerId = JSON.parse(window.sessionStorage.getItem(gameSession) + '')['playerId'];
    const playerPosition:number=(id-playerId+1)%4 
    if(props.hand){
        let card:CardModel[] = props.hand;
        for(let j = 0; j<props.numberOfCards;j++){
          cards[j]=<Card suits={Suit[card[j].suit]} card={cardRank[card[j].rank]}/>
        }
    }
    else{
        for(let j = 0; j<props.numberOfCards;j++){
            cards[j]=<Card/>}
    }

    return (
    <PlayerContainer className={`p${playerPosition==0?playerPosition+4:playerPosition}`}>

    <div >
        <ProfileImg src={profile} alt="user-profile-pic" />
    </div>
        <span>{name}</span>
        <CardsContainer >
        {cards}
        </CardsContainer>
            
    </PlayerContainer>
    )
}
export default Player;