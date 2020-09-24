import React from 'react';
import { Text, Button } from 'react-native';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  console.log(user);
  return (
    <Container>
      <Text>Olá Dashboard</Text>
      <Button onPress={signOut} title="Sair" />
    </Container>
  );
};

export default Dashboard;
