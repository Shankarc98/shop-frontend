import NavigationButton from "../NavigationButton/NavigationButton"
import {useNavigate} from "react-router-dom"; 
import "./AdminHeader.css"

function AdminHeader(){

    const navigate = useNavigate(); 
    
    function handleLogout(){
        localStorage.removeItem('token');
        navigate("/adminLogin");
    }
    return <div className = "admin-header">

        <img src = "/images/logo.png" className = "logo" alt = "logo"/>
        <h2 className = "dashboard-title">Admin Dashboard</h2>
        <div className = "navigation-container">
            <NavigationButton name = "Products" handleClick = {() => {navigate("/manageProducts")}}/>
            <NavigationButton name = "Enquiries" handleClick = {() => {navigate("/manageEnquiries")}}/>
            <NavigationButton name = "Logout" handleClick = {handleLogout}/>
        </div>
    </div>
}

export default AdminHeader;