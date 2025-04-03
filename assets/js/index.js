
const viewAllMoviesButtons = document.querySelectorAll(".viewAllMoviesButton")
viewAllMoviesButtons.forEach(button => button.addEventListener("click", displayAllGenreMovies))

function displayAllGenreMovies() {
    const genreId = this.id.replace("viewAllMovies", "");
    const genreName = encodeURIComponent(this.name)
    window.location.href = `/genreMovie?id=${genreId}&name=${genreName}`;
}

const loadMoreMoviesButtons = document.querySelectorAll(".loadMoreButton")

loadMoreMoviesButtons.forEach(button => {
    button.addEventListener("click", hideLoadMoreButton)
})

function hideLoadMoreButton() {
    const genreId = this.dataset.genreId;
    const hiddenMovies = document.querySelectorAll(`.movie.hidden[data-genre-id="${genreId}"]`);
    
    hiddenMovies.forEach(movie => {
        movie.classList.remove("hidden");
    });

    this.style.display = "none";

}