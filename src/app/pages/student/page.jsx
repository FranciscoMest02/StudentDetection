
import Student from '@/models/Student'
import { connectDB } from '@/utils/db'
import React from 'react'

async function loadStudents() {
    connectDB()
    const students = await Student.find()
    return students
  }
  

async function page() {
    const data = await loadStudents()
    console.log(data[0].courses[0])
    const assistance = data[0].courses[0].assistance
    return (
        <>
            {assistance.map((item) => (
                <div key={item.minutes}>
                    <p>{item.minutes}</p>
                    <p>{item.date.toString()}</p>
                </div>
            ))}
        </>
    );
}

export default page