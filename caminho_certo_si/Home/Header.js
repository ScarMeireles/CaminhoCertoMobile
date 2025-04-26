import { View, Text, StyleSheet, Image } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.text}> Caminho Certo </Text>
      <Image style={styles.img} source={require('../assets/logo.png')} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    marginTop: 32,
    elevation: 30,
    gap: 10,
    padding: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: '#E9E9E9',
  },
  img: {
    width: 130,
    height: 130,
    borderRadius: 100,
  },
});
