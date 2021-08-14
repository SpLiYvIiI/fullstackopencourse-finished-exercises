import {gql} from '@apollo/client'

export const ALL_BOOKS = gql`
query {
    allBooks{
        id
        title
        author{
            id
            name
            born
            bookCount
        }
        genres
        published
    }
}
`
export const ALL_BOOKS_GENRE = gql`
query getFavorite($genre : String){
    allBooks(genre: $genre){
        id
        title
        author{
            id
            name
            born
            bookCount
        }
        genres
        published
    }
}
`
export const ALL_AUTHORS = gql`
query{
    allAuthors{
        id
        name
        born
        bookCount
    }
}
`
export const ADD_BOOK = gql`
mutation createBook($title : String!,$author : String!,$published : Int!,$genres : [String!]!){
    addBook(title : $title,author : $author,published : $published, genres : $genres) {
        id
        title
        author{
            id
            name
            born
            bookCount
        }
        genres
        published
    }
}
`
export const UPDATE_BORN = gql`
mutation updateBorn($name : String!, $setBornTo : Int!) {
    editAuthor(name : $name, setBornTo : $setBornTo){
        id
        name
        born
        bookCount
    }
}
`
export const LOGIN = gql `
mutation login($username : String!, $password : String!){
    login(username : $username, password : $password){
        value
    }
}
`
export const ME = gql
`
query{
    me{
      id
      username
      favoriteGenre
    }
  }
`
export const BOOK_ADDED = gql
`
subscription{
    bookAdded{
        id
        title
        author{
            id
            name
            born
            bookCount
        }
        genres
        published
    }
  }
`