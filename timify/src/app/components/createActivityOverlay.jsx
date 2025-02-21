import React from 'react';
import './componentsCSS/createActivityOverlay.css';
import { useState } from 'react';
import { DropdownComponent } from './dropdownComponent';
import DatePicker from 'react-datepicker';


export default function CreateActivityOverlay() {

    const activityTypes = ["Class", "Exam/Test", "Study Session", "Other"];
    const difficulties = ["Easy", "Medium", "Hard", "Demon"];
    const repeatOptions = ["Never", "Daily", "Weekly", "Monthly"];
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);




    

    return (
        <>
            <div className="overlay">
                <div className="overlay-content">
                    <div className="overlay-header">
                        <h2>Create Activity</h2>
                        <button className="close-button">X</button>
                    </div>

                    <div className="overlay-body">

                        <div className='group'/>
                        <label className='label'>Activity Name</label>
                        <input className='input' type='text' placeholder='Enter activity name'/>

                        <div className='group'/>
                        <label className='label'>Activity Type</label>
                        <DropdownComponent list={activityTypes} onSelect={(option) => console.log(option)}/>

                        <div className='group'/>
                        <label className='label'>Difficulty</label>
                        <DropdownComponent list={difficulties} onSelect={(option) => console.log(option)}/>

                        <div className='group'/>
                        <label className='label'>Date</label>
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="MMMM d, yyyy"
                            className='input'
                            placeholderText='Select a date'
                        />

                        <div className='group'/>
                        <label className='label'>Time</label>
                        <label className='label'>From</label>
                        <DatePicker
                            selected={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className='input'
                            placeholderText='Select a time'
                        />
                        <label className='label'>To</label>
                        <DatePicker
                            selected={selectedTime}
                            onChange={(time) => setSelectedTime(time)}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={15}
                            timeCaption="Time"
                            dateFormat="h:mm aa"
                            className='input'
                            placeholderText='Select a time'
                        />

                        <div className='group'/>
                        <label className='label'>Repeat</label>
                        <DropdownComponent list={repeatOptions} onSelect={(option) => console.log(option)}/>

                        <div className='group'/>
                        <label className='label'>Description</label>
                        <textarea className='input' placeholder='Enter description'/>
                        

                    </div>    
                </div>
            </div>
        </>
    );
}