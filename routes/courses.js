const express = require('express');
const router = express.Router();
const Course = require('../model/courseModel');
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
app.get('/api/courses', async (req, res) =>{
    try {
        const courses = await Course.find({ code: true}).sort({description: String});
        res.json(courseData)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error'});
    }
});

//Retrieving all published BSIT & BSIS courses 
app.get('/api/BSITBSIS-course', async (req, res) => {
    try {
        // Retrieve all BSIS courses
        const BSISCourses = await Course.find({ tags: 'BSIS' });

        // Retrieve all BSIT courses
        const BSITCourses = await Course.find({ tags: 'BSIT' });
        res.json({ courseData});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
