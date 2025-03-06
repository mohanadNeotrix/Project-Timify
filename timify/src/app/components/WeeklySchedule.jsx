import { useState } from "react";
import "./componentsCSS/WeeklySchedule.css";
import { startOfWeek, eachDayOfInterval, addDays, subWeeks, addWeeks } from "date-fns";

export default function WeeklySchedule({ activities }) {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  // Calculate the start and end of the current week
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  const [selectedActivity, setSelectedActivity] = useState(null);

  // Function to navigate weeks
  const goToPreviousWeek = () => setCurrentWeek(subWeeks(currentWeek, 1));
  const goToNextWeek = () => setCurrentWeek(addWeeks(currentWeek, 1));

  return (
    <div className="scheduleContainer">
      {/* Week Navigation Buttons */}
      <div className="weekNavigation">
        <button className="navButton" onClick={goToPreviousWeek}>← Previous Week</button>
        <h2 className="weekTitle">
          {weekStart.toLocaleDateString("en-US", { month: "long", day: "numeric" })} - 
          {addDays(weekStart, 6).toLocaleDateString("en-US", { month: "long", day: "numeric" })}
        </h2>
        <button className="navButton" onClick={goToNextWeek}>Next Week →</button>
      </div>

      <div className="calendarGrid">
        {/* Time header row */}
        <div className="timeHeader">
          <div className="timeHeaderCell" />
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="timeHeaderCell">
              {i * 2}:00
            </div>
          ))}
        </div>

        {/* Columns for each day of the week */}
        {weekDays.map((day, i) => (
          <div key={i} className="dayColumn">
            <div className="dayHeader">
              {day.toLocaleDateString("en-US", { weekday: "short" })}
            </div>

            {/* Time slots for each day (1-hour intervals) */}
            {Array.from({ length: 24 }).map((_, j) => (
              <div key={j} className="timeSlot">
                {activities
                  .filter((a) => {
                    const d = new Date(a.date);
                    const timeFrom = parseInt(a.timeFrom, 10);
                    const timeTo = parseInt(a.timeTo, 10);

                    return (
                      d.toDateString() === day.toDateString() &&
                      !(timeTo <= j || timeFrom >= j + 1)
                    );
                  })
                  .map((a, k) => (
                    <div
                      key={k}
                      className={`activityCard ${a.difficulty.toLowerCase()}`}
                      onClick={() => setSelectedActivity(a)}
                    >
                    </div>
                  ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedActivity && (
        <div className="activity-overlay">
          <div className="activity-popup">
            <div className="activity-popup-header">
              <h2>{selectedActivity.name}</h2>
              <button className="activity-close-button" onClick={() => setSelectedActivity(null)}>✖</button>
            </div>

            <div className="activity-popup-body">
              <p>
                <span className="activity-label">Date:</span>{" "}
                {new Date(selectedActivity.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p><span className="activity-label">Type:</span> {selectedActivity.type}</p>
              <p><span className="activity-label">Difficulty:</span> {selectedActivity.difficulty}</p>
              <p><span className="activity-label">Time:</span> {selectedActivity.fullTimeFrom} - {selectedActivity.fullTimeTo}</p>
              <p><span className="activity-label">Repeats:</span> {selectedActivity.repeat}</p>
              <p><span className="activity-label">Description:</span> {selectedActivity.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
