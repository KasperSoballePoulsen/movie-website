const express = require('express');
//const fetch = require('node-fetch');
const path = require('path');
const appMethods = require('./appMethods.js')

const app = express();
const PORT = 8000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', async (req, res) => {
  try {
    const genresWithMovies = await appMethods.getGenresWithMovies()
    res.render('index', {
      title: 'Frontpage',
      genres: genresWithMovies,
      script: '/js/index2.js',
      cssFile: '/css/frontpage.css'
    });
  } catch (error) {
    console.error("Failed to fetch from TMDB:", error);
    res.status(500).send("Internal Server Error");
  }
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