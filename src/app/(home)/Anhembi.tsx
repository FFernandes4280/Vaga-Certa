import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Dimensions, ActivityIndicator, Pressable } from 'react-native';
import { Vaga} from '../../types';
import { supabase } from '../../lib/supabase';
import { Link } from 'expo-router';

const numColumns = 2; 
const WIDTH = Dimensions.get('window').width;

const Anhembi = () => {
  const [vagas, setVagas] = useState<Vaga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVagas = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Vaga')
          .select('*')
          .eq('local', 'Anhembi');

        if (error) {
          console.error('Erro ao buscar vagas:', error);
        } else {
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
  }, []);

  const renderItem = ({ item }: { item: Vaga }) => (
    <Link 
      key={item.id}
      href={`${item.id}`}
      style={styles.link}
      asChild
    >
      <Pressable 
        onPress={() => console.log('Vaga ID:', item.id)} // Para garantir que o ID está sendo passado
        style={({ pressed }) => [
          styles.itemContainer,
          { opacity: pressed ? 0.5 : 1 },
        ]}
      >
        <View style={[styles.item, {
          backgroundColor: item.status ? 'green' : 'red',
        }]}>
          <Text style={styles.itemText}>ID: {item.id}</Text>
        </View>
      </Pressable>
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
    flex: 1,
    margin: 5,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH / numColumns - 10,
    height: WIDTH / numColumns - 10,
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: '90%',
    height: '90%',
  },
  itemText: {
    color: '#fff',
  },
});

export default Anhembi;
