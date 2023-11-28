import CourseAttendance from "@/app/componentes/CourseAttendance";
import StudentParticipation from "@/app/componentes/StudentParticipation";
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

function sortParticipations(participations){
  const participationByCourse = {};

  participations.forEach((item) => {
    const record = {
      _id: item._id,
      date: item.date
    }

    const courseKey = item.course.id
    if(!participationByCourse[courseKey]){
      participationByCourse[courseKey] = {
        name: item.course.name,
        participation: []
      }
    }

    participationByCourse[courseKey].participation.push(record);
  })

  const resultArray = Object.keys(participationByCourse).map((courseKey) => (
      {
        id: courseKey,
        name: participationByCourse[courseKey].name,
        participation: participationByCourse[courseKey].participation,
  }));

  return resultArray;
}

export default async function StudentInformation({params}) {
    const student = await fetchStudent(params.id)
    const attendance = sortAttendance(student.attendance)
    const attendanceCourses = await getAttendanceCourses(attendance)
    const participationCourses = sortParticipations(student.participation)

    return (
        <div>
            <div className="text-center mt-12 mb-8"> 
                <span className="text-3xl font-bold">{student.name}</span>
            </div>

            <span className="block text-2xl font-bold ml-8 mt-20">Tus asistencias:</span>
            
            <div className="grid grid-cols-3 px-8">
                {attendanceCourses.map((att) => {
                    return(
                        <CourseAttendance key={att.courseId} list={att} top={3} />
                    )
                })} 
            </div>

            <span className="block text-2xl font-bold ml-8 mt-20">Tus participaciones:</span>
            <div className="grid grid-cols-4 px-12 py-4">
              <span className="block bg-gray-200 p-8">Ninguna</span>
              <span className="block bg-green-200 p-8">Menos de 3</span>
              <span className="block bg-green-400 p-8">Entre 3 y 6</span>
              <span className="block bg-green-600 p-8">Más de 6</span>
            </div>

            <div>
                <div className="grid grid-cols-2 px-8 pb-12">
                {participationCourses.map((item) => {
                  return(
                    <StudentParticipation key={item.id} course={item.name} list={item.participation} />
                  )
                })}
                </div>
            </div>

        </div>
    )
}