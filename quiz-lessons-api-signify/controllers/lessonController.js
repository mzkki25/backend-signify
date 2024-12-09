const lessonModel = require('../models/lessonModel');

// Mendapatkan semua lesson
const getAllLessons = (req, res) => {
  const data = lessonModel.readLessonsData();
  res.json(data);
};

// Menambahkan lesson baru
const addLesson = (req, res) => {
  const data = lessonModel.readLessonsData();
  const newLesson = req.body; // Mengambil data dari body request
  data.listLessons.push(newLesson);
  lessonModel.writeLessonsData(data);
  res.status(201).json({ message: 'Lesson added successfully!', lesson: newLesson });
};

// Memperbarui lesson
const updateLesson = (req, res) => {
  const { id } = req.params;
  const data = lessonModel.readLessonsData();
  const lessonIndex = data.listLessons.findIndex(lesson => lesson.id === id);

  if (lessonIndex === -1) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  const updatedLesson = req.body;
  data.listLessons[lessonIndex] = { ...data.listLessons[lessonIndex], ...updatedLesson };
  lessonModel.writeLessonsData(data);
  res.json({ message: 'Lesson updated successfully', lesson: data.listLessons[lessonIndex] });
};

// Menghapus lesson
const deleteLesson = (req, res) => {
  const { id } = req.params;
  const data = lessonModel.readLessonsData();
  const lessonIndex = data.listLessons.findIndex(lesson => lesson.id === id);

  if (lessonIndex === -1) {
    return res.status(404).json({ message: 'Lesson not found' });
  }

  data.listLessons.splice(lessonIndex, 1);
  lessonModel.writeLessonsData(data);
  res.json({ message: 'Lesson deleted successfully' });
};

module.exports = {
  getAllLessons,
  addLesson,
  updateLesson,
  deleteLesson,
};
