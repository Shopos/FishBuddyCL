import { View, Text, StyleSheet } from 'react-native';



/*
Clima con/sin conexion
fase lunar segun fecha
temporadas segun sag
informacion util
 */

export default function InicioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ventana de Inicio Ordenada</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Un fondo azul clarito
  },
  titulo: {
    fontSize: 20,
    color: '#4c6d6e',
    fontWeight: 'bold'
  },
});