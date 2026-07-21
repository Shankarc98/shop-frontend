import {useNavigate} from "react-router-dom";
import {useState, useEffect} from "react";
import NavigationButton from "../NavigationButton/NavigationButton"

function Dashboard(props){
    const [isMobile, setMobile] = useState(window.innerWidth <= 768);
    
    const navigate = useNavigate(); 
    
    useEffect(() => {
        function handleResize(){
            setMobile(window.innerWidth <= 368);
            
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    const isNav = true;
    
    return <div className="dashboard">
        <img className="logo" src="images/logo.png" alt="logo"/>
        <div style = {{display : isNav ? 'flex' : 'none'}}  className="navigation-container">    
            <NavigationButton handleClick = {() => navigate("/")} name="Home"/>
            <NavigationButton handleClick = {() => navigate("/aboutus")} name="About us"/>
            <NavigationButton handleClick = {() => navigate("/products")} name="Products"/>
            <NavigationButton handleClick = {() => navigate("/services")} name="Services"/>
            {!isMobile ? <NavigationButton handleClick = {() => navigate("/location")} name="Location"/> : null}
            <NavigationButton handleClick = {() => navigate("/contact")} name="Contact us"/>
        </div>
    </div>
}

export default Dashboard;
