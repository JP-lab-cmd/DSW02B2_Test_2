import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

export default function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [moduleCode, setModuleCode] = useState("");
  const [priority, setPriority] = useState("Low");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleAddTask = async () => {
    setError("");

    const cleanTitle = title.trim();
    const cleanModuleCode = moduleCode.trim();

    if (!cleanTitle) {
      setError("Please enter a task title.");
      return;
    }

    if (!cleanModuleCode) {
      setError("Please enter a module code.");
      return;
    }

    try {
      setSaving(true);

      await addDoc(collection(db, "tasks"), {
        title: cleanTitle,
        moduleCode: cleanModuleCode,
        priority: priority,
        completed: false,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setModuleCode("");
      setPriority("Low");

      if (onTaskAdded) {
        onTaskAdded();
      }
    } catch (error) {
      console.log("ADD TASK ERROR:", error);

      setError(
        "Unable to add the task. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Add Task
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Task title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Module code"
        value={moduleCode}
        onChangeText={setModuleCode}
      />

      <Text style={styles.label}>
        Priority
      </Text>

      <View style={styles.priorityContainer}>
        <Pressable
          style={[
            styles.priorityButton,
            priority === "Low" && styles.selected,
          ]}
          onPress={() => setPriority("Low")}
        >
          <Text>Low</Text>
        </Pressable>

        <Pressable
          style={[
            styles.priorityButton,
            priority === "Medium" && styles.selected,
          ]}
          onPress={() => setPriority("Medium")}
        >
          <Text>Medium</Text>
        </Pressable>

        <Pressable
          style={[
            styles.priorityButton,
            priority === "High" && styles.selected,
          ]}
          onPress={() => setPriority("High")}
        >
          <Text>High</Text>
        </Pressable>
      </View>

      {error !== "" && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable
        style={styles.addButton}
        onPress={handleAddTask}
        disabled={saving}
      >
        <Text style={styles.addButtonText}>
          {saving ? "Adding..." : "Add Task"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#ffffff",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  priorityContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  },

  priorityButton: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 6,
  },

  selected: {
    backgroundColor: "#dddddd",
  },

  error: {
    color: "#aa0000",
    marginBottom: 10,
    fontWeight: "bold",
  },

  addButton: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#333333",
    alignItems: "center",
  },

  addButtonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});