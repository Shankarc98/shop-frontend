import {useState} from "react";
import axios from "axios"; 
import {useNavigate} from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(event){
        event.preventDefault();
        const body = {
            name: name,
            password : password
        }
        const url = import.meta.env.VITE_API_URL; 

        try{
            const response = await axios.post(`${url}/adminLogin`, body);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            const token = JSON.parse(localStorage.getItem('token'));
            console.log("handleLogin " + token)
            navigate("/manageProducts");
            
        }catch(err){
            console.log(err.stack);
        }



    }
    function handleName(event){
        setName(event.target.value);
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }

    return <div className="admin-login">
        <img className = "login-logo" src = "/images/logo.png" alt = "logo"/>
        <form onSubmit = {handleLogin} className = "admin-login-container">
            <h4 className="login-title">Admin Login</h4>
            
            <label className = "login-label" htmlFor = "username">Username</label>
            <input className = "login-field" onChange = {handleName} className = "login-field" type = "text" placeholder="Enter username" value = {name}/>
            
            <label className = "login-label" htmlFor = "password">Password</label>
            <input onChange = {handlePassword} className = "login-field" type = "password" placeholder="Enter password" value = {password}/>
            <button onClick = {handleLogin} className = "login-field login-button" type = "submit">Login</button>
        </form>
    </div>
}

export default AdminLogin;