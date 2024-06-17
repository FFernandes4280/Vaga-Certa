import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
// import { supabase } from './supabaseClient'; // Import the Text component from the react-native package

const Info = () => {
    const route = useRoute();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        // Supondo que o identificador da vaga seja passado como parâmetro para esta página
        const { identificador } = route.params;

        // Função para buscar as informações da vaga no Supabase
        async function fetchInfo() {
        try {
            let { data, error } = await supabase
            .from('vagas') // Substitua 'vagas' pelo nome da sua tabela
            .select('identificador, localizacao, tipo, status, plano')
            .eq('identificador', identificador)
            .single();

            if (error) throw error;
            setInfo(data);
        } catch (error) {
            alert(error.message);
        }
        }

        fetchInfo();
    }, []);

    if (!info) {
        return <Text>Carregando...</Text>;
    }

    return (
        <View>
        <Text>Identificador: {info.identificador}</Text>
        <Text>Localização: {info.localizacao}</Text>
        <Text>Tipo: {info.tipo}</Text>
        <Text>Status: {info.status}</Text>
        <Text>Plano: {info.plano}</Text>
        </View>
    );
};
export default Info;