import {View, Text, StyleSheet} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import {Button} from 'react-native-paper'
import * as Linking from 'expo-linking'
import MyButton from '../Home/MyButton'

export default function SosView({navigation, route}){
  const contato = route.params

  navigation.setOptions({title: contato.nome + ' (' + contato.tipo + ')'})

  return(
    <View style={styles.container}>
      <MapView style={styles.map}
      initialRegion={{
        latitude: -19.903436701216492, 
        longitude: -43.9655362275487,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      }}>
        <Marker
          coordinate={{
            latitude: -19.903436701216492, 
            longitude: -43.9655362275487,
          }}>
          <MaterialIcons name="location-pin" size={35} color="red" />
        </Marker>
      </MapView>
      <View style={styles.buttons}>
        <MyButton 
              style={styles.call}
              color="red"
              title={`Ligar para ${contato.nome}`}
              onPress={() => Linking.openURL(`tel:${contato.telefone}`
              )}> Ligar para {contato.nome}
        </MyButton>
        
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
container:{
  flex: 1
},
map:{
  width: '100%',
  height: '50%'
},
buttons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    height: 200,
    alignItems: 'center',
},
call:{
  width: 900,
}

})