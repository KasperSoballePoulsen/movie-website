// Add event listeners to movie elements and back arrow
function addInitialEventListeners() {
    const movieElements = document.querySelectorAll(".movie")
    movieElements.forEach(movie => movie.addEventListener("click", displayMovieInfo))
    const backArrow = document.getElementById('backArrow')
    backArrow.addEventListener('click', backToFrontpage)
}

// Navigate to the movie info page with the movie's ID in the URL
function displayMovieInfo() {
    window.location.href = `/movieInfo?id=${this.id}`
}

// Navigate back to the front page
function backToFrontpage() {
    window.location.href = '/'
}

addInitialEventListeners() 

