import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/db';

import Student from '@/models/Student';
import Course from '@/models/Course';
import { useParams } from 'next/navigation';

export async function POST(req, res) {
    await connectDB()
    try {

        const params = await req.json();

        const newCourseObject = {
            name: params.name,
            teacher: params.teacher,
            students: [],
            days: params.days,
            time: {
                start: params.startDate,
                end: params.endDate
            },
            attendance: [],
            imageUrl: ""
        };

        const course = new Course(newCourseObject);
        await course.save();

        return NextResponse.json({
            status: 200,
            body: { message: 'Course added successfully' },
        });
    } catch (error) {
        // Handle any errors that may occur during the process
        console.error(error);
        return NextResponse.json({
            status: 500,
            body: { error: 'Internal server error saving new course' },
        });
    }
}