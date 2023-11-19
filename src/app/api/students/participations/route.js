import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';
import Course from '@/models/Course';

export async function PUT(req, res) {
    try {
        await connectDB();
        const data = await req.json()
        console.log(data)

        const courseObj = await Course.findById(data.courseId)
        
        const course = {
            "id": data.courseId,
            "name": data.course
        }

        const promises = data.students.map(async (item) => {
            const student = await Student.findById(item.studentId);

            const participationPromises = item.participations.map(async (parti) => {
                const register = {
                    course,
                    "date": parti
                }

                const courseRegister = {
                    studentId: item.studentId,
                    name: student.name,
                    date: parti
                }

                await student.participation.push(register)
                await courseObj.participation.push(courseRegister)
            })

            await Promise.all(participationPromises)

            await student.save()
        })

        await Promise.all(promises)
        await courseObj.save()

        return NextResponse.json({status: "ok", message: "Actualizado con exito"});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
