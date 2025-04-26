import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Card({ nome, tipo, telefone, onPress, onDelete}) {
  return (
  <>
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={require('../assets/filha.png')} style={styles.img}/>
      <View style={styles.infos}>
        <Text style={[styles.texto, styles.nome]}>{nome}</Text>
        <Text style={styles.texto}>{tipo}</Text>
        <Text style={styles.texto}>{telefone}</Text>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <FontAwesome name="remove" size={24} color="#E9E9E9" />
      </TouchableOpacity>
    </TouchableOpacity>
      
  </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
  },
  img: {
    borderRadius: 15,
  },
  texto: {
    color: '#E9E9E9',
    paddingLeft: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
  nome: {
    fontSize: 30,
  },
  infos: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});
