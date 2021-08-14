import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import Login from './components/Login'
import {ALL_AUTHORS,ALL_BOOKS,ALL_BOOKS_GENRE,BOOK_ADDED} from './query'
import { useApolloClient, useQuery,useSubscription } from '@apollo/client'
import Recommend from './components/Recommend'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(null)
  const [me, setMe] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  const updateCacheWith = (addedBook,genre) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInBooks = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInBooks.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInBooks.allBooks.concat(addedBook) }
      })
    }
    const datainAuthors = client.readQuery({query : ALL_AUTHORS})
    if(!includedIn(datainAuthors.allAuthors,addedBook.author)){
      client.writeQuery({
        query : ALL_AUTHORS,
        data : {allAuthors : datainAuthors.allAuthors.concat(addedBook.author)}
      })
    }
    if (genre) {
      const Genre = client.readQuery({
        query: ALL_BOOKS_GENRE,
        variables: { genre: genre },
      })
      if (Genre) {
        if (!includedIn(Genre.allBooks, addedBook) && addedBook.genres.includes(genre)) {
          client.writeQuery({
            query: ALL_BOOKS_GENRE,
            variables: { genre: genre },
            data: { allBooks: Genre.allBooks.concat(addedBook) },
          })
        }
      }
    }
  }


    useEffect(() => {
      const token = localStorage.getItem('library-user-token')
      if ( token ) {
        setToken(token)
      }
    }, [])
    useSubscription(BOOK_ADDED, {
      onSubscriptionData: ({ subscriptionData }) => {
        const addedBook = subscriptionData.data.bookAdded
        notify(`${addedBook.title} added`)
        updateCacheWith(addedBook,me)
      }
    })
    const logout = ()=>{
      setToken(null)
      localStorage.clear()
      client.resetStore()
      setPage('authors')
    }
  if(authors.loading || books.loading)
  {
    return  <div>loading...</div>
  }
  return (
    <div>
      <div>
        <Notify errorMessage = {errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button>  : <></>}
        {token ? <button onClick={() => setPage('recommend')}>recommend</button>  : <></>}
        {token ? <button onClick={logout}>log out</button>  : <button onClick={() => setPage('login')}>login</button>}
      </div>

      {page === 'authors' ?  <Authors notify = {notify}authors={authors.data.allAuthors} />  : <></> }
      {page === 'books' ? <Books books={books.data.allBooks} />: <></>}
      {page === 'add'? <NewBook notify = {notify} updateCacheWith = {updateCacheWith} setMe={setMe}/> : <></>}
      {page === 'login' ?<Login  notify = {notify} setToken= {setToken} setPage = {setPage} /> : <></>}
      {page === 'recommend'? <Recommend setMe = {setMe}/> : <></>}



    </div>
  )
}

export default App