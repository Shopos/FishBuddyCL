import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
const Regiones = [
  "Todas",
  "Región de Arica y Parinacota",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana",
  "Región de O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región de Biobío",
  "Región de La Araucanía",
  "Región de los Ríos",
  "Región de los Lagos",
  "Región de Aysén",
  "Región de Magallanes y la Antártica Chilena",
];

interface selectorRegionProp {
  seleccionada: string | null;
  alCambiar: (region: string | null) => void;
}

/** * Filtro de regiones para la colección de especies.
 * * Este componente renderiza una barra de selección horizontal. No filtra los datos
 * directamente, sino que notifica al componente padre qué región ha sido seleccionada.
 * * @param seleccionada - El nombre de la región activa actualmente (o null para "Todas").
 * @param alCambiar - Función callback que recibe el nombre de la región seleccionada para
 *                    actualizar el estado global.
 */
export default function SelectorRegion({
  seleccionada,
  alCambiar,
}: selectorRegionProp) {
  const [modalMenu, setModalMenu] = useState(false);

  const seleccionarReg = (reg: string) => {
    alCambiar(reg === "Todas" ? null : reg);
    setModalMenu(false);
  };
  return (
    <View style={styles.wrapper}>
      {/* El botón que parece un campo de selección */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalMenu(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>
          {seleccionada ? seleccionada : "Filtrar por Región"}
        </Text>
        <MaterialCommunityIcons name="chevron-down" size={20} color="#006064" />
      </TouchableOpacity>

      {/* Menú Desplegable (Modal) */}
      <Modal
        visible={modalMenu}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalMenu(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalMenu(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Selecciona una Región</Text>
            <FlatList
              data={Regiones}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const esActiva =
                  (item === "Todas" && !seleccionada) || seleccionada === item;
                return (
                  <TouchableOpacity
                    style={[styles.item, esActiva && styles.itemActivo]}
                    onPress={() => seleccionarReg(item)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        esActiva && styles.itemTextActivo,
                      ]}
                    >
                      {item}
                    </Text>
                    {esActiva && (
                      <MaterialCommunityIcons
                        name="check"
                        size={18}
                        color="#fff"
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    alignSelf: "center",
    marginBottom: 10,
  },
  dropdownButton: {
    height: 45,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 25, // Forma de cápsula para combinar con tus iconos
    borderWidth: 1,
    borderColor: "#b2ebf2",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#006064",
    fontSize: 14,
    fontWeight: "600",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo oscuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "85%",
    maxHeight: "60%",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 15,
    elevation: 5,
  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#006064",
    textAlign: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0f7fa",
    paddingBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f0f0f0",
  },
  itemActivo: {
    backgroundColor: "#006064",
  },
  itemText: {
    fontSize: 14,
    color: "#333",
  },
  itemTextActivo: {
    color: "#fff",
    fontWeight: "bold",
  },
});
