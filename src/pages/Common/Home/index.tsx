import React from 'react';

import {
  Container,
  Background,
  Content,
  Title,
  Buttons,
  Button,
} from './styles';

import userImg from '../../../assets/user.png';
import providerImg from '../../../assets/provider.png';

const Home: React.FC = () => {
  return (
    <Container>
      <Background />
      <Content>
        <Title>Seja bem vindo ao Nail Place</Title>
        <Buttons>
          <Button to="/signin/users">
            <img src={userImg} alt="Acesso do usuário" />
            <h2>Acesso do usuário</h2>
          </Button>

          <Button to="/signin/providers">
            <img src={providerImg} alt="Acesso do prestador" />

            <h2>Acesso do prestador</h2>
          </Button>
        </Buttons>
      </Content>
    </Container>
  );
};

export default Home;
