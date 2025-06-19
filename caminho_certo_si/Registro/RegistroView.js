import { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskInput from 'react-native-mask-input';
import { Dropdown } from 'react-native-element-dropdown';

export default function RegistroView() {
  const [nome, setNome] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [endereco, setEndereco] = useState('')
  const [tipoSanguineo, setTipoSanguineo] = useState('')
  const [alergia, setAlergia] = useState('')
  const [erroData, setErroData] = useState(null)
  const [erroNome, setErroNome] = useState(false)
  const [erroEndereco, setErroEndereco] = useState(false)
  const [erroTipo, setErroTipo] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const jsonValue = await AsyncStorage.getItem('@registro')

    if (jsonValue) {
      const registro = JSON.parse(jsonValue)
      setNome(registro.nome)
      setDataNascimento(registro.dataNascimento)
      setEndereco(registro.endereco)
      setTipoSanguineo(registro.tipoSanguineo)
      setAlergia(registro.alergia)
    }
  }

  const validarDataNascimento = (data: string): string | null => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/
    const match = data.match(regex)

    if (!match) return 'Data de nascimento inválida.'

    const dia = parseInt(match[1], 10)
    const mes = parseInt(match[2], 10) - 1
    const ano = parseInt(match[3], 10)

    const dataObj = new Date(ano, mes, dia)
    const hoje = new Date()

    if (
      dataObj.getFullYear() !== ano ||
      dataObj.getMonth() !== mes ||
      dataObj.getDate() !== dia
    ) {
      return 'Data de nascimento inválida.'
    }

    if (ano < 1900) {
      return 'O ano deve ser superior a 1900.'
    }

    if (dataObj > hoje) {
      return 'Você não veio do futuro!'
    }

    return null
  }

  const handleDataChange = (masked: string) => {
    setDataNascimento(masked)

    if (masked.length === 10) {
      const erro = validarDataNascimento(masked)
      setErroData(erro)
    } else {
      setErroData(null)
    }
  }

  const save = async () => {
  if (!nome.trim()) {
    alert('O campo Nome é obrigatório.')
    return
  }

  if (!endereco.trim()) {
    alert('O campo Endereço é obrigatório.')
    return
  }

  if (!tipoSanguineo) {
    alert('Selecione um tipo sanguíneo.')
    return
  }

  if (!nome.trim()) {
  setErroNome(true)
  alert('O campo Nome é obrigatório.')
  return
  } else {
    setErroNome(false)
  }

  if (!endereco.trim()) {
    setErroEndereco(true)
    alert('O campo Endereço é obrigatório.')
    return
  } else {
    setErroEndereco(false)
  }

  if (!tipoSanguineo) {
    setErroTipo(true)
    alert('Selecione um tipo sanguíneo.')
    return
  } else {
    setErroTipo(false)
  }

  const erro = validarDataNascimento(dataNascimento)
  if (erro) {
    setErroData(erro)
    alert(erro)
    return
  }

  const registro = {
    nome,
    dataNascimento,
    endereco,
    tipoSanguineo,
    alergia,
  }

  const jsonValue = JSON.stringify(registro)
  await AsyncStorage.setItem('@registro', jsonValue)

  alert('Dados Salvos com Sucesso!')
}

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Nome completo"
        value={nome}
        onChangeText={(text) => {
          setNome(text)
          setErroNome(false)
        }}
        error={erroNome}
      />
      <TextInput
        mode="outlined"
        label="Data de nascimento"
        value={dataNascimento}
        keyboardType="numeric"
        error={!!erroData}
        render={(props) => (
        <MaskInput
          {...props}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
          onChangeText={(masked, _) => handleDataChange(masked)}
          />
        )}
      />
      {erroData && (
        <Text style={{ color: 'red', marginTop: 4 }}>
          {erroData}
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Endereço"
        value={endereco}
        onChangeText={(text) => {
          setEndereco(text)
          setErroEndereco(false)
        }}
        error={erroEndereco}
      />

      <Text>Tipo Sanguineo</Text>
      <Dropdown
        mode="outlined"
        style={[styles.dropdown, erroTipo && { borderColor: 'red' }]}
        placeholder={'Tipo Sanguíneo'}
        data={[
          { value: 'A+' }, { value: 'A-' }, { value: 'B+' }, { value: 'B-' },
          { value: 'AB+' }, { value: 'AB-' }, { value: 'O+' }, { value: 'O-' },
        ]}
        labelField="value"
        valueField="value"
        value={tipoSanguineo}
        onChange={(item) => {
          setTipoSanguineo(item.value)
          setErroTipo(false)
        }}
      />
      {erroTipo && (
        <Text style={{ color: 'red', marginTop: 4 }}>
          Tipo sanguíneo é obrigatório.
        </Text>
      )}

      <TextInput
        mode="outlined"
        label="Alergia"
        value={alergia}
        onChangeText={(text) => setAlergia(text)}
      />

      <Button onPress={save}>
        Salvar
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    gap: 15,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
})
