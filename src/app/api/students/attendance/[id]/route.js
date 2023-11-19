import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';
import Course from '@/models/Course';

export async function PUT(request, { params }) {
  await connectDB()
  try {
    const data = await request.json();
    // console.log(params.id)
    // const studentId = params.id; // Assuming 'id' is the parameter name for the student's ID

    // // Find the student by _id
    // const student = await Student.findById(studentId);

    // if (!student) {
    //   // Handle the case where the student is not found
    //   return NextResponse.json({
    //     status: 404,
    //     body: { error: 'Student not found' },
    //   });
    // }

    const student = await Student.findById(params.id);
    const course = await Course.findById(data.courseId)

    // Create the new assistance object
    const newAssistance = {
      date: data.date.slice(0, -6), // Assuming 'date' is a string representing a date
      courseId: data.courseId
    };

    const courseAssistance = {
      date: data.date.slice(0, -6),
      studentId: params.id,
      name: student.name
    }

    // Push the new assistance data into the assistance array
    student.attendance.push(newAssistance); // Adjust the index as needed
    course.attendance.push(courseAssistance);

    // Save the updated student document
    await student.save();
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