import CourseAttendance from "@/app/componentes/CourseAttendance";
import { fetchStudent } from "@/app/controllers/apiController";
import React from "react";

function sortAttendance(attendance) {
    // Create an object to store attendance records by date
    const attendanceByCourse = {};
    
    // Iterate through the attendance records and group them by date
    attendance.forEach((item) => {
      // Extract the date part (ignoring the time)
      const record = {
        _id: item._id,
        date: item.date,
      };
      //const dateKey = record.date.toISOString().split("T")[0];
      const courseKey = item.courseId
    
      // Check if the date key already exists, if not, initialize it with an empty array
      if (!attendanceByCourse[courseKey]) {
        attendanceByCourse[courseKey] = [];
      }
    
      // Add the attendance record to the corresponding date array
      attendanceByCourse[courseKey].push(record);
    });
    
    // Transform the attendanceByDate object into an array of objects
    const resultArray = Object.keys(attendanceByCourse).map((courseKey) => ({
      courseId: courseKey,
      attendance: attendanceByCourse[courseKey],
    }));

    // Function to format a date as "Monday, October 18, 2020"
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    return capitalizeFirstLetter(date.toLocaleDateString("es-MX", options));
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Now, resultArray contains the desired format
  return resultArray;
}

export default async function StudentInformation({params}) {
    const student = await fetchStudent(params.id)
    //const attendances = sortAttendance(student.attendance) 
    //console.log(attendances)
    return (
        <div>
            <div className="text-center mt-12 mb-8"> 
                <span className="text-3xl font-bold">{student.name}</span>
            </div>

            <span className="block text-md pl-8">Tus asistencias:</span>
            
            <div className="grid grid-cols-3 px-8">
                {sortAttendance(student.attendance).map((att) => {
                    return(
                        <CourseAttendance key={att.courseId} list={att} />
                    )
                })}
            </div>

            <span className="block text-md ml-8 mt-20">Tus participaciones:</span>

            <div>
                <span className="block ml-12 mt-12 text-2xl text-yellow-800 font-bold">En desarrollo...</span>
            </div>

        </div>
    )
}