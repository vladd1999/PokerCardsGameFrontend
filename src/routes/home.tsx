import { ChangeEvent, FC, useState } from "react";

import { Container, HomeButtons, HomeContainer, SetNameWrapper, Title } from "../styles";
import "../style.scss";
import Button from "../components/button";
import Input from "../components/input";
import { gameSession} from "../statics";

import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name })
    };
    fetch('http://localhost:8080/game/join', requestOptions)
      .then(response => response.json())
      .then(data => {
        window.sessionStorage.setItem(gameSession, JSON.stringify(data));
        navigate("/table");
      })
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);

  };

  {
    return (
      <Container>
        <Title>Poker Cards Game</Title>
        <HomeContainer>
          <SetNameWrapper>
            <Input placeholder="Enter your name.." onChange={handleChange} value={name} />
          </SetNameWrapper>
          <HomeButtons>
            <button onClick={handleClick}>button</button>
          </HomeButtons>
        </HomeContainer>
      </Container>
    )
  }

}

export default Home;
