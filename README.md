# 🎬 Movie Website – TMDB API Integration

This project is a movie browsing web application that uses [The Movie Database (TMDB)](https://www.themoviedb.org/) API to fetch and display movies by genre. Users can explore popular movies, view detailed information, and save favorites to a personal wishlist.

Built with **Node.js**, **Express**, **Pug**, and styled using **vanilla CSS** with mobile responsiveness in mind.

---

## 📌 Features

- 🎥 Browse popular movies by genre
- 🔎 View detailed info about each movie:
  - Title, description, release year, genres
  - Actors and directors
  - Movie poster and backdrop
- ❤️ Add or remove movies from a local wishlist
- 📄 Wishlist stored in a local JSON file (`wishlist.json`)
- 📱 Responsive layout for mobile and desktop
- 🚀 "Load more" button to dynamically fetch more movies

---

## 🔧 Technologies Used

- **Node.js**
- **Express.js**
- **Pug** (templating engine)
- **TMDB API** (movie data)
- **dotenv** (for API token handling)
- **node-fetch** (for server-side API calls)
- **Vanilla JavaScript** (for interactivity)
- **CSS** (custom responsive styling)
- **File System module** (`fs`) for saving the wishlist

---

## 🗂 Project Structure

```bash
movie-website/
│
├── app.js                     # Express server setup
├── appMethods.js              # API and wishlist logic
├── wishlist.json              # Local storage of wishlist movies
├── .env                       # Environment file for TMDB token
├── package.json               
│
├── views/                     # Pug templates
│   ├── index.pug              # Frontpage with genres and movies
│   ├── genreMovie.pug         # Full genre-specific movie page
│   ├── movieInfo.pug          # Detailed movie info page
│   ├── wishlist.pug           # Wishlist page
│   └── includes/
│       └── header.pug         # Reusable layout/header
│
├── assets/
│   ├── js/                    # Frontend JavaScript
│   │   ├── index.js
│   │   ├── genreMovie.js
│   │   ├── movieInfo.js
│   │   └── sharedUtils.js
│   └── css/                   # Stylesheets
│       ├── frontpage.css
│       ├── genreMovie.css
│       ├── movieInfo.css
│       ├── wishlist.css
│       └── generalLayout.css
│
└── README.md                  # Project documentation    
```

---

## 🚀 Getting Started

Follow the steps below to run the project locally.

---

### ✅ Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- A TMDB account and API access

---

### 1. Clone the Repository

```bash
git clone https://github.com/KasperSoballePoulsen/movie-website.git
cd movie-website
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a file called .env in the root of the project, and add your TMDB Read Access Token:
API_READ_ACCESS_TOKEN=your-tmdb-token-here

### 4. Run the App
```bash
node app.js
```
Then open your browser and go to:
http://localhost:8000
