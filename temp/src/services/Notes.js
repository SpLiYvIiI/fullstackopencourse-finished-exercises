import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  const pst = axios.post(baseUrl, newObject)
  return pst.then(response => response.data)
}

const update = (id, newObject) => {
  const updat =  axios.put(`${baseUrl}/${id}`, newObject)
  return updat.then(response => response.data)
}

export default { getAll,create,update }