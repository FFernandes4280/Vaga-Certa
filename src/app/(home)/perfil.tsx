import { View, Image, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../providers/AuthProvider'; // Importa o hook useAuth

const ProfileScreen = () => {
  const { session, loading } = useAuth(); // Obtém a sessão e o estado de carregamento do contexto de autenticação

  if (loading) {
    return (
      <View style={styles.profileContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!session) {
    return (
      <View style={styles.profileContainer}>
        <Text>Não autenticado</Text>
      </View>
    );
  }

  const { user } = session; // Obtém o objeto de usuário da sessão

  return (
    <View style={styles.profileContainer}>
      <Image
        source={user?.user_metadata?.avatar_url ? { uri: user.user_metadata.avatar_url } : require('../../../assets/images/icon.png')} // Manipula a imagem padrão
        style={styles.profileImage}
      />
      <Text style={styles.profileEmail}>{user?.email}</Text>
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
