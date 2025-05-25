import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, StyleSheet, Animated } from 'react-native';

import PaginaInicial from '../pages/PaginaInicial';
import PaginaGaleria from '../pages/PaginaGaleria';
import TelaAdicionarDetalhes from '../pages/TelaAdicionarDetalhes';
import TelaEditarDetalhes from '../pages/TelaEditarDetalhes';

const CasaIcone = require('../assets/casa.png');
const PaintIcone = require('../assets/icone-paint.png');

const Abas = createBottomTabNavigator();
const Pilha = createStackNavigator();

function PilhaInicio() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      <Pilha.Screen name="TelaInicial" component={PaginaInicial} />
      <Pilha.Screen name="TelaAdicionarDetalhes" component={TelaAdicionarDetalhes} />
      <Pilha.Screen name="TelaEditarDetalhes" component={TelaEditarDetalhes} />
    </Pilha.Navigator>
  );
}

function PilhaGaleria() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      <Pilha.Screen name="TelaGaleria" component={PaginaGaleria} />
      <Pilha.Screen name="TelaAdicionarDetalhes" component={TelaAdicionarDetalhes} />
      <Pilha.Screen name="TelaEditarDetalhes" component={TelaEditarDetalhes} />
    </Pilha.Navigator>
  );
}

export default function NavegadorPrincipal() {
  return (
    <Abas.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#1F2124', height: 70 },
        tabBarIcon: ({ focused }) => {
          const animScale = useRef(new Animated.Value(1)).current;
          const animTranslate = useRef(new Animated.Value(0)).current;

          useEffect(() => {
            if (focused) {
              Animated.parallel([
                Animated.spring(animScale, {
                  toValue: 1.3,
                  useNativeDriver: true,
                  friction: 4,
                  tension: 120,
                }),
                Animated.spring(animTranslate, {
                  toValue: -10,
                  useNativeDriver: true,
                  friction: 4,
                  tension: 120,
                }),
              ]).start();
            } else {
              Animated.parallel([
                Animated.spring(animScale, {
                  toValue: 1,
                  useNativeDriver: true,
                }),
                Animated.spring(animTranslate, {
                  toValue: 0,
                  useNativeDriver: true,
                }),
              ]).start();
            }
          }, [focused]);

          const icone = route.name === 'Início' ? CasaIcone : PaintIcone;

          return (
            <Animated.View
              style={[
                focused ? estilos.iconeSelecionado : estilos.icone,
                {
                  transform: [{ scale: animScale }, { translateY: animTranslate }],
                },
              ]}
            >
              <Image
                source={icone}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: focused ? '#fff' : '#fff',
                }}
              />
            </Animated.View>
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
    backgroundColor: '#1F2124',
    borderRadius: 50,
    padding: 8,
    marginBottom: -15,
    borderWidth: 6,
    borderColor: '#fff',
  },
});
