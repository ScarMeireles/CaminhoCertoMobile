import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MyButton from './MyButton';
import Header from './Header';

export default function HomeView({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View>
            <Text style={[styles.text, styles.title, styles.padding]}>
              Hello World!
            </Text>
            <Text style={styles.text}>
              {' '}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.{' '}
            </Text>
            <Text style={[styles.text, styles.title]}>
              {' '}
              The standard Lorem Ipsum passage used since the 1500s{' '}
            </Text>

            <Text style={styles.text}>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.{' '}
            </Text>
          </View>

          <View style={styles.buttons}>
            <MyButton
              color="gray"
              title="REGISTRO"
              onPress={() => navigation.navigate('Registro')}
            />
            <MyButton
              color="gray"
              title="RASTREIO"
              onPress={() => alert('Clicou no botão RASTREIO!')}
            />
            <MyButton
              color="red"
              title="Contatos"
              onPress={() => navigation.navigate('Contatos')}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  title: {
    fontSize: 25,
    display: 'flex',
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    padding: 10,
  },
  buttons: {
    justifyContent: 'space-evenly',
    height: 200,
    alignItems: 'center',
  },
  padding: {
    paddingTop: 15,
  },
});
