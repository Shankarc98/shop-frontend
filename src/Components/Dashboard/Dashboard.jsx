import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import NavigationButton from "../NavigationButton/NavigationButton"

function Dashboard(props){
    const [isMobile, setMobile] = useState(window.innerWidth <= 768);
    
    const navigate = useNavigate(); 
    
    useEffect(() => {
        function handleResize(){
            setMobile(window.innerWidth <= 468);
            
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const isNav = true;
    
    return <div className="dashboard">
        <img className="logo" src="images/logo.png" alt="logo" onClick = {() => navigate("/")}/>
        <div style = {{display : isNav ? 'flex' : 'none'}}  className="navigation-container">    
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/")} name="Home"/> : null}
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/aboutus")} name="About us"/>: null}
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/products")} name="Products"/>: null}
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/services")} name="Services"/> : null}
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/location")} name="Location"/> : null}
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/contact")} name="Contact us"/> : null}
        </div>
    </div>
}

export default Dashboard;
