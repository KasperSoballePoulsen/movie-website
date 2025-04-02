const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

console.log(movieId);

const h1 = document.createElement("h1")
h1.textContent = movieId

document.body.appendChild(h1)