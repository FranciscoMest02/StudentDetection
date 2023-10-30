import { Schema, model, models } from "mongoose";

const studentSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    attendance: [
        {
            date: {
                type: String,
                trim: true
            },
            courseId: {
                type: String,
                trim: true
            },
        }
    ],
    courses: [
        { type: Schema.Types.ObjectId }
    ]
}, {
    collection: 'student'
})

export default models.Student || model('Student', studentSchema)