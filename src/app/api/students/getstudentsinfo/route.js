import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function GET() {
    try {
        await connectDB();

        const students = await Student.find();

        return NextResponse.json(students);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
