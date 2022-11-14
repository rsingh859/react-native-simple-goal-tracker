import React, { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const startAddGoalHandler = () => {
    setModalIsVisible(true);
  };

  const endGoalHandler = () => {
    setModalIsVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currCourseGoals) => [
      ...currCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endGoalHandler();
  };

  const deleteHandler = (id) => {
    setCourseGoals((currCourseGoals) => {
      return currCourseGoals.filter((goal) => goal.id !== id);
    });
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.addNewGoalButton}>
          <Button
            title="Add new Goal"
            color="#56309c"
            onPress={startAddGoalHandler}
          />
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modalIsVisible}
          onCancel={endGoalHandler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  onDeleteItem={deleteHandler}
                  id={itemData.item.id}
                />
              );
            }}
            keyExtractor={(item, idx) => item.id}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
  addNewGoalButton: {
    marginVertical: 24,
    borderRadius: 8,
  }
});
