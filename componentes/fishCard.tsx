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
          <MaterialCommunityIcons name="fish" size={24} color="#006064" />
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
    width: itemSize, // Ancho fijo basado en la pantalla
    height: "auto",
    margin: gap / 2, // Margen pequeño para separar
    borderRadius: 8,
    padding: 5,
    borderWidth: 1,
    borderColor: "#b2ebf2",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
  },
  header: {
    position: "absolute", // Header "flota" sobre la tarjeta
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Alineación a los extremos izquierdo y derecho
    paddingHorizontal: 8, // No padding para que toquen los bordes de la tarjeta
    width: "100%",
    paddingVertical: 3,
    paddingLeft: 5,
    paddingRight: 5,
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
    marginLeft: 0, // Toca el borde izquierdo de la tarjeta
  },
  circuloTexto: {
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: "#006064", // Color de fondo según diseño (Introducido)
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#006064",
    marginRight: 0, // Toca el borde derecho de la tarjeta
    paddingHorizontal: 8,
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
    fontSize: 12, // Texto pequeño para que no se desborde
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
    marginHorizontal: 2,
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
