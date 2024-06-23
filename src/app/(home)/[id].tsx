import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Vaga } from '../../types';
import { supabase } from '../../lib/supabase';

type RouteParams = {
  InfoVaga: {
    id: number;
  };
};

const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'InfoVaga'>>();
  const vagaId = route.params.id;
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaga = async () => {
      if (!vagaId) return;

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('Vaga')
          .select('*')
          .eq('id', vagaId)
          .single();

        if (error) {
          console.error('Erro ao buscar vaga:', error);
        } else {
          setVaga(data);
        }
      } catch (error) {
        console.error('Erro ao buscar vaga:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaga();
  }, [vagaId]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await supabase.auth.getUser();
        if (response.error) {
          console.error('Erro ao buscar informações do usuário:', response.error.message);
          return;
        }
        
        const user = response.data?.user;
        if (user) {
          setUserId(user.id);
        } else {
          console.error('Usuário não autenticado ou não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleReserva = async () => {
    if (!vaga) {
      Alert.alert('Erro', 'Vaga não encontrada.');
      return;
    }

    if (!userId) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const inicioReserva = new Date();
    const fimReserva = new Date(inicioReserva.getTime() + vaga.plano * 60 * 60 * 1000);

    const formatTime = (date: Date) => {
      return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const novaReserva = {
      idUser: userId,
      idVaga: vaga.id,
      horaInicial: formatTime(inicioReserva),
      horaFim: formatTime(fimReserva),
      local: vaga.local,
    };

    try {
      const { error } = await supabase
        .from('Reserva')
        .insert([novaReserva]);

      if (error) {
        console.error('Erro ao adicionar reserva:', error);
        Alert.alert('Erro', 'Não foi possível realizar a reserva.');
      } else {
        Alert.alert(
          'Reserva Confirmada!',
          `ID da Vaga: ${vaga.id}\nInício da Reserva: ${inicioReserva.toLocaleTimeString()}\nFim da Reserva: ${fimReserva.toLocaleTimeString()}`
        );
      }
    } catch (error) {
      console.error('Erro ao adicionar reserva:', error);
      Alert.alert('Erro', 'Não foi possível realizar a reserva.');
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (!vaga) {
    return <Text>Não foi possível encontrar a vaga.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reserva de vaga</Text>
      <View style={styles.infoBox}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Identificador: </Text>
          <Text style={styles.value}>{vaga.id}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Localização: </Text>
          <Text style={styles.value}>{vaga.local}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tipo: </Text>
          <Text style={styles.value}>{vaga.tipo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Status: </Text>
          <Text style={styles.value}>{vaga.status ? 'Disponível' : 'Ocupada'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Plano: </Text>
          <Text style={styles.value}>{vaga.plano} Horas</Text>
        </View>
      </View>
      {vaga.status && (
        <TouchableOpacity onPress={handleReserva} style={styles.button}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  infoBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    fontWeight: 'normal',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default DetailScreen;
