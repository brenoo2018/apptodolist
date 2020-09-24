import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 10px 0 20px;
`;

export const FormTask = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const InputTask = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  color: #eee;
  background: #232129;
  border-radius: 4px;
  padding: 0 15px;
  /* border: 1px solid #eee; */
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #eee;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${(props) => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const Todo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 0 20px 30px;
`;

export const Task = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-top: 4px;
  text-align: center;
`;

export const RemoveTaskButton = styled.TouchableOpacity``;

export const ButtonLogout = styled.TouchableOpacity``;
