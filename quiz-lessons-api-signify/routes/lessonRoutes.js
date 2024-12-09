// routes/lessonRoutes.js
const express = require('express');
const router = express.Router();

// Contoh data lesson dengan photoUrl
const lessons = [
  {
    id: 'lesson-1',
    title: 'Learn Basic A-F',
    subTitle: 'Beginner - 6 Lessons',
    photoUrl: 'https://storage.googleapis.com/another-file-deployment/assets/icon-material/1.png',
    ytUrl: 'https://youtube.com/shorts/335_Zxhuo-Y?feature=shared',
    completed: false, 
  },
  {
    id: 'lesson-2',
    title: 'Learn Basic G-L',
    subTitle: 'Beginner - 6 Lessons',
    photoUrl: 'https://storage.googleapis.com/another-file-deployment/assets/icon-material/3.png',
    ytUrl: 'https://youtu.be/5o5E_Q8wWvM?feature=shared',
    completed: false
  },
  {
    id: 'lesson-3',
    title: 'Learn Basic M-R',
    subTitle: 'Intermediete - 6 Lessons',
    photoUrl: 'https://storage.googleapis.com/another-file-deployment/assets/icon-material/6.png',
    ytUrl: 'https://youtu.be/zauLekMGtvw?feature=shared',
    completed: false
  },
  {
    id: 'lesson-4',
    title: 'Learn Basic S-Z',
    subTitle: 'Advanced - 6 Lessons',
    photoUrl: 'https://storage.googleapis.com/another-file-deployment/assets/icon-material/8.png',
    ytUrl: 'https://youtu.be/J5DrY2rVaeg?feature=shared',
    completed: false
  },
];

// GET /api/lessons
router.get('/lessons', (req, res) => {
  res.json(lessons);  // Mengirimkan data lengkap termasuk photoUrl
});

// POST /api/lessons
router.post('/lessons', (req, res) => {
  const { title, subTitle, completed, photoUrl } = req.body;
  const newLesson = {
    id: `lesson-${lessons.length + 1}`,
    title,
    subTitle,
    photoUrl,  
    ytUrl,
    completed: completed || false,
  };
  lessons.push(newLesson);
  res.status(201).json({ message: 'Lesson added successfully!', lesson: newLesson });
});

// GET /api/lessons/:id
router.get('/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === req.params.id);
  if (lesson) {
    res.json(lesson);
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// PUT /api/lessons/:id
router.put('/lessons/:id', (req, res) => {
  const { title, subTitle, completed, photoUrl } = req.body;
  const lesson = lessons.find(l => l.id === req.params.id);
  if (lesson) {
    lesson.title = title || lesson.title;
    lesson.subTitle = subTitle || lesson.subTitle;
    lesson.photoUrl = photoUrl || lesson.photoUrl;  // Update photoUrl jika ada
    lesson.completed = completed !== undefined ? completed : lesson.completed;
    res.json({ message: 'Lesson updated successfully!', lesson });
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

// DELETE /api/lessons/:id
router.delete('/lessons/:id', (req, res) => {
  const index = lessons.findIndex(l => l.id === req.params.id);
  if (index !== -1) {
    lessons.splice(index, 1);
    res.json({ message: 'Lesson deleted successfully!' });
  } else {
    res.status(404).json({ message: 'Lesson not found' });
  }
});

module.exports = router;
