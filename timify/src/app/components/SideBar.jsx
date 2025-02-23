import "./componentsCSS/SideBar.css";

const Sidebar = ({ onAddButtonClick }) => {


    return(
        <div className="sidebar">
            <div className = "sidebarContent"> 
                <button className="addButton" onClick={onAddButtonClick}>
                    +
                </button>
            </div>  
        </div>
    )
}
export default Sidebar;