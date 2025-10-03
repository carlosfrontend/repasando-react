import { useMemo, useRef, useState, useCallback } from "react"
import { searchMovies } from "../services/movies"

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  // Ambos hacen lo mismo

  // useCallback cuando lo que va a devolver es una función

  const getMovies = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
      setLoading(false)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // useMemo soo cuando lo que va a devolver es un valor

  const sortedMovies = useMemo(() => {
    // console.log("memoSortedMovies")
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, loading, error, getMovies }
}
