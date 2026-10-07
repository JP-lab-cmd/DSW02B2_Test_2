import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import {
  signOut,
} from "firebase/auth";

import { auth, db } from "../firebase";

export default function ProfileScreen({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const profileRef = doc(
          db,
          "users",
          user.uid
        );

        const profileSnapshot = await getDoc(
          profileRef
        );

        if (!profileSnapshot.exists()) {
          if (isMounted) {
            setError("Profile not found.");
            setProfile(null);
          }

          return;
        }

        if (isMounted) {
          setProfile(profileSnapshot.data());
        }
      } catch (error) {
        console.log(
          "PROFILE ERROR:",
          error.code
        );

        if (isMounted) {
          setError(
            "Unable to load your profile."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user.uid]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      await signOut(auth);

      setProfile(null);
    } catch (error) {
      console.log(
        "SIGN OUT ERROR:",
        error.code
      );

      setError(
        "Unable to sign out. Please try again."
      );

      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading profile...
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

        <Pressable
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>
            Sign Out
          </Text>
        </Pressable>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.center}>
        <Text>
          No profile information available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        MYUJ Secure Profile
      </Text>

      <Text style={styles.welcome}>
        Welcome, {profile.studentName}
      </Text>

      <View style={styles.profileCard}>
        <Text style={styles.label}>
          Student Name
        </Text>

        <Text style={styles.value}>
          {profile.studentName}
        </Text>

        <Text style={styles.label}>
          Email
        </Text>

        <Text style={styles.value}>
          {profile.email}
        </Text>
      </View>

      <Pressable
        style={[
          styles.signOutButton,
          signingOut && styles.disabledButton,
        ]}
        onPress={handleSignOut}
        disabled={signingOut}
      >
        <Text style={styles.buttonText}>
          {signingOut ? "Signing out..." : "Sign Out"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    maxWidth: 600,
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  welcome: {
    fontSize: 18,
    marginBottom: 20,
  },

  profileCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontWeight: "bold",
    marginTop: 8,
  },

  value: {
    fontSize: 17,
    marginTop: 4,
  },

  loadingText: {
    marginTop: 10,
  },

  error: {
    color: "#aa0000",
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  signOutButton: {
    backgroundColor: "#aa0000",
    padding: 14,
    borderRadius: 7,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});