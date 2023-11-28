"use client"

import { useState } from "react";

export default function StudentParticipation(props) {
    const list = props.list
    const now = new Date()
    const [date, setDate] = useState(now.getMonth())
    let currentDate = new Date(now.getFullYear(), date, 1); // Month is zero-based (9 is October)
    
    const renderCalendar = () => {
        const calendarRows = [];
        let tempDate = new Date(currentDate); // Use a temporary date object to avoid modifying the state directly
        tempDate.setDate(1); // Set the day to the first of the month
    
        // Determine the day of the week for the first day of the month
        const startDay = tempDate.getDay();
    
        let week = [];
    
        // Add empty cells for days before the start of the month
        for (let i = 0; i < startDay; i++) {
          week.push(<td key={`empty-${i}`} className="p-4"></td>);
        }
    
        // Render the days of the month
        while (tempDate.getMonth() === currentDate.getMonth()) {
          const day = tempDate.getDate();
          const dateString = tempDate.toISOString().split('T')[0];
    
          // Calculate participation count for the current day
          const participationCount = list.filter(item => item.date.split('T')[0] === dateString).length;
    
          // Determine the color based on participation count
          let colorClass = 'bg-gray-100';
          if (participationCount == 0){
            colorClass = 'bg-gray-200'
        } else if (participationCount < 3) {
            colorClass = 'bg-green-200';
          } else if (participationCount < 6) {
            colorClass = 'bg-green-400';
          } else {
            colorClass = 'bg-green-600';
          }
    
          week.push(
            <td key={day} className={`p-4 text-center ${colorClass}`}>
              {day}
            </td>
          );
    
          // Move to the next day
          tempDate.setDate(day + 1);
    
          // Start a new row after Sunday (7 days in a week)
          if (tempDate.getDay() === 0) {
            calendarRows.push(<tr key={tempDate}>{week}</tr>);
            week = [];
          }
        }
    
        // Add empty cells for remaining days in the last row
        for (let i = tempDate.getDay(); i < 7; i++) {
          week.push(<td key={`empty-${i}`} className="p-4"></td>);
        }
    
        // Add the last row
        if (week.length > 0) {
          calendarRows.push(<tr key={tempDate}>{week}</tr>);
        }
    
        return calendarRows;
      };
    
      return (
        <div className="pb-4">
            <div className="text-center">
                <span className="block font-bold text-xl py-2 text-cyan-600">  {props.course}  </span>
                <span className="px-4 font-bold" onClick={() => {setDate(date-1)}}>&lt;</span>
                <span className="font-bold">{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                <span className="px-4 font-bold" onClick={() => {setDate(date+1)}}>&gt;</span>
            </div>
        <table className="w-full border-collapse mt-8">
          <thead>
            <tr>
              <th className="p-4">Dom</th>
              <th className="p-4">Lun</th>
              <th className="p-4">Mar</th>
              <th className="p-4">Mie</th>
              <th className="p-4">Jue</th>
              <th className="p-4">Vie</th>
              <th className="p-4">Sab</th>
            </tr>
          </thead>
          <tbody>
            {renderCalendar()}
          </tbody>
        </table>
        </div>
      );
    
    return (
        <>
            <p>{props.course}</p>
            {
                props.list.map((item) => {
                    return(
                        <p key={item._id}> {item.date}</p>
                    )
                })
            }

        </>
    )
}