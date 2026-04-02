import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from "expo-file-system/legacy";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import React, { useState } from "react";

import IdentifyModal from "@/componentes/identifyModal";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function CapturaScreen() {
  const [imagen, setImagen] = useState<string | null>(null);
  const [ubicacion, setUbicacion] = useState<Location.LocationObject | null>(
    null,
  );
  const [guardando, setGuardando] = useState(false);
  const [modalId, setModalId] = useState(false);
  const [rutaFinal, setRutaFinal] = useState<string | null>(null);

  // --- LÓGICA DE CAPTURA Y UBICACIÓN ---

  const procesarSeleccion = async (
    resultado: ImagePicker.ImagePickerResult,
  ) => {
    if (!resultado.canceled) {
      const uriOriginal = resultado.assets[0].uri;
      setImagen(uriOriginal);

      // Obtener GPS inmediatamente al capturar
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setUbicacion(loc);
      }
    }
  };

  const usarCamara = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) return Alert.alert("Error", "Se requiere permiso de cámara");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    procesarSeleccion(result);
  };

  const usarGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    procesarSeleccion(result);
  };

  // --- LÓGICA DE ALMACENAMIENTO INTERNO ---

  const guardarEnColeccionLocal = async () => {
    if (!imagen) return;
    setGuardando(true);

    try {
      const nombreArchivo = `captura_${Date.now()}.jpg`;
      // CORRECCIÓN: Agregamos la barra '/' al final de la carpeta
      const directorioDestino = FileSystem.documentDirectory + "mis_capturas/";

      const infoDir = await FileSystem.getInfoAsync(directorioDestino);
      if (!infoDir.exists) {
        await FileSystem.makeDirectoryAsync(directorioDestino, {
          intermediates: true,
        });
      }

      const nuevaRuta = directorioDestino + nombreArchivo;

      await FileSystem.copyAsync({
        from: imagen,
        to: nuevaRuta,
      });

      // Guardamos la ruta en el estado para usarla al identificar
      setRutaFinal(nuevaRuta);
      setGuardando(false);

      // ABRIR MODAL DE IDENTIFICACIÓN
      setModalId(true);
    } catch (error) {
      setGuardando(false);
      Alert.alert("Error", "No se pudo procesar la imagen. ");
    }
  };

  const finalizarIdentificacion = async (especieElegida: any) => {
    try {
      // 1. Obtener lo que ya existe en AsyncStorage
      const datosPrevios = await AsyncStorage.getItem("MIS_CAPTURAS");
      const capturas = datosPrevios ? JSON.parse(datosPrevios) : [];

      // 2. Crear el nuevo registro
      const nuevaEntrada = {
        id: Date.now().toString(),
        cientifico: especieElegida.Científico, // Vínculo con tu JSON base
        comun: especieElegida.Común,
        uri: rutaFinal,
        coords: ubicacion
          ? {
              lat: ubicacion.coords.latitude,
              lng: ubicacion.coords.longitude,
            }
          : null,
        fecha: new Date().toISOString(),
      };

      // 3. Guardar el array actualizado
      capturas.push(nuevaEntrada);
      await AsyncStorage.setItem("MIS_CAPTURAS", JSON.stringify(capturas));

      // 4. Limpiar todo y cerrar
      setModalId(false);
      setImagen(null);
      setUbicacion(null);
      setRutaFinal(null);

      Alert.alert(
        "¡Éxito!",
        `${especieElegida.Común} guardado en tu colección.`,
      );
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar el registro de la especie.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Capturar Especie</Text>

      <View style={styles.previewContainer}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.foto} />
        ) : (
          <MaterialCommunityIcons
            name="camera-plus"
            size={80}
            color="#b2ebf2"
          />
        )}
      </View>

      {ubicacion && (
        <View style={styles.badgeUbicacion}>
          <MaterialCommunityIcons name="map-marker" size={14} color="#006064" />
          <Text style={styles.textoUbicacion}>
            Ubicación fijada (Metadata OK)
          </Text>
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.botonCircular} onPress={usarCamara}>
          <MaterialCommunityIcons name="camera" size={30} color="#fff" />
          <Text style={styles.labelBoton}>Cámara</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonCircular, { backgroundColor: "#00acc1" }]}
          onPress={usarGaleria}
        >
          <MaterialCommunityIcons
            name="image-multiple"
            size={30}
            color="#fff"
          />
          <Text style={styles.labelBoton}>Galería</Text>
        </TouchableOpacity>
      </View>

      {imagen && (
        <TouchableOpacity
          style={[styles.botonGuardar, guardando && { opacity: 0.5 }]}
          onPress={guardarEnColeccionLocal}
          disabled={guardando}
        >
          <Text style={styles.textoGuardar}>
            {guardando ? "Procesando..." : "Confirmar e Identificar"}
          </Text>
          <MaterialCommunityIcons name="check-circle" size={24} color="#fff" />
        </TouchableOpacity>
      )}

      <IdentifyModal
        visible={modalId}
        onClose={() => setModalId(false)}
        onSelect={(especie) => finalizarIdentificacion(especie)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e0f7fa",
    alignItems: "center",
    paddingVertical: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#006064",
    marginBottom: 20,
  },
  previewContainer: {
    width: width * 0.85,
    height: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#b2ebf2",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    marginBottom: 20,
  },
  foto: {
    width: "100%",
    height: "100%",
  },
  badgeUbicacion: {
    flexDirection: "row",
    backgroundColor: "#b2ebf2",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
  },
  textoUbicacion: {
    fontSize: 12,
    color: "#006064",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 30,
    marginBottom: 30,
  },
  botonCircular: {
    backgroundColor: "#006064",
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  labelBoton: {
    color: "#006064",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 5,
    position: "absolute",
    bottom: -20,
  },
  botonGuardar: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 30,
    gap: 10,
    marginTop: 20,
    elevation: 5,
  },
  textoGuardar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
