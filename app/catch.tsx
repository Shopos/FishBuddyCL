import { View, Text, StyleSheet } from 'react-native';




/*
Se inicia con un boton de camara donde se inicie la secuencia de la incorporacion de una imagen
a una especie, la idea final es que se detecte la especie
-de momento se deja que el usuario la identifique
-se debe dejar la funcion que detecta la posicion geo del usuario para metadata

*/
export default function CapturaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ventana de capturas</Text>
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