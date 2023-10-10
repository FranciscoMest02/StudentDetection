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
    courses: [
        {
            id: {
                type: String,
                trim: true
            },
            name: {
                type: String,
                trim: true
            },
            assistance: [
                {
                    minutes: {
                        type: Number
                    },
                    date: {
                        type: String
                    }
                }
            ]
        }
    ]
}, {
    collection: 'student'
})

export default models.Student || model('Student', studentSchema)