import React from "react";
import { connectDB } from "@/utils/db";
import Course from "@/models/Course";
import Sidebar from "@/app/componentes/Sidebar";
import StudentsList from "@/app/componentes/StudentList";

async function loadCourse(id){
    try{
        connectDB()
        const course = await Course.findById(id)
        return course
    } catch(e) {
        console.log(e)
        return null
    }
}

function studentObject(arr) {
    return arr.map((item) => {
        return {
            _id: item._id.toString(),
            name: item.name
        } 
    })
}

function sortAttendance(attendance){
    // Create an object to store attendance records by date
    const attendanceByDate = {};

    // Iterate through the attendance records and group them by date
    attendance.forEach((item) => {
        // Extract the date part (ignoring the time)
        const record = {
            name: item.name,
            studentId: item.studentId,
            date: item.date
        }
        const dateKey = record.date.toISOString().split('T')[0];

        // Check if the date key already exists, if not, initialize it with an empty array
        if (!attendanceByDate[dateKey]) {
            attendanceByDate[dateKey] = [];
        }

        // Add the attendance record to the corresponding date array
        attendanceByDate[dateKey].push(record);
    });

    // Transform the attendanceByDate object into an array of objects
    const resultArray = Object.keys(attendanceByDate).map((dateKey) => ({
    date: formatDate(dateKey),
    attendance: attendanceByDate[dateKey],
    }));

    // Function to format a date as "Monday, October 18, 2020"
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
        return capitalizeFirstLetter(date.toLocaleDateString('es-MX', options));
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    // Now, resultArray contains the desired format
    return resultArray;
}

async function Page({ params }) {
    const course = await loadCourse(params.id)
    const students = studentObject(course.students)

    //attendance pruebas
    const attendance = sortAttendance(course.attendance)

    return (
        <>
            {(course) ? 
                <>
                    <div className="flex">
                        <Sidebar />
                        <div className="grid p-4 w-full">
                            <div>
                                <p className="pt-8 px-8 font-bold text-4xl">{course.name}</p>
                                <div className="pt-2 pl-8 text-md text-gray-600">
                                    {course.days.map((day) => (
                                        <span className="pr-2" key={day}>{day}</span>
                                        ))}
                                    <span>{course.time.start} - {course.time.end}</span>
                                </div>
                            </div>
                                <div className="grid grid-flow-col grid-rows-5 gap-5 pt-8 pr-20">
                                    <div className="bg-gray-300 col-span-1 row-span-3 p-2 rounded-lg h-fit">
                                        <p className="text-lg py-4 text-center">Lista de estudiantes</p>
                                        <StudentsList data={students} />
                                    </div>
                                    <div className="bg-gray-300 col-span-1 row-span-2 p-2 rounded-lg">
                                        <p className="text-lg py-2 text-center">Asistencias</p>
                                        {attendance.map((at) => (
                                            <div key={at.date} className="p-2">
                                                <p className="py-4">{at.date}</p>
                                                <StudentsList data={at.attendance} />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-300 row-span-5 p-2 rounded-lg">
                                        <p>graphics table</p>
                                    </div>
                                </div>
                            
                        </div>
                    </div>
                </>
                :
                <>
                    No course
                </>
            }
        </>
    )
}

export default Page;