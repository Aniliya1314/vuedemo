import axios from 'axios'
export function  request(config) {
  const instance  = axios.create({
    baseURL:'https://httpbin.org',
    // baseURL: 'http://123.207.32.32:8000/api/v2',
    //baseURL: 'http://106.54.54.237:8000/api/v1,
    timeout:5000
  })
  return instance(config)
}
