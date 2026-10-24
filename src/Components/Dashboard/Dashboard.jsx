import {useLocation, useNavigate} from "react-router-dom";
import NavigationButton from "../NavigationButton/NavigationButton";
import SearchBar from "../SearchBar/SearchBar";
import "../SearchBar/SearchBar.css";

function Dashboard(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const navigationItems = [
        {name: "Home", path: "/"},
        {name: "About us", path: "/aboutus"},
        {name: "Products", path: "/products"},
        {name: "Services", path: "/services"},
        {name: "Location", path: "/location"},
        {name: "Contact", path: "/contact"},
    ];
    
    return <header className="dashboard">
        <button className="brand-home" type="button" onClick={() => navigate("/")} aria-label="Sankar Electronics home">
            <img className="logo" src="/images/logo.png" alt="Sankar Electronics"/>
        </button>
        {props.searchbox ? <SearchBar 
                            category = {props.category} 
                            setSearchTerm = {props.setSearchTerm}
                            suggestions = {props.suggestions}
                            isSuggestion = {props.isSuggestion}                            
                            setIsSuggestion = {props.setIsSuggestion}
                            /> : null}
        <nav aria-label="Main navigation" className="navigation-container">
            {navigationItems.map((item) => (
                <NavigationButton
                    key={item.path}
                    handleClick={() => navigate(item.path)}
                    name={item.name}
                    current={location.pathname === item.path}
                />
            ))}
        </nav>
    </header>
}

export default Dashboard;
