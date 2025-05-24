import React, { useRef, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, StyleSheet, Animated } from 'react-native';

import PaginaInicial from '../pages/PaginaInicial';
import PaginaGaleria from '../pages/PaginaGaleria';
import TelaAdicionarDetalhes from '../pages/TelaAdicionarDetalhes';

const CasaIcone = require('../assets/casa.png');
const PaintIcone = require('../assets/icone-paint.png');

const Abas = createBottomTabNavigator();
const Pilha = createStackNavigator();

function PilhaInicio() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      <Pilha.Screen name="TelaInicial" component={PaginaInicial} />
      <Pilha.Screen name="TelaAdicionarDetalhes" component={TelaAdicionarDetalhes} />
    </Pilha.Navigator>
  );
}

function PilhaGaleria() {
  return (
    <Pilha.Navigator screenOptions={{ headerShown: false }}>
      <Pilha.Screen name="TelaGaleria" component={PaginaGaleria} />
      <Pilha.Screen name="TelaAdicionarDetalhes" component={TelaAdicionarDetalhes} />
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

          const animScale = useRef(new Animated.Value(1)).current;
          const animTranslate = useRef(new Animated.Value(0)).current;

          useEffect(() => {
            Animated.parallel([
              Animated.spring(animScale, {
                toValue: focused ? 1.2 : 1,
                useNativeDriver: true,
              }),
              Animated.spring(animTranslate, {
                toValue: focused ? -10 : 0,
                useNativeDriver: true,
              }),
            ]).start();
          }, [focused]);

          return (
            <Animated.View
              style={{
                transform: [{ scale: animScale }, { translateY: animTranslate }],
                marginBottom: -15,
              }}
            >
              {focused ? (
                <View style={estilos.bordaBranca}>
                  <View style={estilos.bordaPreta}>
                    <Image
                      source={icone}
                      style={estilos.iconeImagemSelecionado}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={icone}
                  style={estilos.iconeImagem}
                />
              )}
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
  bordaBranca: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 6,
  },
  bordaPreta: {
    backgroundColor: '#1F2124',
    borderRadius: 50,
    padding: 10,
  },
  iconeImagemSelecionado: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  iconeImagem: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});
