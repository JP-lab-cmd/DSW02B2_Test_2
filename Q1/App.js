import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  collection,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    const tasksRef = collection(db, "tasks");

    const unsubscribe = onSnapshot(
      tasksRef,

      (snapshot) => {
        const taskList = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));

        console.log("TASKS:", taskList);

        setTasks(taskList);
        setLoading(false);
        setError("");
      },

      (error) => {
        console.log("FIREBASE ERROR:", error.code);
        console.log("FIREBASE MESSAGE:", error.message);

        setError(
          "Unable to load tasks. Please check your Firestore connection."
        );

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleToggleTask = async (taskId, currentCompleted) => {
    setActionError("");

    try {
      const taskRef = doc(db, "tasks", taskId);

      await updateDoc(taskRef, {
        completed: !currentCompleted,
      });
    } catch (error) {
      console.log("UPDATE TASK ERROR:", error);

      setActionError(
        "Unable to update the task. Please try again."
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    setActionError("");

    try {
      const taskRef = doc(db, "tasks", taskId);

      await deleteDoc(taskRef);
    } catch (error) {
      console.log("DELETE TASK ERROR:", error);

      setActionError(
        "Unable to delete the task. Please try again."
      );
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading tasks...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        UJ Student Task Hub
      </Text>

      <Text style={styles.subtitle}>
        Manage your academic tasks
      </Text>

      <TaskForm />

      {actionError !== "" && (
        <Text style={styles.error}>
          {actionError}
        </Text>
      )}

      <Text style={styles.taskCount}>
        Number of tasks: {tasks.length}
      </Text>

      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        onDelete={handleDeleteTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#f5f5f5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },

  loadingText: {
    marginTop: 10,
  },

  taskCount: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  error: {
    color: "#aa0000",
    fontWeight: "bold",
    marginBottom: 10,
  },
});