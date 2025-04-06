
// Add click event listeners
function addInitialEventlisteners() {
    const viewAllMoviesButtons = document.querySelectorAll(".viewAllMoviesButton")
    viewAllMoviesButtons.forEach(button => button.addEventListener("click", displayAllGenreMovies))

    const loadMoreMoviesButtons = document.querySelectorAll(".loadMoreButton")
    loadMoreMoviesButtons.forEach(button => {
        button.addEventListener("click", hideLoadMoreButton)
    })

    const goToWishlistButton = document.getElementById("goToWishlistButton")
    goToWishlistButton.addEventListener('click', goToWishlist)

}


// Redirect to the genre page with genre ID and name
function displayAllGenreMovies() {
    const genreId = this.id.replace("viewAllMovies", "")
    const genreName = encodeURIComponent(this.name)

    // Navigate to the genreMovie page with query parameters
    window.location.href = `/genreMovie?id=${genreId}&name=${genreName}`
}


// Show hidden movies and hide the "Load More" button
function hideLoadMoreButton() {
    const genreId = this.dataset.genreId

    // Select all hidden movies for that genre
    const hiddenMovies = document.querySelectorAll(`.movie.hidden[data-genre-id="${genreId}"]`)
    
    // Remove the "hidden" class to show them
    hiddenMovies.forEach(movie => {
        movie.classList.remove("hidden")
    });

    // Hide the "Load More" button
    this.style.display = "none"

}

// Redirect to the wishlist page
function goToWishlist() {
    window.location.href = '/wishlist'
}

addInitialEventlisteners()