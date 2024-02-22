const express = require('express');
const router = express.Router();
const courseModel = require('../model/courseModel');
const courseData = require('../courseData/courses.json');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://cemesamagalang:S6oerW79KjYFZlUZ@cluster0.xis18fs.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
});

//Retrieved all published backend courses and sorting alphabetically
app.get('/courses', async (req, res) => {
    try {
      const Course = await Course.find({}).sort({ description: 1 });
      res.json(courseData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// POST a new course
app.post('/', async (req, res) => {
  // Implement the logic to add a new course
});

// UPDATE a course
app.patch('/:id', async (req, res) => {
  // Implement the logic to update a course
});

// DELETE a course
app.delete('/:id', async (req, res) => {
  // Implement the logic to delete a course
});




app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
