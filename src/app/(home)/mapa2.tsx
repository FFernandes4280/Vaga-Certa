import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions } from 'react-native';
import { Vaga } from '../../types';
import { supabase } from '../../lib/supabase';

const numColumns = 3; 
const WIDTH = Dimensions.get('window').width;

const Mapa = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);

  useEffect(() => {
    const fetchVagas = async () => {
      const { data, error } = await supabase
        .from('Vaga')
        .select('*');
      if (error) {
        console.error('Erro ao buscar vagas:', error);
      } else {
        setVagas(data);
      }
    };

    fetchVagas();
  }, []);

  const renderItem = ({ item }: { item: Vaga }) => (
    <View style={[styles.itemStyle, {
      backgroundColor: item.status ? 'green' : 'red',
    }]}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
    </View>
  );

  return (
    <FlatList
      data={vagas}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
    />
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    width: WIDTH / numColumns,
    height: WIDTH / numColumns,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
  },
  itemText: {
    color: '#fff',
  },
});

export default Mapa;
