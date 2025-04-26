export async function findAll(){
  const URL = 'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos'
  const requestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 12119355'      
    }
  }

  const httpResponse = await fetch(URL, requestInit)

  if(httpResponse.ok){
    console.log('Sucesso ao consultar os contatos!')
    return await httpResponse.json()
  } else {
    const error = await httpResponse.text()
    console.log('Falha ao consultar os contatos:', httpResponse.status, error)

    throw new Error('Algo deu errado! :(')
  }
}


export async function deleteById(id){
  const URL = 'https://api-contato-dot-api-samples-423102.uc.r.appspot.com/api/contatos/' + id
  const requestInit = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer 12119355'      
    }
  }

  const httpResponse = await fetch(URL, requestInit)

  if(httpResponse.ok){
    console.log('Sucesso ao deletar o contato!')
    return await httpResponse.json()
  } else {
    const error = await httpResponse.text()
    console.log('Falha ao deletar o contato:', httpResponse.status, error)

    throw new Error('Algo deu errado! :(')
  }
}



