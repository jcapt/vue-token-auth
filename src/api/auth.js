import axios from 'axios'

import { getToken, findCredentialsInURI } from '@/api/storage/token'

const configAuth = (authUrl) => {
  return {
    register: (credentials) => {
      return axios({
        method: 'post',
        url: authUrl,
        data: credentials
      })
    },

    login: (credentials) => {
      return axios({
        method: 'post',
        url: `${authUrl}/sign_in`,
        data: credentials
      })
    },

    remindPassword(credentials) {
      return axios({
        method: 'post',
        url: `${authUrl}/password`,
        data: credentials
      })
    },

    changePassword(credentials) {
      const url = new URL(window.location.href)

      return axios({
        headers: findCredentialsInURI(url),
        method: 'put',
        url: `${authUrl}/password`,
        data: credentials
      })
    },

    verifyToken() {
      return axios({
        method: 'get',
        url: `${authUrl}/validate_token`,
        headers: getToken()
      })
    },

    logout() {
      return axios({
        method: 'delete',
        url: `${authUrl}/sign_out`,
        headers: getToken()
      })
    }
  }
}

export default configAuth
