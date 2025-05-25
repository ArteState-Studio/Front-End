import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, Alert, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { editarDescricao, excluirObra } from '../services/galeriaService';
import { useFonts, Blinker_400Regular, Blinker_700Bold } from '@expo-google-fonts/blinker';

export default function TelaEditarDetalhes({ route, navigation }) {
  const { item } = route.params;

  const [descricao, setDescricao] = useState(item.descricao || '');
  const [mensagem, setMensagem] = useState('');
  const [mostrarMenu, setMostrarMenu] = useState(false);

  const handleChangeDescricao = (texto) => {
    if (texto.length > 134) {
      Alert.alert('Erro', 'A descrição não pode ter mais de 134 caracteres!');
      setDescricao(texto.slice(0, 134));
    } else {
      setDescricao(texto);
    }
  };

  const handleEditar = async () => {
    if (descricao.trim() === '') {
      Alert.alert('Erro', 'A descrição não pode estar vazia!');
      return;
    }

    if (descricao === item.descricao) {
      Alert.alert('Aviso', 'Nenhuma alteração foi feita na descrição.');
      return;
    }

    try {
      await editarDescricao(item.id, descricao);
      setMensagem('Editado com sucesso! ✅');
      setTimeout(() => {
        setMensagem('');
        navigation.goBack();
      }, 1500);
    } catch (error) {
      console.error('❌ Erro ao editar:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', 'Não foi possível editar a descrição.');
    }
  };

  const handleExcluir = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta obra?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excluirObra(item.id);
              navigation.goBack();
            } catch (error) {
              console.error('❌ Erro ao excluir:', error.response ? error.response.data : error.message);
              Alert.alert('Erro', 'Não foi possível excluir a obra.');
            }
          }
        }
      ]
    );
  };

  return (
    <Pressable style={estilos.container} onPress={() => mostrarMenu && setMostrarMenu(false)}>
      <Image source={{ uri: item.imagemUrl || item.image_url }} style={estilos.imagem} resizeMode="cover" />

      <TouchableOpacity style={estilos.botaoVoltar} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={estilos.card}>
        <TouchableOpacity onPress={() => setMostrarMenu(!mostrarMenu)} style={estilos.menuBotao}>
          <Ionicons name="ellipsis-horizontal" left="92%" top="5" size={24} color="#000" />
        </TouchableOpacity>

        {mostrarMenu && (
          <View style={estilos.menu}>
            <TouchableOpacity onPress={handleEditar} style={[estilos.menuItem, estilos.menuItemEditar]}>
              <Ionicons name="pencil" size={20} color="#000" />
              <Text style={estilos.menuTexto}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleExcluir} style={[estilos.menuItem, estilos.menuItemExcluir]}>
              <Ionicons name="trash" size={20} color="red" />
              <Text style={[estilos.menuTexto, { color: 'red' }]}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={estilos.titulo}>{item.titulo || item.title}</Text>

        <TextInput
          style={estilos.inputDescricao}
          placeholder="Edite a descrição... (máx. de 3 linhas)"
          multiline
          numberOfLines={3}
          maxLength={134}
          value={descricao}
          onChangeText={handleChangeDescricao}
        />

        {mensagem !== '' && (
          <Text style={estilos.mensagem}>{mensagem}</Text>
        )}

        <Text style={estilos.nomeApp}>ARTSTATE STUDIO</Text>
      </View>
    </Pressable>
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
    height: '100%',
    position: 'relative'
  },

  titulo: { 
    fontSize: 18, 
    fontWeight: 'bold',  
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

  menu: {
    position: 'absolute',
    top: 65,
    right: 20,
    borderRadius: 10,
    overflow: 'hidden',
    width: 150,
    elevation: 5,
    zIndex: 10,
    backgroundColor: '#fff'
},

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
},

  menuItemEditar: {
    backgroundColor: '#e0e0e0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    fontFamily: 'Blinker_700Bold'
    
},

  menuItemExcluir: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily: 'Blinker_700Bold'

},

  menuTexto: {
    marginLeft: 28,
    fontSize: 14,
    fontWeight: '500'
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
