import {NextResponse} from 'next/server'
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function  GET() {
    connectDB()
    const students = await Student.find()
    return NextResponse.json(students);
}