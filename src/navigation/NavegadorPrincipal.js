import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import PaginaInicial from '../pages/PaginaInicial';
import PaginaGaleria from '../pages/PaginaGaleria';
import { Animated, StyleSheet, Image, View } from 'react-native';

// ✅ Importa os PNGs
const CasaIcone = require('../assets/casa.png');
const PaintIcone = require('../assets/icone-paint.png');

const Abas = createBottomTabNavigator();
const Pilha = createStackNavigator();

function PilhaInicio() {
  return (
    <Pilha.Navigator>
      <Pilha.Screen 
        name="Início" 
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
        name="Galeria" 
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
          const animScale = useRef(new Animated.Value(1)).current;
          const animTranslate = useRef(new Animated.Value(0)).current;

          useEffect(() => {
            if (focused) {
              Animated.parallel([
                Animated.spring(animScale, {
                  toValue: 1.3,
                  useNativeDriver: true,
                  bounciness: 20,
                  speed: 12,
                }),
                Animated.spring(animTranslate, {
                  toValue: -20,
                  useNativeDriver: true,
                  bounciness: 20,
                  speed: 12,
                }),
              ]).start();
            } else {
              Animated.parallel([
                Animated.spring(animScale, {
                  toValue: 1,
                  useNativeDriver: true,
                  bounciness: 20,
                  speed: 12,
                }),
                Animated.spring(animTranslate, {
                  toValue: 0,
                  useNativeDriver: true,
                  bounciness: 20,
                  speed: 12,
                }),
              ]).start();
            }
          }, [focused]);

          const icone = route.name === 'Início' ? CasaIcone : PaintIcone;

          return (
            <Animated.View
              style={[
                estilos.icone,
                {
                  transform: [
                    { scale: animScale },
                    { translateY: animTranslate },
                  ],
                },
              ]}
            >
              {focused ? (
                <View style={estilos.bordaPreta}>
                  <View style={estilos.bordaBranca}>
                    <Image
                      source={icone}
                      style={{
                        width: 24,
                        height: 24,
                        tintColor: '#fff',
                      }}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={icone}
                  style={{
                    width: 24,
                    height: 24,
                    tintColor: '#fff',
                  }}
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
  icone: {
    padding: 10,
    marginBottom: -15,
  },
  bordaPreta: {
    padding: 5,
    backgroundColor: '#fff', 
    borderRadius: 50,
  },
  bordaBranca: {
    padding: 4,
    backgroundColor: '#1F2124',    
    borderRadius: 50,
  },
});
