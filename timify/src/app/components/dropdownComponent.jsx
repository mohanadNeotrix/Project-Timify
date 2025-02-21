"use client"
import './componentsCSS/dropdownComponent.css';
import { useState } from "react";

export function DropdownComponent({ list, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(list[0]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    if (onSelect) {
      onSelect(value); // Call the callback function with the selected option
    }
  };

  return (
    <div className="dropdown">
      <select value={selectedOption} onChange={handleChange} className="dropdown-select">
        {list.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}


