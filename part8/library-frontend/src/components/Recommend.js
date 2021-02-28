import React, { useEffect, useState } from 'react'
import {useLazyQuery, useQuery} from '@apollo/client'
import {ALL_BOOKS_GENRE,ME} from '../query'

const Recommend = ({setMe}) => {
    const me = useQuery(ME)
    const [getFavorite , result] = useLazyQuery(ALL_BOOKS_GENRE)
    const [favBooks,setFavBooks] = useState(null)
    useEffect(()=>{
        if(me.data){
        setMe(me.data.me.favoriteGenre)
        getFavorite({variables : {genre : me.data.me.favoriteGenre}}) 
        }// eslint-disable-next-line
    },[me.data])
    useEffect(()=>{
        if(result.data){
            setFavBooks(result.data.allBooks)
        }
    },[result.data])
        if(!favBooks){
            return <div>loading...</div>
        }
             return(
                 <div>
                     <h1>books in you favortie genre {me.data.me.favoriteGenre}</h1>
                     <h1>books</h1>
                        <table>
                            <tbody>
                            <tr>
                                <th></th>
                                <th>
                                author
                                </th>
                                <th>
                                published
                                </th>
                            </tr>
                            {favBooks.map(a =>
                                <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                 </div>
             )
    }
export default Recommend