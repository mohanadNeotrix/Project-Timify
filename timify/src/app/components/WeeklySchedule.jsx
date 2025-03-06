import { useState } from 'react';
import "./componentsCSS/WeeklySchedule.css";
import { startOfWeek, eachDayOfInterval, addDays } from 'date-fns';

export default function WeeklySchedule({ activities }) {
  const [currentWeek] = useState(new Date());
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ 
    start: weekStart, 
    end: addDays(weekStart, 6)
  });

  return (
    <div className="scheduleContainer">
      <div className="calendarGrid">
        {/* Time header row */}
        <div className="timeHeader">
        <div className="timeHeaderCell" />
        {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="timeHeaderCell">{i * 2}:00</div>
        ))}
        </div>

        {/* Columns for each day of the week */}
        {weekDays.map((day, i) => (
        <div key={i} className="dayColumn">
            <div className="dayHeader">
            {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>

            {/* Time slots for each day (1-hour intervals) */}
            {Array.from({ length: 24 }).map((_, j) => (
            <div key={j} className="timeSlot">
                {activities.filter(a => {
                const d = new Date(a.date);
                const timeFrom = parseInt(a.timeFrom, 10); // Convert "11" to 11 (String to int)
                const timeTo = parseInt(a.timeTo, 10);     // Convert "13" to 13 (String to int)

                return d.getDay() === day.getDay() &&
                    !(timeTo <= j || timeFrom >= j + 1); // Overlap check
                }).map((a, k) => (
                <div key={k}className={`activityCard ${a.difficulty.toLowerCase()}`} >
                </div>
                ))}
            </div>
            ))}
        </div>
        ))}
      </div>
    </div>
  );
}