import { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Vaga } from '../../types'; // Substitua pelo caminho correto do seu arquivo types.ts
import { supabase } from '../../lib/supabase';

const Mapa = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [vagas, setVagas] = useState<Vaga[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchVagas();
    }, []);

    const fetchVagas = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Vaga')
            .select('*');
        setLoading(false);
        if (error) {
            Alert.alert('Erro ao buscar vagas', error.message);
        } else {
            setVagas(data);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Vaga')
            .select('*')
            .ilike('local', `%${searchTerm}%`);
        setLoading(false);
        if (error) {
            Alert.alert('Erro na busca', error.message);
        } else {
            setVagas(data);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mapa de Vagas</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Buscar vaga por local"
                    onChangeText={setSearchTerm}
                    value={searchTerm}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.button}>
                    <Text style={styles.buttonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                vagas.map((vaga) => (
                    <Link key={vaga.id} href={`/detalhes-vaga/${vaga.id}`} style={styles.vagaItem}>
                        <Text>{vaga.local} - {vaga.tipo}</Text>
                    </Link>
                ))
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#0000ff',
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    vagaItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});


export default Mapa;