import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function POST(req, res) {
    try {
        await connectDB();
        const data = await req.json()
        console.log(data)
        
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

                await student.participation.push(register)
                await student.save()
            })

            await Promise.all(participationPromises)

            await student.save()
        })

        await Promise.all(promises)

        return NextResponse.json("Actualizado con exito");
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error('Internal Server Error', 500);
    }
}
