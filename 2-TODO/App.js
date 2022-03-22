import React, { useState, useEffect } from "react";
// import Todos from "./screens/Todos";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [todos, setTodos] = useState([]);
  var todoItems = [];
  const [todo, setTodo] = useState("");
  const [deleted, setDeleted] = useState([]);

  const setData = async () => {
    try {
      if (todoItems.length !== 0) {
        console.log(todoItems);
        await AsyncStorage.setItem(
          "todos",
          JSON.stringify(JSON.stringify(todoItems))
        );
      } else {
        console.log(todos);
        await AsyncStorage.setItem(
          "todos",
          JSON.stringify(JSON.stringify(todos))
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      console.log(JSON.parse(JSON.parse(jsonValue)));
      setTodos(JSON.parse(JSON.parse(jsonValue)));
    } catch (e) {
      // error reading value
    }
  };

  const addTodo = async () => {
    if (todo !== "") {
      setTodos([...todos, todo]);
      todoItems.push(...todos, todo);
      setData();
      setTodo("");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
    console.log();
    return todos.length !== 0 ? (
      <View style={styles.container}>
        {todos.map((item, i) => {
          return (
            <View style={styles.container2} key={i}>
              <Text style={[styles.text, styles.title]}>{item}</Text>
              <TouchableOpacity
                style={[styles.delete]}
                onPress={() => {
                  setDeleted(todos.splice(i, 1));
                }}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    ) : (
      <View style={styles.noTodos}>
        <Text>No TODOs to display</Text>
      </View>
    );
  }, [deleted]);

  return (
    <View style={styles.parent}>
      <ScrollView style={styles.container}>
        {todos.length !== 0 ? (
          <View style={styles.containerL}>
            {todos.map((item, i) => {
              return (
                <View style={styles.container2} key={i}>
                  <Text style={[styles.text, styles.title]}>{item}</Text>
                  <TouchableOpacity
                    style={[styles.delete]}
                    onPress={() => {
                      setDeleted(todos.splice(i, 1));
                    }}
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        ) : (
          <View style={styles.noTodos}>
            <Text>No TODOs to display</Text>
          </View>
        )}
      </ScrollView>
      <View style={styles.addContainer}>
        <View style={styles.textInput}>
          <TextInput
            value={todo}
            placeholder="Add TODO"
            onChangeText={(text) => setTodo(text)}
          />
        </View>
        <TouchableOpacity
          style={styles.addTodo}
          onPress={() => {
            addTodo();
          }}
        >
          <Text style={styles.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: { height: "100%" },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: "35%",
  },
  containerL: {
    flex: 1,
    height: "100%",
    paddingTop: 25,
    paddingBottom: 40,
    backgroundColor: "#f5f5f5",
  },
  container2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    backgroundColor: "#123456",
    margin: 8,
    padding: 15,
    borderRadius: 15,
    shadowColor: "cyan",
    elevation: 20,
  },
  noTodos: {
    marginTop: "100%",
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 25,
  },
  title: {
    fontSize: 20,
    width: "80%",
    color: "cyan",
    fontWeight: "bold",
  },
  delete: {
    backgroundColor: "#F652A0",
    padding: "2%",
    height: 35,
    borderRadius: 5,
  },
  desc: {
    top: 5,
    fontSize: 16,
  },
  addTodo: {
    backgroundColor: "#00ffff",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    marginBottom: "5%",
    borderRadius: 100,
    elevation: 10,
  },
  addSign: {
    fontSize: 30,
  },
  addContainer: {
    backgroundColor: "#f5f5f5",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  textInput: {
    width: "80%",
    height: "70%",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 25,
    elevation: 10,
  },
});
