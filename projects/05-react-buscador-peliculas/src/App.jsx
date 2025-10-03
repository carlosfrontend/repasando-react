import { useEffect, useState, useCallback, useRef } from "react"
import "./App.css"
import { Movies } from "./components/Movies"
import { useMovies } from "./hooks/useMovies"
import debounce from "just-debounce-it"

const useSearch = () => {
  const [search, updateSearch] = useState("")
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ""
      return
    }
    if (search === "") {
      setError(" No se puede buscar una película vacía")
      return // Importante salir
    }

    if (search.match(/^\d+$/)) {
      setError("No se puede buscar una película con un número")
      return
    }

    if (search.length < 3) {
      setError("La búsqueda debe tener al menos 3 carácteres")
      return
    }
    setError(null) // Setear el error a null en caso de no cumplirse ninguna condición
  }, [search])
  return { search, error, updateSearch }
}

function App() {
  const [sort, setSort] = useState(false)
  const { search, error, updateSearch } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  const debouncedGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search })
    }, 300),
    [getMovies]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const handleSort = () => {
    setSort(!sort)
  }

  useEffect(() => {
    console.log("new getMovies received")
  }, [getMovies])

  const handleChange = (event) => {
    const newSearch = event.target.value
    if (newSearch.startsWith(" ")) return // Prevalidación
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form
          onSubmit={handleSubmit}
          className='form'
        >
          <input
            style={{
              border: `1px solid transparent`,
              borderColor: error ? "red" : "transparent"
            }}
            onChange={handleChange}
            value={search}
            type='text'
            placeholder='Avengers, Star Wars, The Matrix ...'
          />
          <input
            type='checkbox'
            onChange={handleSort}
            checked={sort}
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Loading...</p> : <Movies movies={movies} />}</main>
    </div>
  )
}

export default App
