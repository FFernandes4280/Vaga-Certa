import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { InfoScreenRouteProp, Vaga } from '../../types';
import { supabase } from '../../lib/supabase';

type InfoVagaProps = {
  route: InfoScreenRouteProp;
};

const InfoVaga: React.FC<InfoVagaProps> = ({ route }) => {
  const [vaga, setVaga] = useState<Vaga | null>(null);
  const [loading, setLoading] = useState(true);
  const vagaId = route.params.id;
  const [userId, setUserId] = useState<string | null>(null); // Estado para armazenar o ID do usuário

  useEffect(() => {
    const fetchVaga = async () => {
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

    // formata as datas para o formato de tempo 'HH:mm'
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
      <Text style={styles.label}>Identificador: <Text style={styles.value}>{vaga.id}</Text></Text>
      <Text style={styles.label}>Localização: <Text style={styles.value}>{vaga.local}</Text></Text>
      <Text style={styles.label}>Tipo: <Text style={styles.value}>{vaga.tipo}</Text></Text>
      <Text style={styles.label}>Status: <Text style={styles.value}>{vaga.status ? 'Disponível' : 'Ocupada'}</Text></Text>
      <Text style={styles.label}>Plano: <Text style={styles.value}>{vaga.plano} Horas</Text></Text>

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

export default InfoVaga;
