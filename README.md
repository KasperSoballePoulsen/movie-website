# 🎬 Movie Website – TMDB API Integration

This project is a movie browsing web application that demonstrates how to fetch and display movie data using [The Movie Database (TMDB)](https://www.themoviedb.org/) API. It is built with **Node.js**, **Express**, **Pug**, and uses **dotenv** to securely handle API tokens.

---

## 📌 Features

- Fetches and displays a selection of movie genres
- Displays the most popular movies from each genre
- Users can click on a movie to view detailed information
- Information includes:
  - Title
  - Description
  - Release year
  - Genres
  - Directors
  - Actors
  - Backdrop image

---

## 🔧 Technologies Used

- Node.js
- Express.js
- Pug (for templating)
- Fetch API (via node-fetch)
- The Movie Database (TMDB) API
- dotenv (for secure API token handling)

---

## 🗂 Project Structure

```bash
movie-website/
│
├── app.js                     
├── appMethods.js              
├── .env                       
├── package.json               
│
├── views/                     
│   ├── index.pug              
│   ├── movieInfo.pug          
│   └── includes/
│       └── header.pug         
│
├── assets/                    
│   ├── js/
│   │   ├── index.js
│   │   └── movieInfo.js
│   └── css/
│       ├── frontpage.css
│       └── movieInfo.css
│
└── README.md       
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
