import { View, Text, StyleSheet } from 'react-native';



/*
Se dejan las configuraciones del usuario como el orden de las capturas y especies
del usuario.

*/

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ventana de usuario</Text>
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