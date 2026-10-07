import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import TaskCard from "./TaskCard";

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
}) {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No tasks found.
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskCard
          task={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },

  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
  },
});