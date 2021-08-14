import axios from 'axios'

const baserUrl = '/api/login'


const signIn = async (obj) => {
  const resp = await axios.post(baserUrl,obj)
  return resp.data
}

export default {
  signIn
}