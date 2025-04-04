require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const wishlistFile = path.join(__dirname, 'wishlist.json');

const fetchOptionsGet = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
    }
}


async function getGenres() {
    const genreFilter = ["Action", "Comedy", "Thriller", "War", "Romance", "Drama", "Crime", "Documentary", "Horror"]
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en'
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()
        const genres = data.genres.filter(genre => genreFilter.includes(genre.name));
        return genres
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }
}

async function getMoviesWithCount(genreId, page = 1) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${genreId}`;
    try {
        const res = await fetch(url, fetchOptionsGet);
        
        const data = await res.json();
        let movies = data.results
        
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
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }     
}


async function getGenresWithMovies() {
    const genres = await getGenres();
    
    const result = [];
    for (const genre of genres) {
      
      
      const moviesWithCount = await getMoviesWithCount(genre.id);
  
      result.push({
        genreName: genre.name,
        genreId: genre.id,
        genreMovieCount: moviesWithCount.movieCount,
        genreMovies: moviesWithCount.movies
      });
      
    }
    return result;
}


async function getMovieInfo(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()

        const releaseYear = data.release_date.split("-")[0]

        const genreNames = data.genres.map(genre => genre.name).join(", ") + ".";

        const actorsAndDirectors = await getActorsAndDirector(movieId)

        const movieInfo = {
            id: movieId,
            title: data.title,
            backdropPath: data.backdrop_path,
            description: data.overview,
            releaseYear: releaseYear,
            genreNames: genreNames,
            posterPath: data.poster_path,
            actors: actorsAndDirectors.actors,
            directors: actorsAndDirectors.directors
        }
        return movieInfo
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }
}

async function getActorsAndDirector(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/credits`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()

        const directors = data.crew
            .filter(person => person.job === "Director")
            .map(director => director.name)
            .join(", ") + ".";

        const actors = data.cast
            .map(actor => actor.name)
            .join(", ") + ".";


        const actorsAndDirectors = {
            directors: directors,
            actors: actors
        }
        
        return actorsAndDirectors
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }
}

function getWishlistMovies() {
    if (!fs.existsSync(wishlistFile)) {
        return []; 
    }
    
    const data = fs.readFileSync(wishlistFile, 'utf-8');
    try {
        const wishlist = JSON.parse(data);
        return wishlist;
    } catch (err) {
        console.error("Error parsing wishlist file:", err);
        return [];
    }

}

//Creates a file in the root if it doesnt exit and adds the movie else adds the movie to the existing file
function saveMovieToWishlist(id, title, posterPath) {
    let wishlist = [];

  // If the file exists, read it
  if (fs.existsSync(wishlistFile)) {
    const data = fs.readFileSync(wishlistFile);
    wishlist = JSON.parse(data);
  }

  // Check if movie is already in wishlist
  const exists = wishlist.some(movie => movie.id === id);

  if (!exists) {
    wishlist.push({ id, title, posterPath });
    fs.writeFileSync(wishlistFile, JSON.stringify(wishlist, null, 2));
  }

}






module.exports = {
    getGenres,
    getMoviesWithCount,
    getGenresWithMovies,
    getMovieInfo,
    saveMovieToWishlist,
    getWishlistMovies
}