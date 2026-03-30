import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Especie } from "../app/colection";

interface FishModalProps {
  visible: boolean;
  especie: Especie | null;
  onClose: () => void;
}

const { width } = Dimensions.get("window");

const getColorEstadoConservacion = (estado: string) => {
  const e = estado?.toUpperCase().trim();
  switch (e) {
    case "CR":
      return "#D32F2F"; // Peligro Crítico
    case "EN":
      return "#FF5722"; // En Peligro
    case "VU":
      return "#FFA000"; // Vulnerable
    case "NT":
      return "#8BC34A"; // Casi Amenazado
    case "LC":
      return "#4CAF50"; // Preocupación Menor
    default:
      return "#757575"; // Datos insuficientes
  }
};

export default function FishModal({
  visible,
  especie,
  onClose,
}: FishModalProps) {
  if (!especie) return null;

  //Obtener color segun estado de conservacion
  const colorEstado = getColorEstadoConservacion(especie.Estado);
  // Función auxiliar para renderizar los bloques de captura vacíos
  const renderPlaceholderCapturas = () => {
    return [1, 2, 3, 4].map((item) => (
      <View key={item} style={styles.placeholderCaptura}>
        <MaterialCommunityIcons
          name="camera-plus-outline"
          size={20}
          color="#b2ebf2"
        />
      </View>
    ));
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          {/* BOTÓN DE CIERRE (Posición absoluta o en header) */}
          <TouchableOpacity onPress={onClose} style={styles.botonCerrarModal}>
            <MaterialCommunityIcons name="close" size={24} color="#006064" />
          </TouchableOpacity>

          {/* SECTION 1: Header - Nombres y Círculo */}
          <View style={styles.modalHeader}>
            <View style={styles.circuloHeader}>
              <MaterialCommunityIcons name="fish" size={30} color="#006064" />
            </View>
            <View style={styles.textosHeader}>
              <Text style={styles.modalNombreComun}>{especie.Común}</Text>
              <Text style={styles.modalNombreCientifico}>
                {especie.Científico}
              </Text>
            </View>
          </View>

          {/* SECTION 2: Bloque de 'datos' y Círculo/Imagen Principal */}
          <View style={styles.rowDatos}>
            <View style={styles.placeholderImagenPrincipal}>
              {/* Aquí irá especie.Fotos en el futuro */}
              <MaterialCommunityIcons
                name="image-off-outline"
                size={30}
                color="#b2ebf2"
              />
            </View>
            <View style={styles.bloqueDatos}>
              <Text style={styles.tituloSeccion}>Datos</Text>
              {/* Espacio para datos de momento estático */}
              <View style={styles.filaEstado}>
                <Text style={styles.negrita}>Estado:</Text>
                <Text
                  style={[
                    styles.textoBadgeEstado,
                    { backgroundColor: colorEstado },
                  ]}
                >
                  {especie.Estado}
                </Text>
              </View>
              <Text style={styles.textoFicha}>
                <Text style={styles.negrita}>Origen: </Text>
                {especie.Origen}
              </Text>
              <Text style={styles.textoFicha}>
                <Text style={styles.negrita}>Descripción: </Text>
                {especie.Descripcion}
              </Text>
            </View>
          </View>

          {/* SECTION 3: Tres bloques de Texto (Scrollable) */}
          <ScrollView
            style={styles.scrollTextos}
            showsVerticalScrollIndicator={false}
          >
            {/* Bloque Texto 1: Descripción o Regiones */}
            <View style={styles.bloqueTextoLargo}>
              <View style={styles.headerSection}>
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={15}
                  color="#006064"
                />
                <Text style={styles.tituloSeccion}>Regiones</Text>
              </View>
              <Text style={styles.textoDescriptivo}>{especie.Regiones}</Text>
            </View>

            {/* Bloque Texto 2: Descripción General */}
            <View style={styles.bloqueTextoLargo}>
              <View style={styles.headerSection}>
                <MaterialCommunityIcons name="hook" size={15} color="#006064" />
                <Text style={styles.tituloSeccion}>Carnadas recomendadas</Text>
              </View>
              <Text style={styles.textoDescriptivo}>{especie.Carnada}</Text>
            </View>

            {/* Bloque Texto 3: Notas Adicionales */}
            <View style={styles.bloqueTextoLargo}>
              <View style={styles.headerSection}>
                <MaterialCommunityIcons
                  name="waves"
                  size={15}
                  color="#006064"
                />
                <Text style={styles.tituloSeccion}>Habitad</Text>
              </View>
              <Text style={styles.textoDescriptivo}>{especie.Habitad}</Text>
            </View>

            {/* SECTION 4: Capturas - Bloque inferior */}
            <View style={styles.contenedorCapturas}>
              <View style={styles.headerSection}>
                <MaterialCommunityIcons
                  name="camera-outline"
                  size={15}
                  color="#006064"
                />
                <Text style={styles.tituloSeccion}>Capturas</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollCapturas}
              >
                {renderPlaceholderCapturas()}
              </ScrollView>

              {/* Barra de progreso / Paginación del wireframe */}
              <View style={styles.barraPaginacion}>
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={18}
                  color="#006064"
                />
                <View style={styles.barraProgreso}>
                  <View style={styles.barraProgresoActiva} />
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color="#006064"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo oscuro semitransparente
    justifyContent: "flex-end", // El modal sale de abajo
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "100%",
    height: "92%", // Ocupa casi toda la pantalla
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "relative",
    overflow: "hidden", // Asegura que el header unificado se recorte si es necesario
  },
  botonCerrarModal: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 10,
    backgroundColor: "#e0f7fa",
    borderRadius: 20,
    padding: 5,
  },
  // SECTION 1: Header
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10, // Aire para el botón de cierre
  },
  circuloHeader: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#006064",
    marginRight: 15,
  },
  textosHeader: {
    flex: 1,
  },
  modalNombreComun: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalNombreCientifico: {
    fontSize: 14,
    color: "#006064",
    fontStyle: "italic",
  },
  // SECTION 2: Bloque Datos y Círculo Principal
  rowDatos: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  placeholderImagenPrincipal: {
    width: width * 0.35, // 35% del ancho de pantalla
    height: width * 0.35, // Cuadrado perfecto
    borderRadius: 15,
    backgroundColor: "#e0f7fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b2ebf2",
    borderStyle: "dashed", // Estilo discontinuo para denotar que no hay imagen
  },
  bloqueDatos: {
    flex: 1, // Ocupa el espacio restante
    marginLeft: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1, // Sombra sutil
  },
  textoFicha: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },
  // SECTION 3: Tres bloques de Texto (Scrollable)
  scrollTextos: {
    flex: 1, // Ocupa el espacio vertical disponible
    marginBottom: 15,
  },
  bloqueTextoLargo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 1,
  },
  tituloSeccion: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006064",
    marginBottom: 6,
  },
  textoDescriptivo: {
    fontSize: 12,
    color: "#555",
    lineHeight: 18,
  },
  // SECTION 4: Capturas - Bloque inferior
  contenedorCapturas: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
  },
  scrollCapturas: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10, // Espacio entre placeholders
  },
  placeholderCaptura: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#b2ebf2",
    borderStyle: "dashed",
  },
  // Barra de paginación del wireframe
  barraPaginacion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  barraProgreso: {
    flex: 1, // Ocupa el centro
    height: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginHorizontal: 10,
    overflow: "hidden",
  },
  barraProgresoActiva: {
    width: "40%", // Ejemplo de progreso (NAT, INT)
    height: "100%",
    backgroundColor: "#b2ebf2", // Color claro del diseño
    borderRadius: 5,
  },
  badgeEstado: {
    marginBottom: 8,
  },
  textoBadgeEstado: {
    color: "#fff",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
    textAlign: "center",
  },

  negrita: {
    fontWeight: "bold",
    color: "#333",
    fontSize: 12,
  },
  headerSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  filaEstado: {
    flexDirection: "row",
    alignItems: "center",
  },
});
