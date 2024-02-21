const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const courseData = require('./courseData/courses.json');
const Courses = require('./model/courseModel');

const app = express();

// Middleware
app.use(bodyParser.json());

// Define route to retrieve course data
app.get('/courses', (req, res) => {
    res.json(courseData);
});

//Retrieved all published backend courses and sorting alphabetically
app.get('/api/courses', async (req, res) =>{
    try {
        const courses = await Courses.find({}).sort({ description: 1 }); // Sort in ascending order of description
        res.json(courses); // Return the sorted courses
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});


//Retrieving all published BSIT & BSIS courses
app.get('/api/BSITBSIS-course', async (req, res) =>{
    try {
        // Find BSIS courses
        const bsisCourses = await Courses.find({ tags: 'BSIS' });

        // Find BSIT courses
        const bsitCourses = await Courses.find({ tags: 'BSIT' });

        // Send the retrieved courses as JSON response
        res.json({ bsisCourses, bsitCourses });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

// Connect to MongoDB
mongoose.connect('mongodb+srv://cemesamagalang:S6oerW79KjYFZlUZ@cluster0.xis18fs.mongodb.net/')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
