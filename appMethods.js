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

async function getMovies(genreId, amount = 5) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`;
    try {
        const res = await fetch(url, fetchOptionsGet);
        const data = await res.json();
        const movies = data.results.slice(0, amount);
        return movies 
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }     
}

//Henter antal film for en bestemt genre fra api'et
async function getMovieCount(genreId) {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`
    try {
        const res = await fetch(url, fetchOptionsGet)
        const data = await res.json()
        return data.total_results
    } catch (err) {
        console.error("Error fetching genres:", err);
        return null
    }
}



async function getGenresWithMovies() {
    const genres = await getGenres();
    const result = [];
    for (const genre of genres) {
      const movieCount = await getMovieCount(genre.id);
      const movies = await getMovies(genre.id);
  
      result.push({
        genreName: genre.name,
        genreId: genre.id,
        genreMovieCount: movieCount,
        genreMovies: movies.map(movie => ({
          title: movie.title,
          posterPath: movie.poster_path
        }))
      });
    }
    return result;
  }



module.exports = {
    getGenres,
    getMovies,
    getMovieCount,
    getGenresWithMovies
}