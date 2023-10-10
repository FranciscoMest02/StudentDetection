import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function POST(request) {
    // Connect to the MongoDB database
    await connectDB();

    try {
        const data = await request.json();

        // Create a new student document based on the provided data
        const newStudent = new Student(data);

        // Save the new student document to the database
        await newStudent.save();

        return NextResponse.json({
            status: 200,
            body: { message: 'Student added successfully' },
        });
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Internal server error' },
        });
    }
}
