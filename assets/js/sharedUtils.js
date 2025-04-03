const movieElements = document.querySelectorAll(".movie")

movieElements.forEach(movie => movie.addEventListener("click", displayMovieInfo))

function displayMovieInfo() {
    window.location.href = `/movieInfo?id=${this.id}`;
}