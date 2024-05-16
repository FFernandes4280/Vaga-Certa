import { StyleSheet, Image } from 'react-native';

//import { ImageSourcePropType } from 'react-native';
const PlaceholderImage = require('../assets/images/react-logo.png');

export default function ImageViewer() {
    return (
        <Image source={PlaceholderImage} style={styles.image} /> 
    );
}

const styles = StyleSheet.create({
    image: {
        width: 240,
        height: 320,
        borderRadius: 18,
    },
});
