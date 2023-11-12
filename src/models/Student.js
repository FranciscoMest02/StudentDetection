import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
    id: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    attendance: [
        {
            date: Date,
            courseId: String,
        }
    ],
    courses: [
        {
            courseId: String
        }
    ]
}, {
    collection: 'student'
})

export default models.Student || model('Student', studentSchema)