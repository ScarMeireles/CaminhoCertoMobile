import HomeView from './Home/HomeView';
import ContactsView from './Contacts/ContactsView';
import SosView from './sos/SosView';
import RegistroView from './Registro/RegistroView'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          <Stack.Screen name="Home" component={HomeView} options={homeOptions} />
          <Stack.Screen name="Contatos" component={ContactsView} options={contactsOptions} />
          <Stack.Screen name="SOS" component={SosView} />
          <Stack.Screen name="Registro" component={RegistroView} options={RegistroOptions}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const defaultOptions = {
  headerStyle: {
    backgroundColor: '#1C1C1C',
  },
  headerTintColor: '#E9E9E9',
  backgroundColor: '#1C1C1C',
};

const homeOptions = {
  headerShown: false,
};

const contactsOptions = {
  title: 'Selecione o contato:',
};

const RegistroOptions = {
  title: 'Registro Pessoal:',
};
