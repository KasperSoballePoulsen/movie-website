
// Add event listeners
function addInitialEventListeners() {
    const loadMoreButton = document.querySelector(".loadMoreButton")
    loadMoreButton.addEventListener('click', loadMoreMovies)
    
}


// Load more movies for the current genre
async function loadMoreMovies() {
    const genreId = this.dataset.genreId
    const nextPage = Number(this.dataset.nextPage)

    // Fetch more movies from the server
    const res = await fetch(`/loadMoreMovies?genreId=${genreId}&page=${nextPage}`)
    const data = await res.json()
    const newMovies = data.movies

    // Get the container that holds all the movies
    const moviesContainer = document.querySelector(".movies")

    // Loop through the new movies and create DOM elements for each
    newMovies.forEach(movie => {
        // Create movie container
        const movieContainer = document.createElement("div")
        movieContainer.classList.add("movie")
        movieContainer.id = movie.movieId

        // Add click event to open movie info when clicked
        movieContainer.addEventListener("click", () => {
            window.location.href = `/movieInfo?id=${movieContainer.id}`
        })

        // Create and configure image element
        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500${movie.posterPath}`
        img.alt = movie.title
    
        // Create and configure title element
        const title = document.createElement("p")
        title.textContent = movie.title

        // Add image and title to the movie container
        movieContainer.appendChild(img);
        movieContainer.appendChild(title);

        // Add the movie container to the page
        moviesContainer.appendChild(movieContainer)
    })

    // Increase page counter
    this.dataset.nextPage = nextPage + 1

    // Hide the button if no more movies were returned
    if (newMovies.length === 0) {
      this.style.display = "none"
    }
  

}

addInitialEventListeners()

