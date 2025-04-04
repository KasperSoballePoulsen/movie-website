const saveToWishlistButton = document.getElementById("saveToWishlistButton")
saveToWishlistButton.addEventListener('click', addMovieToWishlist)

async function addMovieToWishlist() {
    const movieId = this.dataset.movieId
    const movieTitle = this.dataset.movieTitle
    const moviePosterPath = this.dataset.moviePosterPath

    await fetch('/addMovieToWishlist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({movieId: movieId, movieTitle: movieTitle, moviePosterPath: moviePosterPath})
    })

}