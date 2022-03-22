import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index({ items }) {
  const [todos, setTodos] = useState(items);
  const [deleted, setDeleted] = useState([]);

  const setData = async () => {
    try {
      await AsyncStorage.setItem(
        "todos",
        JSON.stringify(JSON.stringify(items))
      );
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      const parsed = JSON.parse(JSON.parse(jsonValue));
      setTodos(parsed);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, [todos]);

  useEffect(() => {
    setData();
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    paddingTop: 25,
    paddingBottom: 25,
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
});
