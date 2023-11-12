"use client"

import React, { useState } from "react";
import { format, parseISO } from 'date-fns';
import { es } from "date-fns/locale";

export default function CourseAttendance(props){
    const att = props.list
    const top = props.top ? props.top : att.attendance.length
    const topAttendances = att.attendance.slice(0, top);

    const [isTop, setIsTop] = useState(true)

    return(
        <div className="m-4 border border-2 border-gray-400 rounded-lg">
            <div className="text-center px-4 py-2">
                <span className="block font-bold text-xl py-2 text-cyan-600">  {att.course}  </span>
                <span className="block text-md text-gray-700">Asistencia total: {att.attendance.length}</span>
            </div>
            {isTop ? 
                <div className="p-4">
                    <span className="block pb-2">Asistencias más recientes:</span>
                    {topAttendances.map((day) => {
                        const date = parseISO(day.date);
                        const formattedDate = format(date, 'p b EEEE, dd MMMM', { locale: es });
                        return(
                            <span className="block p-2" key={day._id}> {formattedDate} </span>
                            )
                        })}
                </div>
            :
                <div className="p-4">
                    <span className="block pb-2">Asistencias más recientes:</span>
                    {att.attendance.map((day) => {
                        const date = parseISO(day.date);
                        const formattedDate = format(date, 'p b EEEE, dd MMMM', { locale: es });
                        return(
                            <span className="block p-2" key={day._id}> {formattedDate} </span>
                            )
                        })}
                </div>
            }
            {att.attendance.length > props.top ?
                <div className="text-center">
                    <span onClick={() => {setIsTop(!isTop)}} className="cursor-pointer block pb-4 text-blue-800">
                        <svg className="inline pr-2" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>
                        Ver {isTop ? 'todo' : 'menos'}
                    </span>
                </div>
            :
                <></>
            }
        </div>
    )
}