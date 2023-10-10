import { NextResponse } from 'next/server'
import { connectDB } from '@/utils/db';
import Student from '@/models/Student';

export async function PUT(request, { params }) {
  await connectDB()
  try {
    console.log(params)
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

    const student = await Student.findOne({ id: params.id });

    // Create the new assistance object
    const newAssistance = {
      minutes: data.minutes, // Replace with the correct property name from your request data
      date: new Date(data.date), // Assuming 'date' is a string representing a date
    };

    // Push the new assistance data into the assistance array
    student.courses[0].assistance.push(newAssistance); // Adjust the index as needed

    // Save the updated student document
    await student.save();

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