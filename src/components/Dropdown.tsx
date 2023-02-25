import { FC } from "react";
import { DropdownDiv } from "../styles";
import { KeyValue } from "./dropdownMenu";

type DropDownProps = {
  hands: KeyValue[];
  showDropDown?: boolean;
  toggleDropDown?: Function;
  handSelection: Function;
};

const DropDown: FC<DropDownProps> = ({
  hands,
  showDropDown,
  handSelection
}: DropDownProps): JSX.Element => {


  const onClickHandler = (hand: string): void => {
    handSelection(hand);//in hand selection ->handleClick render la cards dropdown 
  };


  if (showDropDown) {
    let element: JSX.Element[] = [];
    hands.forEach((v) => {
      element.push(
        <button
          key={v.id}
          onClick={(): void => {
            onClickHandler(v.value);

          }}
        >
          {v.value}
        </button>
      );
    }
    )
    return (
      <>
        <DropdownDiv >
          {element }
        </DropdownDiv>
      </>
    );
  } else {
    return <></>;
  }
};

export default DropDown;