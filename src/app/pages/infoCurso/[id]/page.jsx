import React from "react";
import { connectDB } from "@/utils/db";
import Course from "@/models/Course";
import Sidebar from "@/app/componentes/Sidebar";
import StudentsList from "@/app/componentes/StudentList";
import Navbar from "@/app/componentes/Navbar";
import AttendanceChart from "@/app/componentes/AttendanceChart";

async function loadCourse(id) {
  try {
    connectDB();
    const course = await Course.findById(id);
    return course;
  } catch (e) {
    console.log(e);
    return null;
  }
}

function studentObject(arr) {
  return arr.map((item) => {
    return {
      _id: item._id.toString(),
      name: item.name,
    };
  });
}

function sortAttendance(attendance) {
  // Create an object to store attendance records by date
  const attendanceByDate = {};

  // Iterate through the attendance records and group them by date
  attendance.forEach((item) => {
    // Extract the date part (ignoring the time)
    const record = {
      name: item.name,
      studentId: item.studentId,
      date: item.date,
    };
    const dateKey = record.date.toISOString().split("T")[0];

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

function countAttendancesByDay(courseObject) {
  const attendanceByDay = {};

  // Iterate over each attendance record in the course object
  courseObject.attendance.forEach((attendance) => {
    // Get the date object from the attendance record
    const dateObj = new Date(attendance.date);

    // Get the day of the week (short form, e.g., 'Mon')
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    // Get the month (short form, e.g., 'Jan')
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });

    // Get the day of the month
    const dayOfMonth = dateObj.getDate();

    // Create a string in the format "Mon, May 18"
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    // Increment the count for the corresponding formatted date
    if (attendanceByDay[formattedDate]) {
      attendanceByDay[formattedDate]++;
    } else {
      attendanceByDay[formattedDate] = 1;
    }
  });

  // Sort the result by day in descending order
  const sortedResult = Object.entries(attendanceByDay)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .slice(0, 15);

  // Convert the sorted result to an object
  const sortedAttendanceByDay = Object.fromEntries(sortedResult);

  return sortedAttendanceByDay;
}

function countParticipationsByDay(courseObject) {
  const participationsByDay = {};

  // Iterate over each participation record in the course object
  courseObject.participation.forEach((participation) => {
    // Get the date object from the participation record
    const dateObj = new Date(participation.date);

    // Get the day of the week (short form, e.g., 'Mon')
    const dayOfWeek = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

    // Get the month (short form, e.g., 'Jan')
    const month = dateObj.toLocaleDateString('en-US', { month: 'short' });

    // Get the day of the month
    const dayOfMonth = dateObj.getDate();

    // Create a string in the format "Mon, May 18"
    const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}`;

    // Increment the count for the corresponding formatted date
    if (participationsByDay[formattedDate]) {
      participationsByDay[formattedDate]++;
    } else {
      participationsByDay[formattedDate] = 1;
    }
  });

  // Sort the result by day in descending order
  const sortedResult = Object.entries(participationsByDay)
    .sort((a, b) => new Date(b[0]) - new Date(a[0]))
    .slice(0, 15);

  // Convert the sorted result to an object
  const sortedParticipationsByDay = Object.fromEntries(sortedResult);

  return sortedParticipationsByDay;
}

function countAttendancesByStudent(courseObject) {
  const attendancesByStudent = {};

  // Iterate over each attendance record in the course object
  courseObject.attendance.forEach((attendance) => {
    const studentName = attendance.name;

    // Initialize the count for the corresponding student if not exists
    if (!attendancesByStudent[studentName]) {
      attendancesByStudent[studentName] = {
        name: studentName,
        attendance: 0,
      };
    }

    // Increment the count for the corresponding student
    attendancesByStudent[studentName].attendance++;
  });

  // Convert the result to an array of objects
  const resultArray = Object.values(attendancesByStudent);

  return resultArray;
}

function toArray(object, firstColumn, secondColumn) {
  const dataArray = [[firstColumn, secondColumn]];

  // Iterate over the keys in the result object
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      // Push an array with the formatted date and count to the dataArray
      dataArray.push([key, object[key]]);
    }
  }

  return dataArray;
}

async function Page({ params }) {
  const course = await loadCourse(params.id);
  const att = toArray(countAttendancesByDay(course), "Fecha", "Asistencias totales")
  const part = toArray(countParticipationsByDay(course), "Fecha", "Participaciones")
  const students = countAttendancesByStudent(course)

  return (
    <>
      {course ? (
        <>
          <div>
            <Navbar />
            <div className="grid p-4 w-full">
              <div>
                <p className="pt-8 px-8 font-bold text-4xl">{course.name}</p>
                <div className="pt-2 pl-8 text-md text-gray-600">
                  {course.days.map((day) => (
                    <span className="pr-2" key={day}>
                      {day}
                    </span>
                  ))}
                  <span>
                    {course.time.start} - {course.time.end}
                  </span>
                </div>
              </div>
              <div className="grid grid-flow-col grid-rows-5 gap-5 pt-8 pr-20">
                <div className="bg-gray-300 col-span-1 row-span-3 p-2 rounded-lg h-fit">
                  <p className="text-lg py-4 text-center">
                    Lista de estudiantes
                  </p>
                  <StudentsList data={students} />
                </div>
                <div className="bg-gray-300 row-span-5 p-2 rounded-lg">
                  <p>Asistencia general</p>
                  <AttendanceChart data={att} />
                  <p>Participaciones generales</p>
                  <AttendanceChart data={part} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>No course</>
      )}
    </>
  );
}

export default Page;
