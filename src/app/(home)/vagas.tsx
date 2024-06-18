import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Estacionamento } from '../../types';
import { supabase } from '../../lib/supabase';

const Vagas = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [estacionamentos, setEstacionamentos] = useState<Estacionamento[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('Estacionamento')
            .select('*')
            .ilike('nome', `%${searchTerm}%`);
        setLoading(false);
        if (error) {
            Alert.alert('Erro na busca', error.message);
        } else {
            setEstacionamentos(data);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Vagas</Text>
            <View style={styles.searchContainer}>
                <TextInput
                    placeholder="Buscar estacionamento"
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
                estacionamentos.map((lot) => (
                    <Link key={lot.id} href={`/mapa/${lot.id}`} style={styles.estacionamentoItem}>
                        <Text>{lot.nome}</Text>
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
    estacionamentoItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
});

export default Vagas;
