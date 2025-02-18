
export function DropdownComponent({ list }) {
    return (
      <div className="dropdown">
        <select>
          {list.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }