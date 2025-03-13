import React, { useState } from 'react';
import './componentsCSS/createActivityOverlay.css';
import { DropdownComponent } from './dropdownComponent';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function CreateActivityOverlay({ onClose, onSave }) {
    const activityTypes = ["Select", "Class", "Exam/Test", "Study Session", "Other"];
    const difficulties = ["Select", "Easy", "Medium", "Hard", "Demon"];
    const repeatOptions = ["Select", "Never", "Daily", "Weekly", "Monthly"];

    const [activityName, setActivityName] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('');
    const [selectedRepeat, setSelectedRepeat] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeFrom, setSelectedTimeFrom] = useState(null);
    const [selectedTimeTo, setSelectedTimeTo] = useState(null);
    const [description, setDescription] = useState('');

    const handleConfirm = () => {
        const formatHourOnly = (date) => 
            date ? date.toLocaleTimeString([], { hour: "2-digit", hour12: false }) : null;
    
        const formatFullTime = (date) => 
            date ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }) : null;

        if (!selectedDate || !selectedTimeFrom || !selectedTimeTo) {
            alert("Please fill in the required fields: Date, Time From, and Time To.");
            return;
        }
    
        const newActivity = {
            name: activityName || 'Unnamed',
            type: selectedType || 'Other',
            difficulty: selectedDifficulty || 'Easy',
            date: selectedDate ,
            timeFrom: formatHourOnly(selectedTimeFrom) ,
            timeTo: formatHourOnly(selectedTimeTo) ,
            fullTimeFrom: formatFullTime(selectedTimeFrom) ,
            fullTimeTo: formatFullTime(selectedTimeTo) ,
            repeat: selectedRepeat || 'Never',
            description: description || 'No description provided',
        };
    
        onSave(newActivity);  // Save the activity in the list
        onClose();  // Close the overlay
    };
    

    return (
        <div className="overlay">
            <div className="overlay-content">
                <div className="overlay-header">
                    <h2>Create Activity</h2>
                    <button className="close-button" onClick={onClose}>X</button>
                </div>

                <div className="overlay-body">
                    <div className='group'/>
                    <label className='label'>Activity Name</label>
                    <input 
                        className='input' 
                        type='text' 
                        placeholder='Enter activity name'
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                    />

                    <div className='group'/>
                    <label className='label'>Activity Type</label>
                    <DropdownComponent list={activityTypes} onSelect={setSelectedType} />

                    <div className='group'/>
                    <label className='label'>Difficulty</label>
                    <DropdownComponent list={difficulties} onSelect={setSelectedDifficulty} />

                    <div className='group'/>
                    <label className='label'>Activity Date (Required) </label>
                    <DatePicker
                        selected={selectedDate}
                        onChange={setSelectedDate}
                        dateFormat="MMMM d, yyyy"
                        className='input'
                        placeholderText='Select a date'
                    />

                    <div className='group'/>
                    <label className='label'>Activity Time (Required) </label>
                    <label className='label'>From:</label>
                    <DatePicker
                        selected={selectedTimeFrom}
                        onChange={setSelectedTimeFrom}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className='input'
                        placeholderText='Select a time'
                    />
                    <label className='label'>To:</label>
                    <DatePicker
                        selected={selectedTimeTo}
                        onChange={setSelectedTimeTo}
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
                    <DropdownComponent list={repeatOptions} onSelect={setSelectedRepeat} />

                    <div className='group'/>
                    <label className='label'>Description</label>
                    <textarea 
                        className='input' 
                        placeholder='Enter description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="overlay-footer">
                        <button className="cancel-button" onClick={onClose}>Cancel</button>
                        <button className="confirm-button" onClick={handleConfirm}>Create</button>
                    </div>
                </div>    
            </div>
        </div>
    );
}