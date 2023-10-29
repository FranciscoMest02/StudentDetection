import { Schema, model, models } from "mongoose";

const courseSchema = new Schema({
    /*_id: {
      $oid: String,
    },*/
    name: String,
    teacher: String,
    teacherId: String,
    students: [
        {
            name: String,
            studentId: String,
        },
    ],
    days: [String],
    time: {
        start: String,
        end: String,
    },
    attendance: [
        {
            date: Date,
            name: String,
            studentId: String,
        },
    ],
    image_url: [String],
}, {
    collection: 'courses'
});

export default models.Course || model('Course', courseSchema)