import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Vaga, RootStackParamList } from '../../types';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';

type MapaRouteProp = RouteProp<RootStackParamList, 'Mapa'>;

const numColumns = 3; 
const WIDTH = Dimensions.get('window').width;

const Anhembi = () => {
  const route = useRoute<MapaRouteProp>();
  const { local } = route.params;

  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Vaga')
          .select('*')
          .eq('local', local);

        if (error) {
          console.error('Erro ao buscar vagas:', error);
        } else {
          // Verifica se data não é null antes de atualizar o estado
          if (data) {
            setVagas(data);
          }
        }
      } catch (error) {
        console.error('Erro ao buscar vagas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVagas();
  }, [local]);

  const renderItem = ({ item }: { item: Vaga }) => (
    <Link key={item.id} href={`/info/${item.id}`} style={styles.link}>
      <View style={styles.itemContainer}>
        <View style={[styles.item, {
          backgroundColor: item.status ? 'green' : 'red',
        }]}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
        </View>
      </View>
    </Link>
  );

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <FlatList
      data={vagas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 10,
  },
  link: {
    margin: 5,
  },
  itemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH / numColumns,
    height: WIDTH / numColumns,
  },
  item: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: '100%',
    height: '100%',
  },
  itemText: {
    color: '#fff',
  },
});

export default Anhembi;
