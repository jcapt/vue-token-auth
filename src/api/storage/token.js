const defaultCredentials = [
  'expiry', 
  'token-type', 
  'access-token', 
  'client', 
  'uid'
]

const setToken = (headers, credentials = defaultCredentials) => {
  return credentials.filter((credential) => {
    return localStorage.setItem(credential, headers[credential])
  })
}

const getToken = (credentials = defaultCredentials) => {
  const obj = {}

  credentials.filter((credential) => {
    obj[credential] = localStorage.getItem(credential)
  })

  return obj
}

const clearToken = (credentials = defaultCredentials) => {
  return credentials.filter((credential) => {
    return localStorage.removeItem(credential)
  })
}

const loginParamsExist = (credentials = defaultCredentials) => {
  return credentials.filter((credential) => {
    return localStorage.getItem(credential)
  }).every((el) => { return (el !== undefined) })
}

const findCredentialsInURI = (uri, credentials = defaultCredentials) => {
  return defaultCredentials.filter((credential) => {
    let value = uri.searchParams.get(credential)
    if (value) return value
  })
}

export {
  setToken,
  getToken,
  clearToken,
  loginParamsExist,
  findCredentialsInURI,
  defaultCredentials
}