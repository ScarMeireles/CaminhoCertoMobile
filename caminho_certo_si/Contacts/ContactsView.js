import { useEffect, useLayoutEffect, useState } from 'react';
import { ScrollView, FlatList, View, StyleSheet } from 'react-native';
import {
  Button,
  PaperProvider,
  Portal,
  Dialog,
  TextInput,
} from 'react-native-paper';
import Card from './Card';
import Feather from '@expo/vector-icons/Feather';
import MaskInput from 'react-native-mask-input';

import { findAll, deleteById, insert, update } from './ContactsAPI';

export default function ContactsView({ navigation }) {
  const [listContacts, setListContacts] = useState([]);

  const [id, setId] = useState(null);
  const [tipo, setTipo] = useState('');
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    if (listContacts.length === 0)
      navigation.setOptions({
        title: 'Contatos',
        headerRight: () => (
          <>
            <Feather
              onPress={openModal}
              name="user-plus"
              size={24}
              color="#E9E9E9"
            />
          </>
        ),
      });
  });

  useEffect(() => {
    consultar();
  }, []);

  const consultar = async () => {
    try {
      let contatos = await findAll();
      contatos = contatos.sort((c1, c2) => c1.nome.localeCompare(c2.nome));

      console.log(contatos);
      setListContacts(contatos);
    } catch (err) {
      alert(err.message);
    }
  };

  const excluir = async (id) => {
    await deleteById(id);
    alert('Contato removido com Sucesso!');
    await consultar();
  };

  const salvar = async () => {
    if (id) {
      await update(id, tipo, nome, telefone);

      alert('Contato atualizado com sucesso');

      await consultar();
    } else {
      await insert(tipo, nome, telefone);

      alert('Contato cadastrado com sucesso');
      await consultar();

      listContacts.push(novoContato);
      setListContacts(setListContacts);
    }
    closeModal();
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);

    setId(null);
    setTipo('');
    setNome('');
    setTelefone('');
  };

  const editar = (contato) => {
    setId(contato.id);
    setTipo(contato.tipo);
    setNome(contato.nome);
    setTelefone(contato.telefone);

    openModal();
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, backgroundColor: '#1C1C1C' }}>
        <FlatList
          data={listContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              {...item}
              onDelete={() => excluir(item.id)}
              onEdit={() => editar(item)}
              onPress={() => navigation.navigate('SOS', item)}
            />
          )}
        />
        <Portal>
          <Dialog
            visible={showModal}
            onDismiss={closeModal}>
            <Dialog.Title>Adicionar Contato</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Tipo"
                value={tipo}
                
                onChangeText={(text) => setTipo(text)}
              />
              <TextInput
                mode="outlined"
                label="Nome"
                value={nome}
                
                onChangeText={(text) => setNome(text)}
              />
              <TextInput
                mode="outlined"
                label="Telefone"
                keyboardType="phone-pad"
                value={telefone}
                
                render={(props) => (
                  <MaskInput
                    {...props}
                    onChangeText={(masked, unmasked) => setTelefone(masked)}
                    mask={[
                      '(',
                      /\d/,
                      /\d/,
                      ')',
                      ' ',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                      '-',
                      /\d/,
                      /\d/,
                      /\d/,
                      /\d/,
                    ]}
                  />
                )}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={closeModal}>CANCELAR</Button>
              <Button onPress={salvar}>SALVAR</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </PaperProvider>
  );
}

