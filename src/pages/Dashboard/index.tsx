import React, { useState, useEffect } from 'react';
import { Keyboard, ActivityIndicator, Alert, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  InputTask,
  SubmitButton,
  FormTask,
  Title,
  List,
  Todo,
  Task,
  RemoveTaskButton,
  Header,
  ButtonLogout,
} from './styles';

interface Task {
  uuid: string;
  task: string;
  user_uuid: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [newTask, setNewTasK] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    async function loadTasksApi() {
      try {
        api.defaults.headers.Authorization = `Bearer ${user.token}`;
        const response = await api.get('/todos');
        const todos = response.data;
        setTasks(todos);
      } catch (error) {
        console.log(error);
      }
    }

    loadTasksApi();
  }, []);

  async function handleAddTask(): Promise<void> {
    try {
      if (!newTask) {
        return;
      }
      setLoading(true);
      api.defaults.headers.Authorization = `Bearer ${user.token}`;
      const response = await api.post<Task>('/todos/create', { task: newTask });

      const todo = response.data;

      setTasks(todo);
      setNewTasK('');
      setLoading(false);
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleRemoveTask(id: string): Promise<void> {
    try {
      const response = await api.delete(`/todos/delete/${id}`);
      if (response.data.message === 'Success') {
        Alert.alert('Registro deletado com sucesso');
      }

      const tasksBeforeDeleted = tasks.filter((task) => task.uuid !== id);
      setTasks(tasksBeforeDeleted);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Title>Olá {user.user.username}</Title>
        <ButtonLogout onPress={signOut}>
          <Title>Sair</Title>
        </ButtonLogout>
      </View>

      <FormTask>
        <InputTask
          placeholder="Adicionar tarefa"
          value={newTask}
          onChangeText={(text) => setNewTasK(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddTask}
        />

        <SubmitButton loading={loading} onPress={handleAddTask}>
          {loading ? (
            <ActivityIndicator color="#999" />
          ) : (
            <Icon name="plus" size={20} color="#c53030" />
          )}
        </SubmitButton>
      </FormTask>

      <List
        data={tasks}
        keyExtractor={(task) => task.uuid}
        renderItem={({ item }) => (
          <Todo>
            <Task>{item.task}</Task>
            <RemoveTaskButton onPress={() => handleRemoveTask(item.uuid)}>
              <Icon name="trash" size={20} color="#c53030" />
            </RemoveTaskButton>
          </Todo>
        )}
      />
    </Container>
  );
};

export default Dashboard;
