import { View, Image, Text, StyleSheet } from 'react-native';
import { useUser } from '../../providers/AuthProvider'; // Import user data provider

const ProfileScreen = () => {
  const { user } = useUser(); // Get user data from provider

  return (
    <View style={styles.profileContainer}>
      {user && (
        <>
          <Image
            source={user.photoUrl ? { uri: user.photoUrl } : require('../../../assets/images/react-logo.png')} // Handle default image
            style={styles.profileImage}
          />
          <Text style={styles.profileEmail}>{user.email}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default ProfileScreen;