const quizModel = require('../models/quizModel');

// Mendapatkan semua quiz
const getAllQuizzes = (req, res) => {
  const data = quizModel.readQuizzesData();
  res.json(data);
};

// Menambahkan quiz baru
const addQuiz = (req, res) => {
  const data = quizModel.readQuizzesData();
  const newQuiz = req.body; // Mengambil data dari body request
  data.listQuizzes.push(newQuiz);
  quizModel.writeQuizzesData(data);
  res.status(201).json({ message: 'Quiz added successfully!', quiz: newQuiz });
};

// Memperbarui quiz
const updateQuiz = (req, res) => {
  const { id } = req.params;
  const data = quizModel.readQuizzesData();
  const quizIndex = data.listQuizzes.findIndex(quiz => quiz.id === id);

  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  const updatedQuiz = req.body;
  data.listQuizzes[quizIndex] = { ...data.listQuizzes[quizIndex], ...updatedQuiz };
  quizModel.writeQuizzesData(data);
  res.json({ message: 'Quiz updated successfully', quiz: data.listQuizzes[quizIndex] });
};

// Menghapus quiz
const deleteQuiz = (req, res) => {
  const { id } = req.params;
  const data = quizModel.readQuizzesData();
  const quizIndex = data.listQuizzes.findIndex(quiz => quiz.id === id);

  if (quizIndex === -1) {
    return res.status(404).json({ message: 'Quiz not found' });
  }

  data.listQuizzes.splice(quizIndex, 1);
  quizModel.writeQuizzesData(data);
  res.json({ message: 'Quiz deleted successfully' });
};

module.exports = {
  getAllQuizzes,
  addQuiz,
  updateQuiz,
  deleteQuiz,
};