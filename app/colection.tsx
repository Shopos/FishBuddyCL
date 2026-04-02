import React, { useEffect, useState } from "react"; // Importamos useState
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import fishData from "../assets/data/data.json";
import FiltroRegion from "../componentes/filtroRegion";
import FishCard from "../componentes/fishCard";
import FishModal from "../componentes/fishModal";

export interface Especie {
  Científico: string;
  Común: string;
  Estado: string;
  Origen: string;
  Regiones: string;
  Habitad: string;
  Carnada: string;
  Fotos: string;
  Descripcion: string;
  Genero: string;
}

export default function AjustesScreen() {
  const [listaEspecies, setListaEspecies] = useState<Especie[]>([]);
  const [listaSeleccionada, setListaSeleccionada] = useState<string | null>(
    null,
  );
  const [cargando, setCargando] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [seleccionado, setSeleccionado] = useState<Especie | null>(null);

  const abrirDetalle = (especie: Especie) => {
    setSeleccionado(especie);
    setModalVisible(true);
  };

  // useEffect para inicializar la obtencion de datos
  useEffect(() => {
    setListaEspecies(fishData as unknown as Especie[]);
    setCargando(false);
  }, []);

  const especiesFiltro = listaSeleccionada
    ? listaEspecies.filter((especimen) =>
        especimen.Regiones.includes(listaSeleccionada),
      )
    : listaEspecies;
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Ventana de colección</Text>

        <FiltroRegion
          seleccionada={listaSeleccionada}
          alCambiar={setListaSeleccionada}
        />
        {cargando ? (
          <ActivityIndicator size="large" color="#006064" />
        ) : (
          <FlatList
            data={especiesFiltro}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <FishCard especie={item} onPress={() => abrirDetalle(item)} />
            )}
            contentContainerStyle={{
              alignItems: "center",
              paddingBottom: 10,
            }}
            style={{ width: "100%" }}
          />
        )}
        <FishModal
          visible={modalVisible}
          especie={seleccionado}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titulo: {
    fontSize: 20,
    color: "#006064",
    fontWeight: "bold",
    marginBottom: 10,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "#e0f7fa",
  },
});
