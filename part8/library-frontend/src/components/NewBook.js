import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {ADD_BOOK,ME} from '../query'

const NewBook = ({ notify , updateCacheWith,setMe}) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const me = useQuery(ME)
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(ADD_BOOK,{
    update : (store, response) => {
      const racxa = me.data ? me.data.me.favoriteGenre : null
      updateCacheWith(response.data.addBook,racxa)
    },
    onError: (error) => {
      notify(error.graphQLErrors[0].message)
    }
  })
  useEffect(()=>{
    if(me.data){
      setMe(me.data.me.favoriteGenre)
    } // eslint-disable-next-line
  },[me.data])
  const submit = async (event) => {
    event.preventDefault()
    createBook({variables : {title : title,author : author,published : parseInt(published),genres}})
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  if(me.loading){
    return <div>loading...</div>
  }
  return (
    <div>
      <h1>Add book</h1>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook