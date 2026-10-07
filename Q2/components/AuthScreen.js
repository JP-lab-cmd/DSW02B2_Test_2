import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase";

export default function AuthScreen() {
  const [isRegistering, setIsRegistering] = useState(false);

  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const translateFirebaseError = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered.";

      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/weak-password":
        return "Password must be at least 6 characters.";

      case "auth/invalid-credential":
        return "Incorrect email or password.";

      case "auth/user-not-found":
        return "Incorrect email or password.";

      case "auth/wrong-password":
        return "Incorrect email or password.";

      case "auth/network-request-failed":
        return "Network error. Please try again.";

      default:
        return "Authentication failed. Please try again.";
    }
  };

  const handleSubmit = async () => {
    setError("");

    const cleanName = studentName.trim();
    const cleanEmail = email.trim();

    if (isRegistering && !cleanName) {
      setError("Please enter your student name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (loading) {
      return;
    }

    try {
      setLoading(true);

      if (isRegistering) {
        const userCredential =
          await createUserWithEmailAndPassword(
            auth,
            cleanEmail,
            password
          );

        const user = userCredential.user;

        await setDoc(doc(db, "users", user.uid), {
          studentName: cleanName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );
      }
    } catch (error) {
      console.log("AUTH ERROR:", error.code);

      setError(
        translateFirebaseError(error.code)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = () => {
    setIsRegistering(!isRegistering);

    setStudentName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        MYUJ Secure Profile
      </Text>

      <Text style={styles.subtitle}>
        {isRegistering
          ? "Create your student account"
          : "Sign in to your student account"}
      </Text>

      {isRegistering && (
        <TextInput
          style={styles.input}
          placeholder="Student display name"
          value={studentName}
          onChangeText={setStudentName}
          editable={!loading}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        editable={!loading}
      />

      {error !== "" && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}

      <Pressable
        style={[
          styles.submitButton,
          loading && styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitText}>
          {loading
            ? "Please wait..."
            : isRegistering
              ? "Register"
              : "Sign In"}
        </Text>
      </Pressable>

      <Pressable
        onPress={handleModeChange}
        disabled={loading}
      >
        <Text style={styles.switchText}>
          {isRegistering
            ? "Already have an account? Sign in"
            : "Need an account? Register"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    maxWidth: 500,
    width: "100%",
    alignSelf: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderRadius: 7,
    padding: 12,
    marginBottom: 12,
  },

  error: {
    color: "#aa0000",
    marginBottom: 12,
    fontWeight: "bold",
  },

  submitButton: {
    backgroundColor: "#333333",
    padding: 14,
    borderRadius: 7,
    alignItems: "center",
    marginBottom: 15,
  },

  disabledButton: {
    opacity: 0.5,
  },

  submitText: {
    color: "#ffffff",
    fontWeight: "bold",
  },

  switchText: {
    textAlign: "center",
    textDecorationLine: "underline",
  },
});