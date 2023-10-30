import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/db';

import Student from '@/models/Student';
import Course from '@/models/Course';
import { useParams } from 'next/navigation';

export async function POST(req, res) {
    await connectDB()
    try {

        // 1. Obtenemos id, fecha, usuario y curso de la asistencia
        const params = await req.json();

        // 2. Obtenemos objeto de estudiante
        const student = await Student.findOne({ _id: params.studentId });
        console.log(student)

        if (!student) {
            // Handle the case where the student is not found
            return NextResponse.json({
                status: 404,
                body: { error: 'Student not found' },
            });
        }

        // 3. Obtenemos objeto de curso
        const course = await Course.findOne({ _id: params.courseId });

        if (!course) {
            // Handle the case where the student is not found
            return NextResponse.json({
                status: 404,
                body: { error: 'Course not found' },
            });
        }
        // 4. Creacion de objeto asistencia y push de asistencia en estudiante
        const newAssistanceStudent = {
            date: new Date(params.date),
            courseId: params.courseId,
        };

        const newAssistanceCourse = {
            date: new Date(params.date),
            studentId: student._id
        };

        // Push the new assistance data into the assistance array
        student.attendance.push(newAssistanceStudent); // Adjust the index as needed
        await student.save();

        // 5. Push de asistencia en curso
        course.attendance.push(newAssistanceCourse); // Adjust the index as needed
        await course.save();

        return NextResponse.json({
            status: 200,
            body: { message: 'Assistance added successfully' },
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