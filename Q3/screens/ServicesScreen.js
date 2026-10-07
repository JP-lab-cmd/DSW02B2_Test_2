import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import services from "../data/services";

import { useApp } from "../context/AppContext";

export default function ServicesScreen() {
  const {
    savedServices,
    addSavedService,
    removeSavedService,
    darkMode,
  } = useApp();

  const isServiceSaved = (serviceId) => {
    return savedServices.some(
      (service) => service.id === serviceId
    );
  };

  const renderService = ({
    item,
  }) => {
    const saved = isServiceSaved(item.id);

    return (
      <View
        style={[
          styles.serviceCard,
          darkMode && styles.darkCard,
        ]}
      >
        <Text
          style={[
            styles.serviceName,
            darkMode && styles.darkText,
          ]}
        >
          {item.name}
        </Text>

        <Text
          style={[
            styles.serviceDescription,
            darkMode && styles.darkSecondaryText,
          ]}
        >
          {item.description}
        </Text>

        <Pressable
          style={[
            styles.button,
            saved && styles.removeButton,
          ]}
          onPress={() => {
            if (saved) {
              removeSavedService(item.id);
            } else {
              addSavedService(item);
            }
          }}
        >
          <Text style={styles.buttonText}>
            {saved
              ? "Remove from Saved"
              : "Save Service"}
          </Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        darkMode && styles.darkContainer,
      ]}
    >
      <Text
        style={[
          styles.heading,
          darkMode && styles.darkText,
        ]}
      >
        Available Services
      </Text>

      <Text
        style={[
          styles.info,
          darkMode && styles.darkSecondaryText,
        ]}
      >
        Saved services:{" "}
        {savedServices.length}
      </Text>

      <FlatList
        data={services}
        keyExtractor={(item) => item.id}
        renderItem={renderService}
        contentContainerStyle={
          styles.listContent
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },

  darkContainer: {
    backgroundColor: "#121212",
  },

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 5,
  },

  info: {
    marginBottom: 15,
    fontSize: 15,
  },

  darkText: {
    color: "#ffffff",
  },

  darkSecondaryText: {
    color: "#cccccc",
  },

  listContent: {
    paddingBottom: 20,
  },

  serviceCard: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
  },

  darkCard: {
    backgroundColor: "#222222",
    borderColor: "#555555",
  },

  serviceName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  serviceDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },

  button: {
    backgroundColor: "#333333",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  removeButton: {
    backgroundColor: "#777777",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});