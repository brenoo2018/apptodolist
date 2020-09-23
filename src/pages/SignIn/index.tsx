import React from 'react';
import { View, Text, Image } from 'react-native';

import logoImage from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <View>
      <Text>SignIn</Text>
      <Image source={logoImage} />
    </View>
  );
};

export default SignIn;
