const express = require('express');
const path = require('path');
const appMethods = require('./appMethods.js')

const app = express();
const PORT = 8000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());


app.get('/', async (req, res) => {
  try {
    const genresWithMovies = await appMethods.getGenresWithMovies()
    res.render('index', {
      title: 'Frontpage',
      genres: genresWithMovies,
      scripts: ['/js/index.js', '/js/sharedUtils.js'],
      cssFiles: ['/css/frontpage.css', '/css/generalLayout.css']
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
      scripts: ['/js/movieInfo.js'], 
      cssFiles: ['/css/movieInfo.css', '/css/generalLayout.css'],
      movieInfo: movieInfo
  })
});


app.get('/genreMovie', async (req, res) => {
  const genreId = req.query.id;
  const genreName = req.query.name
  const moviesWithCount = await appMethods.getMoviesWithCount(genreId)

  const genre = {
    genreId: genreId,
    genreName: genreName
  }

  res.render('genreMovie', {
      title: 'Movies By Genre', 
      scripts: ['/js/sharedUtils.js', '/js/genreMovie.js'], 
      cssFiles: ['/css/genreMovie.css', '/css/generalLayout.css'],
      movies: moviesWithCount.movies,
      movieCount: moviesWithCount.movieCount,
      genre: genre
  })
});

app.get('/wishlist', (req, res) => {
  

  const movies = appMethods.getWishlistMovies();

  res.render('wishlist', {
      title: 'Wishlist', 
      scripts: ['/js/sharedUtils.js'], 
      cssFiles: ['/css/generalLayout.css', '/css/wishlist.css'],
      movies: movies,
  })
});


app.post('/addMovieToWishlist', (req, res) => {
  const { movieId, movieTitle, moviePosterPath } = req.body;
  appMethods.saveMovieToWishlist(movieId, movieTitle, moviePosterPath);
})


app.get('/loadMoreMovies', async (req, res) => {
  const genreId = req.query.genreId;
  const page = req.query.page;
  

  const moviesWithCount = await appMethods.getMoviesWithCount(genreId, page);

  res.json({movies: moviesWithCount.movies})

  
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


