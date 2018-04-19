import axios from 'axios'

const BASE_URL = 'https://api.github.com'

export const api = {
  get: (url, params = {}) => {
    return axios.get(`${BASE_URL}/${url}`, params).then(response => response.data)
  }
}
