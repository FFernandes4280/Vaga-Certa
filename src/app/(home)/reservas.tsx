import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { Reserva } from '../../types'; 
import { supabase } from '../../lib/supabase';

const Reservas = () => {
    const [reserva, setReserva] = useState<Reserva | null>(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const fetchReserva = async () => {
            setLoading(true);
            try {
                const response = await supabase.auth.getUser();
                if (response.error) {
                    console.error('Erro ao buscar informações do usuário:', response.error.message);
                    return;
                }
                
                const user = response.data?.user;
                if (user) {
                    setUserId(user.id);
                    
                    const { data, error } = await supabase
                        .from('Reserva') 
                        .select('*')
                        .eq('idUser', user.id)
                        .single();

                    if (error) {
                        console.error('Erro ao buscar reserva:', error);
                        Alert.alert('Erro', 'Não foi possível buscar a reserva.');
                    } else {
                        setReserva(data);
                    }
                } else {
                    console.error('Usuário não autenticado ou não encontrado.');
                }
            } catch (error) {
                console.error('Erro ao buscar informações do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReserva();
    }, []);

    const handleLiberarVaga = async () => {
        if (!reserva) {
            Alert.alert('Erro', 'Reserva não encontrada.');
            return;
        }
    
        Alert.alert(
            'Atenção',
            'Você realmente gostaria de liberar a vaga?',
            [
                {
                    text: 'Não',
                    onPress: () => console.log('Cancelado'),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: async () => {
                        try {
                            const { error } = await supabase
                                .from('Reserva')
                                .delete()
                                .match({ id: reserva.id });
        
                            if (error) {
                                console.error('Erro ao excluir reserva:', error);
                                Alert.alert('Erro', 'Não foi possível excluir a reserva.');
                            } else {
                                const { error: updateError } = await supabase
                                    .from('Vaga')
                                    .update({ status: true })
                                    .match({ id: reserva.idVaga });
        
                                if (updateError) {
                                    console.error('Erro ao atualizar vaga:', updateError);
                                    Alert.alert('Erro', 'Não foi possível atualizar o status da vaga.');
                                } else {
                                    Alert.alert('Sucesso', 'A reserva foi excluída e a vaga atualizada para disponível.');
                                    setReserva(null);
                                }
                            }
                        } catch (error) {
                            console.error('Erro ao liberar vaga:', error);
                            Alert.alert('Erro', 'Ocorreu um erro ao liberar a vaga.');
                        }
                    },
                },
            ],
            { cancelable: false }
        );
    };

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (!reserva) {
        return <Text>Nenhuma reserva ativa.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Reserva ativa</Text>
            <Text style={styles.label}>Vaga: <Text style={styles.value}>{reserva.idVaga}</Text></Text>
            <Text style={styles.label}>Localização: <Text style={styles.value}>{reserva.local}</Text></Text>
            <Text style={styles.label}>Início da Reserva: <Text style={styles.value}>{reserva.horaInicial}</Text></Text>
            <Text style={styles.label}>Fim da Reserva: <Text style={styles.value}>{reserva.horaFim}</Text></Text>
            
            <TouchableOpacity onPress={handleLiberarVaga} style={styles.button}>
                <Text style={styles.buttonText}>Liberar vaga</Text>
            </TouchableOpacity>
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

export default Reservas;
