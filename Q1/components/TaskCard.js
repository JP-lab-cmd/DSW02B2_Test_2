import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <View style={[styles.card, task.completed && styles.completedCard]}>
      
      <View style={styles.info}>
        <Text style={[styles.title, task.completed && styles.completedText]}>
          {task.title}
        </Text>

        <Text style={styles.module}>
          Module: {task.moduleCode}
        </Text>

        <Text style={styles.priority}>
          Priority: {task.priority}
        </Text>

        <Text style={styles.status}>
          Status: {task.completed ? "Completed" : "Incomplete"}
        </Text>
      </View>

      <View style={styles.buttons}>
        <Pressable
          style={styles.completeButton}
          onPress={() => onToggle(task.id, task.completed)}
        >
          <Text style={styles.buttonText}>
            {task.completed ? "Mark Incomplete" : "Complete"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => onDelete(task.id)}
        >
          <Text style={styles.buttonText}>
            Delete
          </Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },

  completedCard: {
    opacity: 0.65,
  },

  info: {
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  completedText: {
    textDecorationLine: "line-through",
  },

  module: {
    marginBottom: 4,
  },

  priority: {
    marginBottom: 4,
  },

  status: {
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    gap: 8,
  },

  completeButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#333333",
  },

  deleteButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#aa0000",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});