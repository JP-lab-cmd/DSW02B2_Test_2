import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";

import AlertCard from "./components/AlertCard";

const alerts = [
  {
    id: "alert-001",
    title: "Library Closure",
    message:
      "The library will close at 18:00 today.",
  },
  {
    id: "alert-002",
    title: "ICT Maintenance",
    message:
      "ICT services will undergo scheduled maintenance tonight.",
  },
  {
    id: "alert-003",
    title: "Campus Shuttle",
    message:
      "The campus shuttle schedule has been updated.",
  },
  {
    id: "alert-004",
    title: "Career Fair",
    message:
      "The annual UJ Career Fair will take place this Friday.",
  },
];

export default function App() {
  const [saved, setSaved] = useState([]);

  /*
   * Add or remove an alert ID without
   * mutating the existing state array.
   */
  function toggleSaved(id) {
    setSaved((currentSaved) => {
      const alreadySaved =
        currentSaved.includes(id);

      if (alreadySaved) {
        return currentSaved.filter(
          (savedId) => savedId !== id
        );
      }

      return [...currentSaved, id];
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        UJ Campus Alert Centre
      </Text>

      <Text style={styles.savedCount}>
        Saved Alerts: {saved.length}
      </Text>

      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AlertCard
            item={item}
            saved={saved.includes(item.id)}
            toggleSaved={toggleSaved}
          />
        )}
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

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  savedCount: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },

  listContent: {
    paddingBottom: 20,
  },
});