import { useEffect, useLayoutEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Button } from 'react-native-paper';
import Card from './Card';
import { findAll, deleteById } from './ContactsAPI';

export default function ContactsView({ navigation }) {
  const [listContacts, setListContacts] = useState([]);
    

  const consultar = async () => {
    try {
      let contatos = await findAll()
      contatos = contatos.sort((c1, c2) => c1.nome.localeCompare(c2.nome))


      console.log(contatos);
      setListContacts(contatos);
    } catch (err) {
      alert(err.message);
    }
  };

  const excluir = async (id) =>{
    await deleteById(id)
    alert('Contato removido com Sucesso!')
    await consultar()
  }

  return (
    <View style={styles.container}>
      <Button onPress={consultar}>Listar</Button>
        <FlatList
          data={listContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Card {...item} onDelete={() => excluir(item.id)}/>}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
});
