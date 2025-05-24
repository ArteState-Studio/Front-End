import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import MasonryList from '@react-native-seoul/masonry-list';

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
      let url = '';

      if (texto) {
        //Busca por qualquer coisa
        const query = `q=${encodeURIComponent(texto)}&`;
        url = `https://api.artic.edu/api/v1/artworks/search?${query}page=${pagina}&limit=5&fields=id,title,image_id`;

      } else {
        //Busca aleatória inicial
        url = `https://api.artic.edu/api/v1/artworks?classification_title=Painting&page=${pagina}&limit=9&fields=id,title,image_id`;

      }

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

  useEffect(() => {
    if (pesquisa) {
      setPage(1);
      buscarPinturas(pesquisa, 1);
    } else {
      const paginaAleatoria = Math.floor(Math.random() * 100) + 1;
      setPage(paginaAleatoria);
      buscarPinturas('', paginaAleatoria);
    }
  }, [pesquisa]);

  const carregarMais = () => {
    if (!loading && hasMore) {
      const novaPagina = page + 1;
      setPage(novaPagina);
      buscarPinturas(pesquisa, novaPagina);
    }
  };

  const dados = tab === 'Explorar' ? resultados : galeria;

  const handleSelecionarArte = (item) => {
    navigation.navigate('TelaAdicionarDetalhes', { item });
  };

  const renderItem = ({ item }) => {
    const randomAspect = Math.random() * 1 + 0.7;

    return (
      <TouchableOpacity style={estilos.card} onPress={() => handleSelecionarArte(item)}>
        <Image 
          source={{ uri: item.image_url }} 
          style={[estilos.imagem, { aspectRatio: randomAspect }]} 
        />
        <Text
          style={estilos.titulo}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
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
        <TouchableOpacity onPress={() => setTab('Explorar')} style={[estilos.tab, tab === 'Explorar' && estilos.tabAtiva]}>
          <Text style={tab === 'Explorar' ? estilos.textoAtivo : estilos.texto}>Explorar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('Galeria')} style={[estilos.tab, tab === 'Galeria' && estilos.tabAtiva]}>
          <Text style={tab === 'Galeria' ? estilos.textoAtivo : estilos.texto}>Galeria</Text>
        </TouchableOpacity>
      </View>

      <MasonryList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={renderItem}
        onEndReached={carregarMais}
        onEndReachedThreshold={0.2}
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#1F2124" />}
      />
    </View>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderColor: 'transparent',
  },
  tabAtiva: {
    borderColor: '#1F2124',
  },
  texto: {
    color: '#aaa',
    fontSize: 16,
  },
  textoAtivo: {
    color: '#1F2124',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    margin: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    
  },
  imagem: {
    width: '100%',
    height: undefined,
    borderRadius: 10,
  },
  titulo: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  containerPesquisa: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderColor: '#858585',
    borderWidth: 1,
  },
  
  iconePesquisa: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: '#aaa',  
  },
  
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
  },
  
});
