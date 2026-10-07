import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import { useApp } from "../context/AppContext";

export default function HomeScreen({
  navigation,
}) {
  const {
    savedServices,
    darkMode,
    toggleDarkMode,
  } = useApp();

  const savedCount =
    savedServices.length;

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >
      <Text
        style={[
          styles.title,
          darkMode && styles.darkText,
        ]}
      >
        UJ Campus Services
      </Text>

      <Text
        style={[
          styles.subtitle,
          darkMode && styles.darkSecondaryText,
        ]}
      >
        Welcome to My Services
      </Text>

      <View
        style={[
          styles.counterCard,
          darkMode && styles.darkCard,
        ]}
      >
        <Text
          style={[
            styles.counterLabel,
            darkMode && styles.darkSecondaryText,
          ]}
        >
          Saved Services
        </Text>

        <Text
          style={[
            styles.counter,
            darkMode && styles.darkText,
          ]}
        >
          {savedCount}
        </Text>

        <Text
          style={[
            styles.counterDescription,
            darkMode && styles.darkSecondaryText,
          ]}
        >
          {savedCount === 0
            ? "No services saved yet."
            : savedCount === 1
              ? "1 service saved"
              : `${savedCount} services saved`}
        </Text>
      </View>

      <Pressable
        style={styles.primaryButton}
        onPress={() =>
          navigation.navigate("Services")
        }
      >
        <Text style={styles.buttonText}>
          Browse Services
        </Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() =>
          navigation.navigate(
            "SavedServices"
          )
        }
      >
        <Text
          style={[
            styles.secondaryButtonText,
            darkMode &&
              styles.darkSecondaryButtonText,
          ]}
        >
          View Saved Services
        </Text>
      </Pressable>

      <View
        style={[
          styles.preferenceCard,
          darkMode && styles.darkCard,
        ]}
      >
        <Text
          style={[
            styles.preferenceTitle,
            darkMode && styles.darkText,
          ]}
        >
          Interface Preference
        </Text>

        <Text
          style={[
            styles.preferenceText,
            darkMode && styles.darkSecondaryText,
          ]}
        >
          Current mode:{" "}
          {darkMode ? "Dark" : "Light"}
        </Text>

        <Pressable
          style={styles.preferenceButton}
          onPress={toggleDarkMode}
        >
          <Text style={styles.buttonText}>
            Switch to{" "}
            {darkMode ? "Light" : "Dark"} Mode
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#ffffff",
  },

  darkContainer: {
    backgroundColor: "#121212",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    marginBottom: 25,
  },

  darkText: {
    color: "#ffffff",
  },

  darkSecondaryText: {
    color: "#cccccc",
  },

  counterCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },

  darkCard: {
    backgroundColor: "#222222",
    borderColor: "#555555",
  },

  counterLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },

  counter: {
    fontSize: 48,
    fontWeight: "bold",
    marginVertical: 5,
  },

  counterDescription: {
    fontSize: 14,
  },

  primaryButton: {
    backgroundColor: "#333333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: "#333333",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButtonText: {
    color: "#333333",
    fontWeight: "bold",
    fontSize: 16,
  },

  darkSecondaryButtonText: {
    color: "#ffffff",
  },

  preferenceCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 18,
    marginTop: 10,
  },

  preferenceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  preferenceText: {
    marginBottom: 12,
  },

  preferenceButton: {
    backgroundColor: "#555555",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
  },
});