import axios from 'axios'

const BASE_URL = 'https://api.github.com'

export const api = {
  get: (url) => {
    return axios.get(`${BASE_URL}/${url}`).then(response => response.data)
  }
}
