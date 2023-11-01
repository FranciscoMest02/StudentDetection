import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/db';

import Student from '@/models/Student';
import { useParams } from 'next/navigation';

export async function POST(req, res) {
    await connectDB()
    try {

        const params = await req.json();

        const newStudentObject = {
            name: params.name,
            attendance: [],
            courses: [],
        };

        const student = new Student(newStudentObject);
        await student.save();

        return NextResponse.json({
            status: 200,
            body: { message: 'Student added successfully' },
        });
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Internal server error saving new student' },
        });
    }
}