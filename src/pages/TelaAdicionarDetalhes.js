import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TelaAdicionarDetalhes({ route, navigation }) {
  const { item } = route.params;

  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleChangeDescricao = (texto) => {
    if (texto.length <= 134) {
      setDescricao(texto);
    } else {
      Alert.alert('Erro', 'A descrição não pode ter mais de 134 caracteres!');
    }
  };
  

  const handleSalvar = () => {
    if (descricao.trim() === '') {
      Alert.alert('Erro', 'A descrição não pode estar vazia!');
      return;
    }

    setMensagem('Adicionado com sucesso! ✅');

    setTimeout(() => {
      setMensagem('');
    }, 2000);
  };

  return (
    <View style={estilos.container}>
      <Image 
        source={{ uri: item.image_url }} 
        style={estilos.imagem} 
        resizeMode="cover"
      />

      <TouchableOpacity 
        style={estilos.botaoVoltar} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={estilos.card}>
      <TouchableOpacity style={estilos.bolhaConectada} onPress={handleSalvar}>
        <View style={estilos.bolhaInterna}>
            <Ionicons name="add" size={30} color="#fff" />
        </View>
      </TouchableOpacity>


        <Text style={estilos.titulo}>{item.title}</Text>

        <TextInput
          style={estilos.inputDescricao}
          placeholder="Adicione sua descrição... (máx. de 134 caracteres)"
          multiline
          numberOfLines={3}
          maxLength={300}
          value={descricao}
          onChangeText={handleChangeDescricao}
        />

        {mensagem !== '' && (
          <Text style={estilos.mensagem}>{mensagem}</Text>
        )}

        <Text style={estilos.nomeApp}>ARTSTATE STUDIO</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2124',
  },
  imagem: {
    width: '100%',
    height: 500,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: "#1F2124",
  },
  card: {
    backgroundColor: '#fff',
    marginTop: -35,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    paddingTop: 60,
    flex: 1,
    justifyContent: 'space-between',
  },
  bolha: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  inputDescricao: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    height: 75,
    marginBottom: 140,
  },
  mensagem: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nomeApp: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
    fontStyle: 'italic',
  },
  bolhaConectada: {
    position: 'absolute',
    top: -35,  
    alignSelf: 'center',
    backgroundColor: '#fff',  
    width: 80,
    height: 70,  
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    justifyContent: 'flex-end',  
    alignItems: 'center',
  },
  
  bolhaInterna: {
    backgroundColor: '#1F2124',
    width: 60,
    height: 60,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
