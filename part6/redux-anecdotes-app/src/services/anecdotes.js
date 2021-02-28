import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
  }
const addAnecdote = async (content)=>{
    const newObj = {
        content : content,
        votes : 0
    }
    const response = await axios.post(baseURL,newObj)
    return response.data
}
const updateAnecdote = async (obj) =>{
    const response = await axios.put(`${baseURL}/${obj.id}`,obj)
    return response.data
}

export default{
    getAll,
    addAnecdote,
    updateAnecdote
}