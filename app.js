const express = require('express');
const path = require('path');
const appMethods = require('./appMethods.js')

const app = express();
const PORT = 8000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));



app.get('/', async (req, res) => {
  try {
    const genresWithMovies = await appMethods.getGenresWithMovies()
    res.render('index', {
      title: 'Frontpage',
      genres: genresWithMovies,
      script: '/js/index.js',
      cssFile: '/css/frontpage.css'
    });
  } catch (error) {
    console.error("Failed to fetch from TMDB:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get('/movieInfo', async (req, res) => {
  const movieId = req.query.id;
  const movieInfo = await appMethods.getMovieInfo(movieId)

  res.render('movieInfo', {
      title: 'Movie Info', 
      script: '/js/movieInfo.js', 
      cssFil: '/css/movieInfo.css',
      movieInfo: movieInfo
  })
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});








/*app.get('/movie/:id', async (req, res) => {
  const movieId = req.params.id;

  const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer YOUR_API_KEY_HERE'
    }
  });*/