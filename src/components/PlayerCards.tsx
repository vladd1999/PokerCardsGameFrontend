import { FC, useState } from "react";
import { deckArray } from "../DeckArray";
import Card from "./CardComponent";



const PlayerCards:FC = ()=>{
      const [cardsArray,setCardsArray] = useState(deckArray);
      const [cardPicked,setCardsPicked] = useState<Array<any>>([]);
      const [front,setFront] = useState(true);

      const cardsPickedArray =cardPicked;

      const dealOneCard = () => {
        const randomItem = cardsArray[Math.floor(Math.random()*cardsArray.length)];
        const newCardsArray = cardsArray.filter(element => element.index !== randomItem.index)
        setCardsArray( newCardsArray);
        cardsPickedArray.push(randomItem);
        setCardsPicked( cardsPickedArray )
      };

      const dealTableCards = ()=>{
        dealOneCard();
        dealOneCard();
        dealOneCard();
        dealOneCard();
        dealOneCard();
      }

    
    return (
   <div>
     <button onClick={() => dealTableCards()}>Deal cards</button>
        <div style={{ display: "flex", justifyContent: "center", margin: "40px auto 0px 180px" }}>
    
          {cardsPickedArray && cardsPickedArray.map((card: { suits: string; card: string; }, index: number) => {
            return (
              <div key={index}>
                <Card suits={card.suits} card={card.card} id={0}/>
              </div>
            ); 
          })}
        </div>
   </div>
      
    )
}
export default PlayerCards;