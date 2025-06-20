import {View, StyleSheet} from 'react-native'
import {useEffect, useState} from 'react'
import * as Location from 'expo-location'
import MapView, {Marker} from 'react-native-maps'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import * as Linking from 'expo-linking'
import MyButton from '../Home/MyButton'

export default function SosView({navigation, route}){
  const contato = route.params
  const [location, setLocation] = useState(null)

  navigation.setOptions({title: contato.nome + ' (' + contato.tipo + ')'})

  const getCurrentLocation = async () => {
    const {status} = await Location.requestForegroundPermissionsAsync()

    if(status !== 'granted'){
      alert('Location permission denied!')
    }else {
      const {coords} = await Location.getCurrentPositionAsync()

      setLocation ({
        ...coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
      })
    }
  }


useEffect (() => {
getCurrentLocation()
}, [])

const sendLocation = () =>{
  if(location){
    const msg = `${contato.nome}, preciso URGENTE da sua ajuda!
Estou neste lugar: https://www.google.com/maps/@${location.latitude},${location.longitude},18z`

    Linking.openURL(`whatsapp://send?text=${msg}&phone=+55${contato.telefone}`)
  }else {
    alert('Location permission denied!')
  }
}
  return(
    <View style={styles.container}>
      <MapView 
      style={styles.map}
      initialRegion={location}
      >
      {
        location &&
        <Marker
          coordinate={location}>
          <MaterialIcons name="location-pin" size={35} color="red" />
        </Marker>
      }    
      </MapView>
      <View style={styles.buttons}>
        <MyButton 
              style={styles.call}
              color="red"
              title={`Ligar para ${contato.nome}`}
              onPress={() => Linking.openURL(`tel:${contato.telefone}`
              )}> Ligar para {contato.nome}
        </MyButton>
        <MyButton 
              style={styles.call}
              color="gray"
              title="Enviar Localização"
              onPress={sendLocation}
              > Enviar Localização
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