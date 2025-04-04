const loadMoreButton = document.querySelector(".loadMoreButton")

loadMoreButton.addEventListener('click', loadMoreMovies)

async function loadMoreMovies() {
    const genreId = this.dataset.genreId;
    const nextPage = Number(this.dataset.nextPage);

    const res = await fetch(`/loadMoreMovies?genreId=${genreId}&page=${nextPage}`);
    const data = await res.json();
    const newMovies = data.movies;
    const moviesContainer = document.querySelector(".movies");

    console.log(newMovies);
    newMovies.forEach(movie => {
        const movieContainer = document.createElement("div");
        movieContainer.classList.add("movie");
        movieContainer.id = movie.movieId;

        const img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/w500${movie.posterPath}`;
        img.alt = movie.title;
    
        const title = document.createElement("p");
        title.textContent = movie.title;

        movieContainer.appendChild(img);
        movieContainer.appendChild(title);
        moviesContainer.appendChild(movieContainer);
    });

    // Increase page counter
    this.dataset.nextPage = nextPage + 1;

    // Optionally hide the button if there are no more movies
    if (newMovies.length === 0) {
      this.style.display = "none";
    }
  

}