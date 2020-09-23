import React from 'react';
import { View, Text, Image } from 'react-native';

import logoImage from '../../assets/logo.png';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Title>To-Do List</Title>
      <Image source={logoImage} />

      <Title>Faça seu login</Title>
    </Container>
  );
};

export default SignIn;
