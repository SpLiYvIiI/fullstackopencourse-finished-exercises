import axios from 'axios'
const BaseURL = 'http://localhost:3001/persons'

const getAll = ()=>{
    return axios.get(BaseURL).then(response => response.data)
}
const deleteNumber = (id)=>{
    return axios.delete(`${BaseURL}/${id}`).then(response => console.log(response.data))
}

const updateNumber = (id,newObj) => {
return axios.put(`${BaseURL}/${id}`,newObj).then(response => response.data)
}
const addNumber = (newObj) =>{
    return axios.post(`${BaseURL}`,newObj).then(response => response.data)
}
export  default{
    getAll,
    deleteNumber,
    updateNumber,
    addNumber
}