import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';
import { listarObras, buscarPorTitulo } from '../services/galeriaService';
import { useFocusEffect } from '@react-navigation/native';

export default function PaginaGaleria({ navigation }) {
  const [tab, setTab] = useState('Explorar');
  const [pesquisa, setPesquisa] = useState('');
  const [resultados, setResultados] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const buscarPinturas = async (texto = '', pagina = 1) => {
    setLoading(true);
    try {
      let url = texto
        ? `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(texto)}&page=${pagina}&limit=5&fields=id,title,image_id`
        : `https://api.artic.edu/api/v1/artworks?classification_title=Painting&page=${pagina}&limit=9&fields=id,title,image_id`;

      const response = await fetch(url);
      const json = await response.json();

      const novosResultados = json.data
        .filter(item => item.image_id)
        .map(item => ({
          id: item.id,
          title: item.title,
          image_url: `https://www.artic.edu/iiif/2/${item.image_id}/full/843,/0/default.jpg`
        }));

      if (pagina === 1) {
        setResultados(novosResultados);
      } else {
        setResultados(prev => [...prev, ...novosResultados]);
      }

      if (json.pagination) {
        setHasMore(json.pagination.current_page < json.pagination.total_pages);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao buscar pinturas:', error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const carregarGaleria = async () => {
    setLoading(true);
    try {
      if (pesquisa) {
        const response = await buscarPorTitulo(pesquisa);
        setGaleria(response.data);
      } else {
        const response = await listarObras();
        setGaleria(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar galeria:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (tab === 'Galeria') {
        carregarGaleria();
      }
    }, [tab, pesquisa])
  );

  useEffect(() => {
    if (tab === 'Explorar') {
      if (pesquisa) {
        setPage(1);
        buscarPinturas(pesquisa, 1);
      } else {
        const paginaAleatoria = Math.floor(Math.random() * 100) + 1;
        setPage(paginaAleatoria);
        buscarPinturas('', paginaAleatoria);
      }
    } else {
      carregarGaleria();
    }
  }, [pesquisa, tab]);

  const carregarMais = () => {
    if (!loading && hasMore && tab === 'Explorar') {
      const novaPagina = page + 1;
      setPage(novaPagina);
      buscarPinturas(pesquisa, novaPagina);
    }
  };

  const dados = tab === 'Explorar' ? resultados : galeria;

  const handleSelecionarArte = (item) => {
    if (tab === 'Explorar') {
      navigation.navigate('TelaAdicionarDetalhes', { item });
    } else {
      navigation.navigate('TelaEditarDetalhes', { item });
    }
  };

  const renderItem = ({ item, index }) => {
    const randomAspect = Math.random() * 1 + 0.7;

    return (
      <TouchableOpacity style={estilos.card} onPress={() => handleSelecionarArte(item)}>
        <Image
          source={{ uri: item.image_url || item.imagemUrl }}
          style={[estilos.imagem, { aspectRatio: randomAspect }]}
        />
        <Text style={estilos.titulo} numberOfLines={2} ellipsizeMode="tail">
          {item.title || item.titulo}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={estilos.container}>
      <View style={estilos.containerPesquisa}>
        <Image source={require('../assets/lupa.png')} style={estilos.iconePesquisa} />
        <TextInput
          style={estilos.input}
          placeholder="Pesquisar pinturas..."
          value={pesquisa}
          onChangeText={setPesquisa}
        />
      </View>

      <View style={estilos.tabs}>
        <TouchableOpacity
          onPress={() => setTab('Explorar')}
          style={[estilos.tab, tab === 'Explorar' && estilos.tabAtiva]}
        >
          <Text style={tab === 'Explorar' ? estilos.textoAtivo : estilos.texto}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab('Galeria')}
          style={[estilos.tab, tab === 'Galeria' && estilos.tabAtiva]}
        >
          <Text style={tab === 'Galeria' ? estilos.textoAtivo : estilos.texto}>Galeria</Text>
        </TouchableOpacity>
      </View>

      {dados.length === 0 && !loading ? (
        <Text style={estilos.semResultados}>
          {tab === 'Explorar' ? 'Nenhuma obra encontrada.' : 'Sua galeria está vazia.'}
        </Text>
      ) : (
        <MasonryList
          data={dados}
          keyExtractor={(item, index) => `${item.id || item.artId || 'sem-id'}-${index}`}
          numColumns={2}
          renderItem={renderItem}
          onEndReached={carregarMais}
          onEndReachedThreshold={0.2}
          ListFooterComponent={loading && <ActivityIndicator size="large" color="#1F2124" />}
        />
      )}
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 40
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#858585',
    borderWidth: 1
  },
  iconePesquisa: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#aaa'
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent'
  },
  tabAtiva: {
    borderColor: '#1F2124'
  },
  texto: {
    color: '#aaa',
    fontSize: 16
  },
  textoAtivo: {
    color: '#1F2124',
    fontWeight: 'bold',
    fontSize: 16
  },
  card: {
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3
  },
  imagem: {
    width: '100%',
    height: undefined,
    borderRadius: 10
  },
  titulo: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold'
  },
  semResultados: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#999'
  }
});
