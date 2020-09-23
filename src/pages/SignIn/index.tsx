import React from 'react';
import { Image } from 'react-native';

import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Title>To-Do List</Title>
      <Image style={{ width: 64, height: 64 }} source={logoImage} />

      <Title>Faça seu login</Title>

      <Input name="email" icon="mail" placeholder="E-mail" />
      <Input name="password" icon="lock" placeholder="Senha" />

      <Button onPress={() => console.log('foi')}>Entrar</Button>
    </Container>
  );
};

export default SignIn;
