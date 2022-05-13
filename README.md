# 📰 Newsly

Web platform where users can access in real time news articles tailored to their preferences.

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. This project requires a running MySQL database. You must enter the database credentials in the `news-backend/config/db.config.js` file. The Sequelize ORM will automatically generate the tables for you.

2. For authentication, you need:
    - A Firebase Admin Service Account key inside the backend config directory: `news-backend/config/serviceAccountKey.json`
    - A Firebase SDK config file inside the frontend config directory: `news-frontend/src/config/firebase.config.ts`. More information can be found [here](https://firebase.google.com/docs/web/setup?authuser=0&hl=en)

## 🔧 Usage

To run the backend server, you must first install the dependencies:
```bash
npm install
```
    
Then, you can run the server:
```bash
npm start
```

The application will be available at `http://localhost:8080`.

For running the development frontend server, first install the dependencies and then start the server:
```bash
npm install
npm start
```

