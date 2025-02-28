"use client";

import Image from "next/image";
import Head from "next/head";
import styles from './Home.module.css';
import { DropdownComponent } from "./components/dropdownComponent";
import TimifyButton from  "./components/TimifyButton";
import { useState } from "react";
import CreateActivityOverlay from "./components/createActivityOverlay";
import Sidebar from "./components/Sidebar";
import WeeklySchedule from "./components/WeeklySchedule";

export default function Home() {

  const [selectedOption, setSelectedOption] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(false); 
  const [activities, setActivities] = useState([]); // Store saved activities
  const options = ["Option 1", "Option 2", "Option 3"];
  const options4usif = ["usif1", "usif2", "usif3"];

  
  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log("Selected option:", option); // Print the selected option
  };
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible); // Toggle overlay visibility
  };
  const CloseOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible); // Toggle overlay visibility
  };
  const handleSaveActivity = (newActivity) => {
    setActivities([...activities, newActivity]); // Add to activity list
    console.log("Saved Activities:", [...activities, newActivity]); // Debugging
    setIsOverlayVisible(false); // Close overlay after saving
  };

  return (
    <>
      <Head>
        <title>Timify</title>
      </Head>


      <div>
        <header className={styles.header}>
          <TimifyButton/>
        </header>

        <div className={styles.homeContainer}>
          <Sidebar onAddButtonClick={toggleOverlay} /> {/* Pass toggle function as prop */}
            {isOverlayVisible && <CreateActivityOverlay onClose={CloseOverlay} onSave={handleSaveActivity} className="overlay" />}
        
            <div className={styles.mainContent}>
              <WeeklySchedule activities={activities} />
            </div>
        </div>
        
        {/*This is just a showcase for the dropdown component*/}
        {/* <DropdownComponent list={options} onSelect={handleSelect} />
        <p>Selected option: {selectedOption}</p>  
       

        <DropdownComponent list={options4usif} onSelect={handleSelect} /> */}
        {/* <CreateActivityOverlay className="overlay"/>  */}



        
      </div>
    </>
  );
}