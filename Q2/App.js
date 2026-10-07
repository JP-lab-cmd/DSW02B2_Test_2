import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

import AuthScreen from "./components/AuthScreen";
import ProfileScreen from "./components/ProfileScreen";

export default function App() {
  const [user, setUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setAuthChecking(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (authChecking) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Checking authentication...
        </Text>
      </View>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <ProfileScreen user={user} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  loadingText: {
    marginTop: 10,
  },
});