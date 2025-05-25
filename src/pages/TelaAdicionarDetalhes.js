import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { salvarObra } from '../services/galeriaService';
import { useFonts, Blinker_400Regular, Blinker_700Bold } from '@expo-google-fonts/blinker';

export default function TelaAdicionarDetalhes({ route, navigation }) {
  const item = route?.params?.item;

  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  if (!item) {
    return (
      <View style={estilos.container}>
        <Text style={{ color: '#fff' }}>Nenhuma obra selecionada.</Text>
      </View>
    );
  }

  const handleChangeDescricao = (texto) => {
    if (texto.length > 134) {
      Alert.alert('Erro', 'A descrição não pode ter mais de 134 caracteres!');
      setDescricao(texto.slice(0, 134));
    } else {
      setDescricao(texto);
    }
  };

  const handleSalvar = async () => {
    if (descricao.trim() === '') {
      Alert.alert('Erro', 'Por favor, adicione uma descrição antes de salvar.');
      return; // ❌ bloqueia envio se estiver vazio
    }

    try {
      const novaObra = {
        artId: item.id.toString(),
        titulo: item.title,
        imagemUrl: item.image_url,
        descricao
      };

      console.log('👉 Obra antes de enviar:', novaObra);

      await salvarObra(novaObra);

      setMensagem('Adicionado com sucesso! ✅');

      setTimeout(() => {
        setMensagem('');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('❌ Erro ao salvar obra:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível adicionar a obra.');
    }
  };

  return (
    <View style={estilos.container}>
      <Image source={{ uri: item.image_url }} style={estilos.imagem} resizeMode="cover" />

      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={estilos.card}>
        <Text style={estilos.titulo}>{item.title}</Text>

        <TextInput
          style={estilos.inputDescricao}
          placeholder="Adicione sua descrição... (máx. de 3 linhas)"
          multiline
          numberOfLines={3}
          maxLength={134}
          value={descricao}
          onChangeText={handleChangeDescricao}
        />

        <TouchableOpacity onPress={handleSalvar} style={estilos.bolhaConectada}>
          <View style={estilos.bolhaInterna}>
            <Ionicons name="add" size={30} color="#fff" />
          </View>
        </TouchableOpacity>

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
    backgroundColor: '#1F2124' 
},
  imagem: { 
    width: '100%', 
    height: 500 
},
  botaoVoltar: { 
    position: 'absolute', 
    top: 50, 
    left: 20, 
    backgroundColor: '#1F2124', 
    padding: 8, 
    borderRadius: 20 
},
  card: { 
    backgroundColor: '#fff',
     marginTop: -35, 
     borderTopLeftRadius: 40, 
     borderTopRightRadius: 40, 
     padding: 20, 
     height: '100%' 
},
  titulo: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginTop: 30 
},
  inputDescricao: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    height: 75,
    marginBottom: 20,
    marginTop: 50
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
    alignItems: 'center'
},
  bolhaInterna: { 
    backgroundColor: '#1F2124', 
    width: 60,
    height: 60, 
    borderRadius: 35, 
    justifyContent: 'center', 
    alignItems: 'center' 
},
  mensagem: { 
    marginTop: 10, 
    color: 'green', 
    fontWeight: 'bold', 
    textAlign: 'center' 
},
  nomeApp: { 
    marginTop: '40%', 
    textAlign: 'center', 
    fontSize: 16, 
    color: '#aaa', 
    fontStyle: 'italic' 
}
});
