import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Course from '@/models/Course';

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        await connectDB();

        const courses = await Course.find();

        return NextResponse.json(courses);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
