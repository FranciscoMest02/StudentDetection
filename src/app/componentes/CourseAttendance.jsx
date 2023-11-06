import React from "react";

export default function CourseAttendance(props){
    const att = props.list
    //const top3Attendance = att.attendance.slice(0, 3);

    return(
        <div className="m-4 border border-2 border-gray-400 rounded-lg">
            <div className="text-center px-4 py-2">
                <span className="block font-bold text-xl py-2"> -- {att.courseId} -- </span>
                <span className="block text-md text-gray-700">Asistencia total: {att.attendance.length}</span>
            </div>
            <div className="p-4">
                <span className="block pb-2">Asistencias más recientes:</span>
                {att.attendance.map((day) => {
                    return(
                        <span className="block" key={day._id}> {day.date} </span>
                    )
                })}
            </div>
            {/*
            <div className="border">
                {top3Attendance.map((day) => {
                    return(
                        <p key={day._id}> {day.date} </p>
                    )
                })}
            </div>
            */}
        </div>
    )
}