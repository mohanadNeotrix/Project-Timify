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
            
            {/* Time slots for each day */}
            {Array.from({ length: 12 }).map((_, j) => (
              <div key={j} className="timeSlot">
                {activities.filter(a => {
                  const d = new Date(a.date);
                  return d.getDay() === day.getDay() && 
                    d.getHours() >= j*2 && 
                    d.getHours() < j*2+2;
                }).map((a, k) => (
                  <div key={k} className="activityCard">
                    {a.name}
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