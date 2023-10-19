import request from './request'

export const login = (data) => {
  return new Promise(resolve => {
    resolve([null, {data: {token: Date.now()}}])
  })
}

export const logout = () => {
  return new Promise(resolve => {
    resolve([null, {data: {}}])
  })
}
