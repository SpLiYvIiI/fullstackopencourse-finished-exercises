import axios from 'axios'
const BaseURL = '/api/blogs'

const getAll = ()=>{
    return axios.get(BaseURL).then(response => response.data)
}
const deleteBlog = (id)=>{
    return axios.delete(`${BaseURL}/${id}`).then(response => {})
}

const addBlog = (newObj) =>{
    return axios.post(`${BaseURL}`,newObj).then(response => response.data)
}
export  default{
    getAll,
    deleteBlog,
    addBlog
}