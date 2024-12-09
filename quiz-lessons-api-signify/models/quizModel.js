const fs = require('fs');
const path = require('path');

// Menyimpan path ke file JSON
const quizzesFilePath = path.join(__dirname, '../data/quiz.json');

// Fungsi untuk membaca data dari file JSON
const readQuizzesData = () => {
  const data = fs.readFileSync(quizzesFilePath, 'utf-8');
  return JSON.parse(data);
};

// Fungsi untuk memperbarui data dalam file JSON
const writeQuizzesData = (data) => {
  fs.writeFileSync(quizzesFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readQuizzesData,
  writeQuizzesData,
};