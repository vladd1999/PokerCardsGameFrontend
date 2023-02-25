import { FC, InputHTMLAttributes } from "react";


type Props = InputHTMLAttributes<HTMLInputElement>;

const Input: FC<Props> = (props) => {
    const placeholder = props.placeholder;
    return (
        <div className="button2">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <input type="transparent" placeholder={placeholder} {...props}/>
    
  </div>    
    
        
    
    )
}
export default Input;