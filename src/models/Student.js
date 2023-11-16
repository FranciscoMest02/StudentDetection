import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
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
    ],
    participation: [
        {
            course: {
                id: String,
                name: String
            },
            date: Date
        }
    ],
    courses: [
        { type: Schema.Types.ObjectId }
    ]
}, {
    collection: 'student'
})

export default models.Student || model('Student', studentSchema)