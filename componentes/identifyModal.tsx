import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import fishData from "../assets/data/data.json"; // Tu base de datos

interface ModalIdentificacionProps {
  visible: boolean;
  onSelect: (especie: any) => void;
  onClose: () => void;
}

export default function IdentifyModal({
  visible,
  onSelect,
  onClose,
}: ModalIdentificacionProps) {
  const [busqueda, setBusqueda] = useState("");

  // Filtramos la lista de peces según lo que escriba el usuario
  const pecesFiltrados = fishData.filter(
    (p) =>
      p.Común.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.Científico.toLowerCase().includes(busqueda.toLowerCase()),
  );

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.titulo}>¿Qué especie es?</Text>

          <View style={styles.searchBox}>
            <MaterialCommunityIcons name="magnify" size={20} color="#006064" />
            <TextInput
              placeholder="Buscar por nombre..."
              style={styles.input}
              value={busqueda}
              onChangeText={setBusqueda}
            />
          </View>

          <FlatList
            data={pecesFiltrados}
            keyExtractor={(item) => item.Científico}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.nombreComun}>{item.Común}</Text>
                <Text style={styles.nombreCientifico}>{item.Científico}</Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 400 }}
          />

          <TouchableOpacity style={styles.botonCerrar} onPress={onClose}>
            <Text style={styles.textoCerrar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#006064",
    marginBottom: 15,
    textAlign: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fbfc",
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  input: { flex: 1, height: 40, marginLeft: 5, color: "#006064" },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  nombreComun: { fontWeight: "bold", color: "#333" },
  nombreCientifico: { fontSize: 12, color: "#006064", fontStyle: "italic" },
  botonCerrar: { marginTop: 15, padding: 10, alignItems: "center" },
  textoCerrar: { color: "red", fontWeight: "bold" },
});
