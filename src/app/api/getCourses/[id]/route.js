import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Course from '@/models/Course';

export const dynamic = 'force-dynamic'

export async function GET(req, {params}) {
    try {
        await connectDB();

        const course = await Course.findById(params.id);

        return NextResponse.json(course);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
