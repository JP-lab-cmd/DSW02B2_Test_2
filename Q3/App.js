import React from "react";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import {
  AppProvider,
  useApp,
} from "./context/AppContext";

import HomeScreen from "./screens/HomeScreen";
import ServicesScreen from "./screens/ServicesScreen";
import SavedServicesScreen from "./screens/SavedServicesScreen";

const Stack =
  createNativeStackNavigator();

function AppNavigation() {
  const {
    isRestoring,
    darkMode,
  } = useApp();

  if (isRestoring) {
    return (
      <View
        style={[
          styles.loadingContainer,
          darkMode && styles.darkContainer,
        ]}
      >
        <ActivityIndicator size="large" />

        <Text
          style={[
            styles.loadingText,
            darkMode && styles.darkText,
          ]}
        >
          Restoring your saved services...
        </Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: darkMode
              ? "#222222"
              : "#ffffff",
          },

          headerTintColor: darkMode
            ? "#ffffff"
            : "#000000",

          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "UJ Campus Services",
          }}
        />

        <Stack.Screen
          name="Services"
          component={ServicesScreen}
          options={{
            title: "Services",
          }}
        />

        <Stack.Screen
          name="SavedServices"
          component={SavedServicesScreen}
          options={{
            title: "Saved Services",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppNavigation />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },

  darkContainer: {
    backgroundColor: "#121212",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },

  darkText: {
    color: "#ffffff",
  },
});