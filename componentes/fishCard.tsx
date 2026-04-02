import { MaterialCommunityIcons } from "@expo/vector-icons"; // O cualquier librería de iconos
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Especie } from "../app/colection";

interface FishCardProps {
  especie: Especie;
  onPress: () => void;
}

const { width } = Dimensions.get("window");
const gap = 10;
const itemSize = (width - gap * 4) / 3;
const circleSize = 25;
export default function FishCard({ especie, onPress }: FishCardProps) {
  const abreviarOrigen = (origen: string) => {
    const texto = origen.toLowerCase();
    if (texto.includes("Introducido")) return "INT";
    if (texto.includes("Nativo")) return "NAT";
    if (texto.includes("Endémico")) return "END";
    else return origen.substring(0, 3).toUpperCase(); //Por si llega algo raro
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      {/* Sección Superior: Iconos */}
      <View style={styles.header}>
        <View style={styles.circuloIcono}>
          <MaterialCommunityIcons name="fish" size={20} color="#006064" />
        </View>

        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.nombreComun}>
          {especie.Común}
        </Text>

        <View style={styles.circuloTexto}>
          <Text style={styles.textoBadge}>
            {abreviarOrigen(especie.Origen || "III")}
          </Text>
        </View>
      </View>

      {/* Sección Inferior: El recuadro de información */}
      <View style={styles.infoContainer}>
        <View style={styles.divisor} />

        <Text style={styles.datoSimple}>
          <Text style={{ fontWeight: "bold" }}>Estado: </Text>
          {especie.Estado}
        </Text>
        <Text style={styles.datoSimple}>
          <Text style={{ fontWeight: "bold" }}>Nombre Científico: </Text>
          {especie.Científico}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    width: itemSize,
    margin: gap / 2,
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: "#b2ebf2",
    alignItems: "center",
    elevation: 2,
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  circuloIcono: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#006064",
    flexShrink: 0, // 👈 evita que se comprima
  },

  circuloTexto: {
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#006064",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#006064",
    paddingHorizontal: 6,
    flexShrink: 0, // 👈 evita deformación
  },
  textIntroducido: {
    color: "#fff",
    fontSize: 9, // Texto pequeño para 3 columnas
    fontWeight: "bold",
  },
  infoContainer: {
    flex: 1, // Ocupa el espacio restante
    marginTop: circleSize / 2, // Espacio para que el header no lo tape
    padding: 8, // Margen interno
  },
  nombreComun: {
    flex: 1, // ocupa solo el espacio disponible
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginHorizontal: 5,
    maxWidth: "55%",
  },
  textoBadge: {
    color: "#fff",
    fontSize: 8,
    fontWeight: "bold",
  },
  divisor: {
    height: 1,
    backgroundColor: "#006064",
    marginVertical: 8,
    opacity: 0.2,
  },
  datoSimple: {
    fontSize: 10,
    color: "#555",
    marginBottom: 2,
  },
});
