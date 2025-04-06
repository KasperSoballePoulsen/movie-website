
// Add click event listeners
function addInitialEventlisteners() {
    const saveToWishlistButton = document.getElementById("saveToWishlistButton")
    saveToWishlistButton.addEventListener('click', addMovieToWishlist)

    const removeFromWishlistButton = document.getElementById("removeFromWishlistButton")
    removeFromWishlistButton.addEventListener('click', removeMovieFromWishlist)
    
    const backArrow = document.getElementById('backArrow')
    backArrow.addEventListener('click', backToFrontpage)
}

// Send movie data to the server to add it to the wishlist
async function addMovieToWishlist() {
    const movieId = this.dataset.movieId
    const movieTitle = this.dataset.movieTitle
    const moviePosterPath = this.dataset.moviePosterPath

    // Send POST request to server with movie data
    const res = await fetch('/addMovieToWishlist', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({movieId: movieId, movieTitle: movieTitle, moviePosterPath: moviePosterPath})
    })

    // Get response and update UI
    const data = await res.json()
    const isInWishlist = data.isInWishlist
    switchButton(isInWishlist)

}

// Send request to remove the movie from the wishlist
async function removeMovieFromWishlist() {
    const movieId = this.dataset.movieId

    // Send DELETE request to server
    const res = await fetch(`/wishlist/${movieId}`, {
        method: "DELETE"
    });

    // Get response and update UI
    const data = res.json()
    const isInWishlist = data.isInWishlist
    switchButton(isInWishlist)
}

// Show/hide the correct button based on wishlist status
function switchButton(isInWishlist) {
    const saveButton = document.getElementById("saveToWishlistButton");
    const removeButton = document.getElementById("removeFromWishlistButton");

    if (isInWishlist) {
        saveButton.style.display = "none";
        removeButton.style.display = "inline-block";
    } else {
        saveButton.style.display = "inline-block";
        removeButton.style.display = "none";
    }
}

// Navigate back to the front page
function backToFrontpage() {
    window.location.href = '/';
}

addInitialEventlisteners()