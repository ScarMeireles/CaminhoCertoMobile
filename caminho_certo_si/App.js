import HomeView from './Home/HomeView';
import ContactsView from './Contacts/ContactsView';
import SosView from './sos/SosView';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={defaultOptions}>
          <Stack.Screen
            name="Home"
            component={HomeView}
            options={homeOptions}
          />
          <Stack.Screen
            name="Contatos"
            component={ContactsView}
            options={contactsOptions}
          />
          <Stack.Screen
            name="SOS"
            component={SosView}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    </>
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
