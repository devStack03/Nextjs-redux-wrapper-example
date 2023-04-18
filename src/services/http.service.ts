import axios from 'axios'

const httpClient = axios.create({
  // baseURL: 'http://44.203.214.220:7000',
  baseURL: 'http://45.142.215.48:3000',
  headers: {
    'Content-type': 'application/json'
  }
})

// httpClient.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('shiftracer-token')
//   config.headers.Authorization = token ? `Bearer ${token}` : ''
//   return config
// })

export default httpClient

export const setAuthToken = (token: string) => {
  //   axios.defaults.headers.common['Authorization'] = ''
  //   delete axios.defaults.headers.common['Authorization']

  if (token) {
    localStorage.setItem('shiftracer-token', token)
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
export const getAuthToken = () => {
  return localStorage.getItem('shiftracer-token')
}