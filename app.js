// Importing modules
const express = require('express')
const path = require('path')
const appMethods = require('./appMethods.js') // Custom module with app logic

// Create Express app
const app = express()
const PORT = 8000

// Set Pug as the view engine and set the views directory
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

// Serve static files from the "assets" folder
app.use(express.static(path.join(__dirname, 'assets')))

// Parse incoming JSON requests
app.use(express.json())


// Frontpage route - loads genres with some movies
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
    console.error("Failed to fetch from TMDB:", error)
    res.status(500).send("Server Error")
  }
})

// Movie Info route - shows detailed info for a single movie
app.get('/movieInfo', async (req, res) => {
  const movieId = req.query.id
  const movieInfo = await appMethods.getMovieInfo(movieId)
  const inWishlist = appMethods.isInWishlist(movieId)

  res.render('movieInfo', {
      title: 'Movie Info', 
      scripts: ['/js/movieInfo.js'], 
      cssFiles: ['/css/movieInfo.css', '/css/generalLayout.css'],
      movieInfo: movieInfo,
      inWishlist: inWishlist
  })
})

// Genre Movie route - displays movies from a selected genre
app.get('/genreMovie', async (req, res) => {
  const genreId = req.query.id
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
})

// Wishlist route - displays saved movies
app.get('/wishlist', (req, res) => {
  const movies = appMethods.getWishlistMovies()

  res.render('wishlist', {
      title: 'Wishlist', 
      scripts: ['/js/sharedUtils.js'], 
      cssFiles: ['/css/wishlist.css', '/css/generalLayout.css'],
      movies: movies,
  })
})


// Add movie to wishlist
app.post('/addMovieToWishlist', (req, res) => {
  const movieId = req.body.movieId
  const movieTitle = req.body.movieTitle
  const moviePosterPath = req.body.moviePosterPath
  appMethods.saveMovieToWishlist(movieId, movieTitle, moviePosterPath);
  res.json({isInWishlist: true})
})

// Remove movie from wishlist by ID
app.delete('/wishlist/:movieId', (req, res) => {
  const movieId = req.params.movieId
  appMethods.removeMovieFromWishlist(movieId)
  res.json({ isInWishlist: false })
})

// Load more movies for a genre
app.get('/loadMoreMovies', async (req, res) => {
  const genreId = req.query.genreId
  const page = req.query.page
  
  const moviesWithCount = await appMethods.getMoviesWithCount(genreId, page)

  res.json({movies: moviesWithCount.movies})
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})


