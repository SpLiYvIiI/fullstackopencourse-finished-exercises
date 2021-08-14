import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken  = (newToken) => {
  token  = `bearer ${newToken}`
}
const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}
const addBlog = async newBlog => {
  const cfg = {
    headers : { Authorization : token }
  }
  const resp = await axios.post(baseUrl,newBlog,cfg)
  return resp.data
}
const updateBlog = async (newBlog) => {
  const resp = await axios.put(baseUrl+`/${newBlog.id}`,newBlog)
  return resp.data
}
const deleteBlog= async (blogId) => {
  const cfg = {
    headers : { Authorization : token }
  }
  await axios.delete(baseUrl + `/${blogId}`,cfg)
}

export default {
  getAll,
  addBlog,
  setToken,
  updateBlog,
  deleteBlog
}