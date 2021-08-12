import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Todo from "./components/Todo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    fetchTodo()
    return () => {

    }
  }, [])
  useEffect(() => {
    storeTodo(todos)
    return () => {

    }
  }, [todos])

  const fetchTodo = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? setTodos(JSON.parse(jsonValue)) : null;
    } catch (e) {
      // error reading value
    }
  }
  console.log(todos);

  const date = () => {
    var created = new Date()
    return created.toLocaleString("en-IN", { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true, day: 'numeric', month: 'numeric', year: 'numeric' })
  }

  const handleAddTodo = () => {
    setTodos([...todos, {
      text: text,
      date: date(),
      completed: false,
      id: Math.floor(Math.random() * 1000).toString()
    }])
    setText('')
  }
  const storeTodo = async (todos) => {
    try {
      const jsonValue = JSON.stringify(todos)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.titleText}>Todos</Text>
      <View style={styles.todoList}>
        <FlatList
          data={todos}
          renderItem={({ item }) => (
            <Todo item={item} todos={todos} setTodos={setTodos} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <KeyboardAvoidingView style={styles.inputSection}>
        <TextInput value={text} onChangeText={(val) => setText(val)} style={styles.inputText} placeholder="Enter todo" />
        <TouchableOpacity
          onPress={handleAddTodo}
        >
          <View style={styles.inputBtn}>
            <Text>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "coral",

  },
  todoList: {
    marginBottom: 163,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7
  },
  titleText: {
    fontSize: 50,
    color: "white",
    marginHorizontal: 30,
    marginTop: 30
  },
  inputSection: {
    position: "absolute",
    bottom: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",

  },
  inputText: {
    backgroundColor: "whitesmoke",
    width: 300,
    borderColor: "whitesmoke",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5
  },
  inputBtn: {
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7
  }
});
