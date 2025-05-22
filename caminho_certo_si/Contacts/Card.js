import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Card({ nome, tipo, telefone, onPress, onDelete, onEdit}) {
  return (
  <>
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={require('../assets/filha.png')} style={styles.img}/>
      <View style={styles.infos}>
        <Text style={[styles.texto, styles.nome]}>{nome}</Text>
        <Text style={styles.texto}>{tipo}</Text>
        <Text style={styles.texto}>{telefone}</Text>
      </View>
      <View style={styles.divIcons}>
        <TouchableOpacity onPress={onDelete} style={styles.icons}>
          <FontAwesome name="remove" size={24} color="#E9E9E9" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEdit} style={styles.icons}>
          <AntDesign name="edit" size={24} color="#E9E9E9" />
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#1C1C1C'
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
  divIcons:{
    display: 'flex',
    flexDirection: 'row'
  },
  icons: {
    padding: 5
  }
  
});
