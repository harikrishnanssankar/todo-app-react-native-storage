import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Todo = ({ item, todos, setTodos }) => {
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== item.id));
  };
  return (
    <View style={styles.todoContainer}>
      <View>
        <Text style={styles.todoText}>{item.text}</Text>
        <Text>{item.date}</Text>
      </View>
      <TouchableOpacity onPress={deleteHandler}>
        <View style={styles.deleteBtn}>
          <Text style={styles.deleteBtnText}>Delete</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "whitesmoke",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 7,
    
  },
  todoText: {
    fontSize: 18,
    color: "black",
    maxWidth:320

  },
  deleteBtn: {
    backgroundColor: "red",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  deleteBtnText: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
});
