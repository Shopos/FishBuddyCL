import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const diseñoMenuGlobal = {
    headerShown: false,
    tabBarActiveTintColor: "#1e272e", // El color cuando está seleccionado
    tabBarInactiveTintColor: "#95a5a6",
    tabBarActiveBackgroundColor: "#2ecc71",
    tabBarInactiveBackgroundColor: "transparent",

    // 1. EL CONTENEDOR PRINCIPAL
    tabBarStyle: {
      backgroundColor: "#1e272e",
      elevation: 10,
      height: 60 + insets.bottom,
      paddingBottom: insets.bottom,
    },
    //DISEÑO DE CADA BOTÓN
    tabBarItemStyle: {
      borderWidth: 1, // Grosor del borde de cada tab
      borderColor: "#474747", // Un color gris/azulado sutil para el borde
    },

    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: "bold" as const,
    },
  };

  return (
    <Tabs screenOptions={diseñoMenuGlobal}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="catch"
        options={{
          title: "Captura",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fish-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="colection"
        options={{
          title: "Colección",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: "Usuario",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
