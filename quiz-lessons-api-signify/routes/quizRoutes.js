// Routes/quizRoutes.js
const express = require('express');
const router = express.Router();

const quizzes = [
    {
        id: "quiz-1",
        title: "Hand gesture images for one of the letters of the alphabet",
        qustion: "Look at this picture of hand gestures. What letter is being gestured?",
        imageQuestion: "https://storage.googleapis.com/another-file-deployment/assets/hand-gesture/a.jpg",
        aOption: "A",
        bOption: "B",
        cOption: "C",
        dOption: "D",
        trueOption: "aOption",
        checkQuestion: false
    },
    {
        id: "quiz-2",
        title: "Guess the hand movement",
        qustion: "This movement is for the letter 'D'. Is this movement correct?",
        imageQuestion: "https://storage.googleapis.com/another-file-deployment/assets/hand-gesture/d.jpg",
        aOption: "True",
        bOption: "False",
        cOption: "It could be",
        dOption: "I dont know",
        trueOption: "aOption",
        checkQuestion: false
    },
    {
        id: "quiz-3",
        title: "Guess the word from 3 different pictures",
        qustion: "Guess the word shown with the following hand movements:",
        imageQuestion: "https://storage.googleapis.com/another-file-deployment/assets/hand-gesture/dog.jpg",
        aOption: "CAT",
        bOption: "DOG",
        cOption: "BAT",
        dOption: "LOG",
        trueOption: "bOption",
        checkQuestion: false
    },
    {
        id: "quiz-4",
        title: "Name of the international sign language system",
        qustion: "Sign languages ​​used around the world are not the same. What is the name of the sign language system used globally for communication between countries?",
        imageQuestion: "",
        aOption: "ASL (Americal Sign Language)",
        bOption: "ISL (Indian Sign Language)",
        cOption: "LIS (Lingua dei Segni Italiana)",
        dOption: "IS (International Sign)",
        trueOption: "dOption",
        checkQuestion: false
    }
];

// GET /api/quizzes
router.get('/quizzes', (req, res) => {
    res.json(quizzes);
});

// POST /api/quizzes
router.post('/quizzes', (req, res) => {
    const { title, qustion, imageQuestion, aOption, bOption, cOption, dOption, trueOption, checkQuestion } = req.body;
    const newQuiz = {
        id: `quiz-${quizzes.length + 1}`,
        title,
        qustion,
        imageQuestion,
        aOption,
        bOption,
        cOption,
        dOption,
        trueOption,
        checkQuestion: checkQuestion || false
    };
    quizzes.push(newQuiz);
    res.status(201).json({ message: 'Quiz added successfully!', quiz: newQuiz });
});

// GET /api/quizzes/:id
router.get('/quizzes/:id', (req, res) => {
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (quiz) {
        res.json(quiz);
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
});

// PUT /api/quizzes/:id
router.put('/quizzes/:id', (req, res) => {
    const { title, qustion, imageQuestion, aOption, bOption, cOption, dOption, trueOption, checkQuestion } = req.body;
    const quiz = quizzes.find(q => q.id === req.params.id);
    if (quiz) {
        quiz.title = title || quiz.title;
        quiz.qustion = qustion || quiz.qustion;
        quiz.imageQuestion = imageQuestion || quiz.imageQuestion;
        quiz.aOption = aOption || quiz.aOption;
        quiz.bOption = bOption || quiz.bOption;
        quiz.cOption = cOption || quiz.cOption;
        quiz.dOption = dOption || quiz.dOption;
        quiz.trueOption = trueOption || quiz.trueOption;
        quiz.checkQuestion = checkQuestion || quiz.checkQuestion;
        res.json({ message: 'Quiz updated successfully!', quiz });
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
});

// DELETE /api/quizzes/:id
router.delete('/quizzes/:id', (req, res) => {
    const index = quizzes.findIndex(q => q.id === req.params.id);
    if (index !== -1) {
        quizzes.splice(index, 1);
        res.json({ message: 'Quiz deleted successfully!' });
    } else {
        res.status(404).json({ message: 'Quiz not found' });
    }
});

module.exports = router;