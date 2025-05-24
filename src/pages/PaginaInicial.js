import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import { useFonts, Blinker_400Regular, Blinker_700Bold } from '@expo-google-fonts/blinker';

const imagens = [
  require('../assets/noite-estrelada.png'),
  require('../assets/art1.png'),
  require('../assets/art2.png'),
  require('../assets/art3.png'),
  require('../assets/art4.png'),
  require('../assets/art5.png'),
];

export default function PaginaInicial({ navigation }) {
  const [expandida, setExpandida] = useState(true);
  const animWidth = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const animHeight = useRef(new Animated.Value(Dimensions.get('window').height)).current;

  // Começa com imagem aleatória
  const [imagemAtual, setImagemAtual] = useState(() => {
    const indexAleatorio = Math.floor(Math.random() * imagens.length);
    return imagens[indexAleatorio];
  });

  const [fontsLoaded] = useFonts({
    Blinker_400Regular,
    Blinker_700Bold,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      const indexAleatorio = Math.floor(Math.random() * imagens.length);
      setImagemAtual(imagens[indexAleatorio]);
    }, 240000);  // Troca a cada 4 minutos

    return () => clearInterval(intervalo);
  }, []);

  const reduzirImagem = () => {
    Animated.parallel([
      Animated.timing(animWidth, {
        toValue: 300,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(animHeight, {
        toValue: 600,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => setExpandida(false));
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={estilos.container}>
      <TouchableWithoutFeedback onPress={expandida ? reduzirImagem : null}>
        <Animated.View style={[estilos.containerImagem, { width: animWidth, height: animHeight }]}>
          <Image
            source={imagemAtual}
            style={estilos.imagem}
          />

          {!expandida && (
            <>
              <View style={estilos.containerTexto}>
                <Text style={estilos.titulo}>ARTSTATE</Text>
                <Text style={estilos.subtitulo}>STUDIO</Text>
              </View>

              <TouchableOpacity 
                style={estilos.botao} 
                onPress={() => navigation.navigate('Galeria')}
              >
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
    backgroundColor: '#fff' 
  },

  containerImagem: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imagem: {
    width: '115%',
    height: '120%',
    borderRadius: 20,
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
    fontSize: 28, 
    color: '#fff' 
  },

  subtitulo: { 
    fontFamily: 'Blinker_400Regular',
    fontSize: 18, 
    letterSpacing: 2, 
    color: '#fff' 
  },

  botao: {
    position: 'absolute',
    bottom: -100,  
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
    fontSize: 22 
  },
});
