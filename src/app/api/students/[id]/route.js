import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function GET(request, {params}) {
    try {
        await connectDB();

        const students = await Student.findById(params.id);

        return NextResponse.json(students);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
