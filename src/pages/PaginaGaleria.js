import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PaginaGaleria() {
  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Galeria de Obras</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 24, fontWeight: 'bold' },
});
