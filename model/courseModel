const mongoose = require('mongoose');

//Defining a schema for courses
const coursesSchema = new mongoose.Schema({
    year:String,
    courses: [{
        code: String,
        description: String,
        units: Number,
        tags: [String]
    }]
});

//Course model
const Courses = mongoose.model('Course', coursesSchema);

module.exports = Courses;
