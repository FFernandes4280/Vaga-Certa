import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import MapView from 'react-native-maps'; // Import MapView component

const Vaga = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [parkingLots, setParkingLots] = useState([]); // State for parking lots
  const navigation = useNavigation(); // Get navigation instance

  // Fetch parking lots data on mount
  useEffect(() => {
    fetch('https://your-api-endpoint/parking-lots') // Replace with your API endpoint
      .then((response) => response.json())
      .then((data) => setParkingLots(data));
  }, []);

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  const handleParkingLotPress = (parkingLot) => {
    navigation.navigate('mapa', { parkingLot }); // Navigate to 'Mapa' screen with parkingLot data
  };

  const filteredParkingLots = parkingLots.filter((parkingLot) => {
    const searchTerm = searchQuery.toLowerCase();
    return parkingLot.name.toLowerCase().includes(searchTerm) || parkingLot.address.toLowerCase().includes(searchTerm);
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Pesquisar por local"
        onChangeText={handleSearchChange}
        value={searchQuery}
      />
      <FlatList
        data={filteredParkingLots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleParkingLotPress(item)}>
            <View style={styles.parkingLotItem}>
              <Text style={styles.parkingLotName}>{item.name}</Text>
              <Text style={styles.parkingLotAddress}>{item.address}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    height: 40,
    padding: 10,
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  parkingLotItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  parkingLotName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  parkingLotAddress: {
    fontSize: 16,
  },
});

export default Vaga;