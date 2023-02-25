import { ChangeEvent, FC, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, HomeContainer, Wrapper, Title } from "../styles";
import Button from "../components/button";
import Input from "../components/input";


const defaultFormFields = {
  roomPassword: '',
  maxPlayers: '',
};

const CreateGame : FC = () => {
    const navigate = useNavigate();
    const routeChange = () =>{ 
        let path = `/`; 
        navigate(path);
      }
      
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { roomPassword, maxPlayers } = formFields;
  
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
    return(
    <Container>
      <Title>Title</Title>
      <HomeContainer>
          <Button str="Go Back"/>
          <Wrapper>
            <form onSubmit={handleSubmit}>
            <Input onChange={handleChange} value={roomPassword} placeholder="Select the room password"/>
            <Input onChange={handleChange} value={maxPlayers} placeholder="Max players number"/>
          <Wrapper>
          <button type="submit">Submit</button>
          </Wrapper>
            </form >
          </Wrapper>
      </HomeContainer>
    </Container>
);
}
export default CreateGame;