export const searchMovies = async ({ search }) => {
  try {
    const reponse = await fetch(
      `http://www.omdbapi.com/?apikey=${
        import.meta.env.VITE_FILMS_API_KEY
      }&s=${search}`
    )
    const json = await reponse.json()
    const movies = json.Search
    return movies?.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      type: movie.Type
    }))
  } catch (error) {
    throw new Error("Error searching movies:", error)
  }
}
