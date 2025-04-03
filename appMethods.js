require('dotenv').config();
const fetch = require('node-fetch');

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

async function getMoviesWithCount(genreId, amount = 10) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    try {
        const res = await fetch(url, fetchOptionsGet);
        
        const data = await res.json();
        let movies = data.results.slice(0, amount);
        
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






module.exports = {
    getGenres,
    getMoviesWithCount,
    getGenresWithMovies,
    getMovieInfo
}