import NavigationButton from "../NavigationButton/NavigationButton"
import {useLocation, useNavigate} from "react-router-dom";
import "./AdminHeader.css"

function AdminHeader(){

    const navigate = useNavigate(); 
    const location = useLocation();
    
    function handleLogout(){
        localStorage.removeItem('token');
        navigate("/adminLogin");
    }
    return <header className="admin-header">
        <button type="button" className="brand-home" onClick={() => navigate("/manageProducts")} aria-label="Admin dashboard">
            <img src="/images/logo.png" className="logo" alt="Sankar Electronics"/>
        </button>
        <div className="admin-brand-label">
            <span>Store operations</span>
            <h1 className="dashboard-title">Admin dashboard</h1>
        </div>
        <nav className="admin-navigation" aria-label="Admin navigation">
            <NavigationButton name="Products" current={location.pathname === "/manageProducts"} handleClick={() => navigate("/manageProducts")}/>
            <NavigationButton name="Enquiries" current={location.pathname === "/manageEnquiries"} handleClick={() => navigate("/manageEnquiries")}/>
            <NavigationButton name="Log out" handleClick={handleLogout}/>
        </nav>
    </header>
}

export default AdminHeader;