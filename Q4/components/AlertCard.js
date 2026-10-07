import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  Text,
  Pressable,
  Animated,
  StyleSheet,
} from "react-native";

export default function AlertCard({
  item,
  saved,
  toggleSaved,
}) {
  /*
   * useRef ensures that the Animated.Value
   * is created only once for this mounted card.
   */
  const opacity = useRef(
    new Animated.Value(0)
  ).current;

  const translateY = useRef(
    new Animated.Value(20)
  ).current;

  /*
   * The entrance animation runs once when
   * the card is mounted.
   */
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),

      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        saved && styles.savedCard,
        {
          opacity: opacity,
          transform: [
            {
              translateY: translateY,
            },
          ],
        },
      ]}
    >
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            saved && styles.savedTitle,
          ]}
        >
          {item.title}
        </Text>

        <Text
          style={[
            styles.message,
            saved && styles.savedMessage,
          ]}
        >
          {item.message}
        </Text>

        <Pressable
          style={[
            styles.button,
            saved && styles.unsaveButton,
          ]}
          onPress={() =>
            toggleSaved(item.id)
          }
        >
          <Text style={styles.buttonText}>
            {saved
              ? "Remove from Saved"
              : "Save Alert"}
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 10,
    padding: 18,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
  },

  savedCard: {
    backgroundColor: "#e8f5e9",
    borderColor: "#2e7d32",
    borderWidth: 2,
  },

  content: {
    width: "100%",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },

  savedTitle: {
    color: "#2e7d32",
  },

  message: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 15,
  },

  savedMessage: {
    color: "#333333",
  },

  button: {
    backgroundColor: "#333333",
    padding: 12,
    borderRadius: 7,
    alignItems: "center",
  },

  unsaveButton: {
    backgroundColor: "#777777",
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});