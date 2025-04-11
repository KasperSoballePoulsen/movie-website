// Load environment variables from .env file
require('dotenv').config()

// Import modules
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

// Define path to the local wishlist file
const wishlistFile = path.join(__dirname, 'wishlist.json')

// Reusable options for fetch requests to TMDB API
const fetchOptionsGet = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
    }
}

const urlStart = 'https://api.themoviedb.org/3'

// Fetch and return selected genres from TMDB
async function getGenres() {
    const genreFilter = ["Action", "Comedy", "Thriller", "War", "Romance", "Drama", "Crime", "Documentary", "Horror"]
    const url = `${urlStart}/genre/movie/list?language=en`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()
        const genres = data.genres.filter(genre => genreFilter.includes(genre.name))
        return genres
    } catch (error) {
        console.error("Error fetching genres:", error)
        return null
    }
}

// Fetch movies for a specific genre + total count of movies in that genre
async function getMoviesWithCount(genreId, page = 1, moviesAmount = 20) {
    const url = `${urlStart}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`;
    try {
        const res = await fetch(url, fetchOptionsGet);
        
        const data = await res.json();
        let movies = data.results.slice(0,moviesAmount)
        
        // Extract relevant movie data
        movies = movies.map(movie => ({
            title: movie.title,
            posterPath: movie.poster_path,
            movieId: movie.id
        }))

        const moviesWithCount = {
            movies: movies,
            movieCount: data.total_results
        }

        
        return moviesWithCount 
    } catch (error) {
        console.error("Error:", error)
        return null
    }     
}

// Fetch genres and their first 14 movies
async function getGenresWithMovies() {
    const genres = await getGenres()
    
    const result = []
    if (genres !== null) {
        for (const genre of genres) {
            const moviesWithCount = await getMoviesWithCount(genre.id, 1, 14)
        
            result.push({
              genreName: genre.name,
              genreId: genre.id,
              genreMovieCount: moviesWithCount.movieCount,
              genreMovies: moviesWithCount.movies
            });

        }
    }
    return result
}

// Fetch movie info from TMDB by movie ID
async function getMovieInfo(movieId) {
    const url = `${urlStart}/movie/${movieId}?language=en-US`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()

        const releaseYear = data.release_date.split("-")[0]

        const genreNames = data.genres.map(genre => genre.name).join(", ") + "."

        const actorsAndDirectors = await getActorsAndDirector(movieId)

        const trailerKey = await getMovieTrailerKey(movieId)

        const movieInfo = {
            id: movieId,
            title: data.title,
            backdropPath: data.backdrop_path,
            description: data.overview,
            releaseYear: releaseYear,
            genreNames: genreNames,
            posterPath: data.poster_path,
            actors: actorsAndDirectors.actors,
            directors: actorsAndDirectors.directors,
            trailerKey: trailerKey
        }
        return movieInfo
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

// Fetch actors + directors from TMDB
async function getActorsAndDirector(movieId) {
    const url = `${urlStart}/movie/${movieId}/credits`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()

        // Extract names of directors
        const directors = data.crew
            .filter(person => person.job === "Director")
            .map(director => director.name)
            .join(", ") + "."

        // Extract names of all actors
        const actors = data.cast
            .map(actor => actor.name)
            .join(", ") + "."


        const actorsAndDirectors = {
            directors: directors,
            actors: actors
        }
        
        return actorsAndDirectors
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}

// Read and return wishlist from local JSON file
function getWishlistMovies() {
    if (!fs.existsSync(wishlistFile)) {
        return []
    }
    
    const data = fs.readFileSync(wishlistFile, 'utf-8')
    try {
        const wishlist = JSON.parse(data)
        return wishlist
    } catch (error) {
        console.error("Error parsing wishlist file:", error)
        return []
    }

}

// Save a movie to the wishlist (creates file if it doesn't exist)
function saveMovieToWishlist(id, title, posterPath) {

    const wishlist = getWishlistMovies()
  
    // Check if movie is already in wishlist
    const exists = wishlist.some(movie => movie.id === id)
  
    if (!exists) {
      wishlist.push({ id, title, posterPath })
      fs.writeFileSync(wishlistFile, JSON.stringify(wishlist, null, 2))
    }
}


// Remove a movie from the wishlist by ID
function removeMovieFromWishlist(movieId) {
    const wishlist = getWishlistMovies()
    const updatedWishlist = wishlist.filter(movie => movie.id !== movieId)
    fs.writeFileSync(wishlistFile, JSON.stringify(updatedWishlist, null, 2))
}

// Check if a movie is in the wishlist
function isInWishlist(movieId) {
    let isInWishlist = false

  if (fs.existsSync(wishlistFile)) {
    const data = fs.readFileSync(wishlistFile, 'utf-8')
    const wishlist = JSON.parse(data)

    // Compare using Number(movieId) to avoid type mismatch
    isInWishlist = wishlist.some(movie => movie.id === movieId)
  }

  return isInWishlist
}

//Gets the trailerkey used to find trailer on youtube
async function getMovieTrailerKey(movieId) {
    const url = `${urlStart}/movie/${movieId}/videos?language=en-US`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()
        const results = data.results || []
        const trailerElement = results.find(element => element.type === "Trailer" && element.site === "YouTube")
        const trailerKey = trailerElement.key
        return trailerKey
    } catch (error) {
        console.error("Error:", error)
        return null
    }
}



// Export the functions that are used by the server
module.exports = {
    getMoviesWithCount,
    getGenresWithMovies,
    getMovieInfo,
    saveMovieToWishlist,
    getWishlistMovies,
    removeMovieFromWishlist,
    isInWishlist
}