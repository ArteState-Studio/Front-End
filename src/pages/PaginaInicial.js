import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { useFonts, Blinker_400Regular, Blinker_700Bold } from '@expo-google-fonts/blinker';
import { useFocusEffect } from '@react-navigation/native';

const imagens = [
  { uri: 'https://artestate.blob.core.windows.net/roblox/noite-estrelada.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art1.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art2.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art3.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art4.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art5.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art6.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/art7.png' },
  { uri: 'https://artestate.blob.core.windows.net/roblox/artDaniel.jpeg' },

];

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function PaginaInicial({ navigation }) {
  const [expandida, setExpandida] = useState(false);
  const animWidth = useRef(new Animated.Value(SCREEN_WIDTH)).current;
  const animHeight = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const [imagemAtual, setImagemAtual] = useState(() => {
    const indexAleatorio = Math.floor(Math.random() * imagens.length);
    return imagens[indexAleatorio];
  });

  const [fontsLoaded] = useFonts({
    Blinker_400Regular,
    Blinker_700Bold,
  });

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    
    setExpandida(true);
    Animated.parallel([
      Animated.timing(animWidth, {
        toValue: SCREEN_WIDTH,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    const intervalo = setInterval(() => {
      const indexAleatorio = Math.floor(Math.random() * imagens.length);
      setImagemAtual(imagens[indexAleatorio]);
    }, 10000);

    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const reduzirImagem = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(animWidth, {
        toValue: 300,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: 530,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => setExpandida(false));
  };

  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      if (expandida) {
        parent?.setOptions({ tabBarStyle: { display: 'none' } });
      } else {
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: '#1F2124',
            height: 70,
            borderTopWidth: 0,
          },
        });
      }

      return () =>
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: '#1F2124',
            height: 70,
            borderTopWidth: 0,
          },
        });
    }, [expandida, navigation])
  );

  if (!fontsLoaded) return null;

  return (
    <View style={estilos.container}>
      <TouchableWithoutFeedback onPress={expandida ? reduzirImagem : null}>
        <Animated.View
          style={[ 
            estilos.containerImagem,
            expandida && estilos.expandida,
            { width: animWidth, height: animHeight },
          ]}
        >
          <Image source={imagemAtual} style={estilos.imagem} resizeMode="cover" />

          {expandida && (
            <Animated.View style={[estilos.containerFrase, { opacity: fadeAnim }]}>
              <Text style={[estilos.frase, estilos.bold]}>MERGULHE</Text>
              <Text style={estilos.frase}>
                NA <Text style={estilos.bold}>ARTE</Text>
              </Text>
              <Text style={estilos.frase}>COM A</Text>
              <Text style={estilos.frase}>GENTE</Text>

              <Animated.Text style={[estilos.subFrase, { opacity: blinkAnim }]}>
                Toque para iniciar sua jornada Artística
              </Animated.Text>
            </Animated.View>
          )}

          {!expandida && (
            <>
              <View style={estilos.containerTexto}>
                <Text style={estilos.titulo}>ARTSTATE</Text>
                <Text style={estilos.subtitulo}>STUDIO</Text>
              </View>

              <TouchableOpacity style={estilos.botao} onPress={() => navigation.navigate('Galeria')}>
                <Text style={estilos.textoBotao}>Explorar</Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  containerImagem: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expandida: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

  imagem: {
    width: '100%',
    height: '114%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  containerFrase: {
    position: 'absolute',
    top: '25%',
    left: 40,
    right: 20,
  },
  frase: {
    fontFamily: 'Blinker_400Regular',
    fontSize: 45,
    color: '#fff',
  },
  bold: {
    fontFamily: 'Blinker_700Bold',
  },
  subFrase: {
    fontFamily: 'Blinker_400Regular',
    fontSize: 20,
    marginTop: 210,
    color: '#fff',
    textAlign: 'center',
  },
  containerTexto: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  titulo: {
    fontFamily: 'Blinker_700Bold',
    fontSize: 42,
    color: '#fff',
  },
  subtitulo: {
    fontFamily: 'Blinker_400Regular',
    fontSize: 30,
    letterSpacing: 2,
    color: '#fff',
  },
  botao: {
    position: 'relative',
    bottom: 35,
    paddingHorizontal: 65,
    paddingVertical: 20,
    borderRadius: 50,
    borderWidth: 10,
    borderColor: '#fff',
    backgroundColor: '#1F2124',
  },
  textoBotao: {
    fontFamily: 'Blinker_400Regular',
    color: '#fff',
    fontSize: 22,
  },
});
