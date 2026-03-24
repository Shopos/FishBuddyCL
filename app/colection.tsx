import { View, Text, StyleSheet } from 'react-native';




/*Espacio de coleccion de las especies
-Filtro para especie por region 
-Celda por especie donde:
  -icono segun especie
  -nombre comun
  -estado conservacion
  -origen

-Cada celda debe tener accion para que en un modal se muestre toda la informacion de dicha 
especie, como tambien las imagenes que se tenga de aquella especie
*/
export default function AjustesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ventana de colección</Text>
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
    color: '#006064',
    fontWeight: 'bold'
  },
});