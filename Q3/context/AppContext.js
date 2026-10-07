import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AppContext = createContext(null);

const SAVED_SERVICES_KEY = "@uj_campus_services/saved_services";
const DARK_MODE_KEY = "@uj_campus_services/dark_mode";

export function AppProvider({ children }) {
  const [savedServices, setSavedServices] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [isRestoring, setIsRestoring] = useState(true);

  /*
   * Restore saved services and preference
   * when the application starts.
   */
  useEffect(() => {
    const restoreAppState = async () => {
      try {
        const savedServicesValue =
          await AsyncStorage.getItem(
            SAVED_SERVICES_KEY
          );

        const darkModeValue =
          await AsyncStorage.getItem(
            DARK_MODE_KEY
          );

        if (savedServicesValue !== null) {
          try {
            const parsedServices =
              JSON.parse(savedServicesValue);

            if (Array.isArray(parsedServices)) {
              setSavedServices(parsedServices);
            }
          } catch (parseError) {
            console.log(
              "Unable to parse saved services."
            );

            setSavedServices([]);
          }
        }

        if (darkModeValue !== null) {
          setDarkMode(darkModeValue === "true");
        }
      } catch (error) {
        console.log(
          "Unable to restore application state:",
          error
        );
      } finally {
        setIsRestoring(false);
      }
    };

    restoreAppState();
  }, []);

  /*
   * Save savedServices whenever the value changes.
   */
  useEffect(() => {
    if (isRestoring) {
      return;
    }

    const persistSavedServices = async () => {
      try {
        const serializedServices =
          JSON.stringify(savedServices);

        await AsyncStorage.setItem(
          SAVED_SERVICES_KEY,
          serializedServices
        );
      } catch (error) {
        console.log(
          "Unable to save saved services:",
          error
        );
      }
    };

    persistSavedServices();
  }, [savedServices, isRestoring]);

  /*
   * Save the application preference.
   */
  useEffect(() => {
    if (isRestoring) {
      return;
    }

    const persistDarkMode = async () => {
      try {
        await AsyncStorage.setItem(
          DARK_MODE_KEY,
          String(darkMode)
        );
      } catch (error) {
        console.log(
          "Unable to save dark mode preference:",
          error
        );
      }
    };

    persistDarkMode();
  }, [darkMode, isRestoring]);

  /*
   * Add a service without creating duplicates.
   */
  const addSavedService = (service) => {
    setSavedServices((currentServices) => {
      const alreadySaved = currentServices.some(
        (savedService) =>
          savedService.id === service.id
      );

      if (alreadySaved) {
        return currentServices;
      }

      return [...currentServices, service];
    });
  };

  /*
   * Remove a service immutably.
   */
  const removeSavedService = (serviceId) => {
    setSavedServices((currentServices) =>
      currentServices.filter(
        (service) => service.id !== serviceId
      )
    );
  };

  /*
   * Change global application preference.
   */
  const toggleDarkMode = () => {
    setDarkMode((currentValue) => !currentValue);
  };

  const value = {
    savedServices,
    addSavedService,
    removeSavedService,
    darkMode,
    toggleDarkMode,
    isRestoring,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

/*
 * Reusable access pattern for the Context.
 */
export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used inside AppProvider."
    );
  }

  return context;
}