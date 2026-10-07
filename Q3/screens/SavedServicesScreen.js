import React from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";

import { useApp } from "../context/AppContext";

export default function SavedServicesScreen() {
  const {
    savedServices,
    removeSavedService,
    darkMode,
  } = useApp();

  const renderSavedService = ({
    item,
  }) => {
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
            styles.description,
            darkMode && styles.darkSecondaryText,
          ]}
        >
          {item.description}
        </Text>

        <Pressable
          style={styles.removeButton}
          onPress={() =>
            removeSavedService(item.id)
          }
        >
          <Text style={styles.buttonText}>
            Remove
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
        Saved Services
      </Text>

      {savedServices.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text
            style={[
              styles.emptyTitle,
              darkMode && styles.darkText,
            ]}
          >
            No saved services
          </Text>

          <Text
            style={[
              styles.emptyMessage,
              darkMode &&
                styles.darkSecondaryText,
            ]}
          >
            You have not saved any campus
            services yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedServices}
          keyExtractor={(item) => item.id}
          renderItem={renderSavedService}
          contentContainerStyle={
            styles.listContent
          }
        />
      )}
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
    marginBottom: 20,
  },

  darkText: {
    color: "#ffffff",
  },

  darkSecondaryText: {
    color: "#cccccc",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },

  emptyMessage: {
    textAlign: "center",
    fontSize: 16,
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

  description: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },

  removeButton: {
    backgroundColor: "#aa0000",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});