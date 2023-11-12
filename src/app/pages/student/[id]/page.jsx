import CourseAttendance from "@/app/componentes/CourseAttendance";
import { fetchCourse, fetchStudent } from "@/app/controllers/apiController";
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

    for (const courseKey in attendanceByCourse) {
        attendanceByCourse[courseKey].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    // Transform the attendanceByDate object into an array of objects
    const resultArray = Object.keys(attendanceByCourse).map((courseKey) => (
        {
          courseId: courseKey,
          attendance: attendanceByCourse[courseKey],
    }));
    /* AQUI HAY ERROR ARREGLAR
    resultArray.map(async (item) => {
      const course = await fetchStudent(item.courseId)
      item.name = course.name
    })
    console.log(resultArray)
*/
  // Now, resultArray contains the desired format
  return resultArray;
}

async function getAttendanceCourses(attendance) {
  const promises = attendance.map(async (item) => {
    const course = await fetchCourse(item.courseId);
    const result = {
      ...item,
      course: course.name
    };
    return result;
  });

  return Promise.all(promises);
}

export default async function StudentInformation({params}) {
    const student = await fetchStudent(params.id)
    const attendance = sortAttendance(student.attendance)
    const attendanceCourses = await getAttendanceCourses(attendance)

    return (
        <div>
            <div className="text-center mt-12 mb-8"> 
                <span className="text-3xl font-bold">{student.name}</span>
            </div>

            <span className="block text-md pl-8">Tus asistencias:</span>
            
            <div className="grid grid-cols-3 px-8">
                {attendanceCourses.map((att) => {
                    return(
                        <CourseAttendance key={att.courseId} list={att} top={3} />
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