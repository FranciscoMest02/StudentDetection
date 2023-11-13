import { Schema, model, models } from "mongoose";

const authSchema = new Schema({
    userId: String,
    username: String,
    password: String,
    role: String
}, {
    collection: 'auth'
});

export default models.Auth || model('Auth', authSchema)