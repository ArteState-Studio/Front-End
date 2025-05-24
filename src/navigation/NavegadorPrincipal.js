import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicial from '../pages/PaginaInicial';
import PaginaGaleria from '../pages/PaginaGaleria';
import { View, Image, StyleSheet } from 'react-native';


const CasaIcone = require('../assets/casa.png');
const PaintIcone = require('../assets/icone-paint.png');

const Abas = createBottomTabNavigator();
const Pilha = createStackNavigator();

function PilhaInicio() {
  return (
    <Pilha.Navigator>
      <Pilha.Screen 
        name="TelaInicial"     
        component={PaginaInicial} 
        options={{ headerShown: false }}
      />
    </Pilha.Navigator>
  );
}

function PilhaGaleria() {
  return (
    <Pilha.Navigator>
      <Pilha.Screen 
        name="TelaGaleria"    
        component={PaginaGaleria} 
        options={{ headerShown: false }}
      />
    </Pilha.Navigator>
  );
}

export default function NavegadorPrincipal() {
  return (
    <Abas.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#1F2124',
          height: 70,
        },
        tabBarIcon: ({ focused }) => {
          const icone = route.name === 'Início' ? CasaIcone : PaintIcone;

          return (
            <View style={focused ? estilos.iconeSelecionado : estilos.icone}>
              <Image
                source={icone}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: focused ? '#1F2124' : '#fff',
                }}
              />
            </View>
          );
        },
      })}
    >
      <Abas.Screen name="Início" component={PilhaInicio} />   
      <Abas.Screen name="Galeria" component={PilhaGaleria} /> 
    </Abas.Navigator>
  );
}

const estilos = StyleSheet.create({
  icone: {
    padding: 10,
    marginBottom: -15,
  },
  iconeSelecionado: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    marginBottom: -15,
  },
});
