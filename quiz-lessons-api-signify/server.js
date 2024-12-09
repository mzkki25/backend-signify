const express = require('express');
const bodyParser = require('body-parser');
const lessonRoutes = require('./routes/lessonRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
const port = 8080;

// Middleware untuk parsing JSON request body
app.use(bodyParser.json());

// Rute untuk root
app.get('/', (req, res) => {
  res.send('Welcome to the Lesson and Quiz API!');
});

// Gunakan routes untuk /api
app.use('/api', lessonRoutes);
app.use('/api', quizRoutes);

// Jalankan server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});