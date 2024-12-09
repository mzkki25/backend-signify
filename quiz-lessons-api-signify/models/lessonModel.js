const fs = require('fs');
const path = require('path');

// Menyimpan path ke file JSON
const lessonsFilePath = path.join(__dirname, '../data/lessons.json');

// Fungsi untuk membaca data dari file JSON
const readLessonsData = () => {
  const data = fs.readFileSync(lessonsFilePath, 'utf-8');
  return JSON.parse(data);
};

// Fungsi untuk memperbarui data dalam file JSON
const writeLessonsData = (data) => {
  fs.writeFileSync(lessonsFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
  readLessonsData,
  writeLessonsData,
};
