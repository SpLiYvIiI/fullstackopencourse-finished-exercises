import React, {  useState } from 'react'

const Books = ({books}) => {
  const [filtered, setFiltered] = useState(books)
  let genres = ['all genres']
  books.forEach(book => {
    return book.genres.forEach(genre =>
      !genres.includes(genre) ? (genres = genres.concat(genre)) : null
    )
  })

  const filterByGenre = genre => {
    if (genre === 'all genres') {
      setFiltered(books)
    } else {
      const filter = books.filter(book => {
        if (book.genres.includes(genre)) {
          return book
        }
        return null
      })
      setFiltered(filter)
    }
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filtered.map(a => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {genres.map((genre, i) => {
        return (
          <button key={i} onClick={() => filterByGenre(genre)}>
            {genre}
          </button>
        )
      })}
    </div>
  )
}

export default Books