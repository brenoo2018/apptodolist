import React, { useRef, useCallback, useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImage from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
  TextError,
} from './styles';

interface SignUpFormatData {
  username: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [errorForm, setErrorForm] = useState<SignUpFormatData>(
    {} as SignUpFormatData,
  );
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSignUp = useCallback(async (data: SignUpFormatData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        username: Yup.string().required('Nome de usuário obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No mínimo 6 dígitos'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // console.log(data);

      // await api.post('/users', data);

      Alert.alert(
        'Cadastro realizado com sucesso !',
        'você já pode fazer login na aplicação.',
      );

      navigation.navigate('SignIn');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        console.log(errors);

        const { username, email, password } = errors;

        setErrorForm({ username, email, password });

        return;
      }
      Alert.alert(
        'Erro no Cadastro',
        'Ocorreu um erro ao fazer o cadastro, tente novamente',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Title>To-Do List</Title>
            <Image style={{ width: 64, height: 64 }} source={logoImage} />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleSignUp}
            >
              {errorForm.username && (
                <TextError>
                  {formRef.current?.getFieldError('username')}
                </TextError>
              )}
              <Input
                name="username"
                icon="user"
                placeholder="Nome de usuário"
                autoCapitalize="words"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              {errorForm.email && (
                <TextError>{formRef.current?.getFieldError('email')}</TextError>
              )}
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="E-mail"
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              {errorForm.password && (
                <TextError>
                  {formRef.current?.getFieldError('password')}
                </TextError>
              )}
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#f4ede8" />
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
