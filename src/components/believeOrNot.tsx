import { FC} from "react";
import { ActionDiv } from "../styles";

interface Props {
  getDataValue: any;
  handleLie:any;

}

const BelieveOrNot: FC<Props> = (props) => {
  const handleTrust = () => {
    props.getDataValue("pickHand");
  }
  const handleLying = () => {
    props.handleLie();
  }





  return (
    <ActionDiv>
      <button onClick={handleTrust}>Trust</button>
      <button onClick={handleLying}>Is lying</button>
    </ActionDiv>
  )
}
export default BelieveOrNot;