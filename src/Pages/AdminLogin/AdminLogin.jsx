import {useState} from "react";
import axios from "axios"; 
import {useNavigate} from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin(){
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);

    async function handleLogin(event){
        event.preventDefault();
        setSubmitting(true);
        setError(false);
        const body = {
            name: name,
            password : password
        }
        const url = import.meta.env.VITE_API_URL; 

        try{
            const response = await axios.post(`${url}/adminLogin`, body);
            localStorage.setItem("token", JSON.stringify(response.data.token));
            navigate("/manageProducts");
            
        }catch{
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }
    function handleName(event){
        setName(event.target.value);
    }
    function handlePassword(event){
        setPassword(event.target.value);
    }

    return <main className="admin-login">
        <a href="/" className="login-brand" aria-label="Return to Sankar Electronics">
            <img className="login-logo" src="/images/logo.png" alt="Sankar Electronics"/>
        </a>
        <form onSubmit={handleLogin} className="admin-login-container">
            <h1 className="login-title">Admin sign in</h1>
            <p className="login-description">Use your authorized account to manage the shop catalog and enquiries.</p>
            <label className="login-label" htmlFor="username">Username</label>
            <input id="username" className="login-field" onChange={handleName} type="text" autoComplete="username" placeholder="Enter username" value={name} required/>
            <label className="login-label" htmlFor="password">Password</label>
            <input id="password" onChange={handlePassword} className="login-field" type="password" autoComplete="current-password" placeholder="Enter password" value={password} required/>
            {error && <p className="form-feedback form-error" role="alert">Sign-in failed. Check your details and try again.</p>}
            <button className="login-button" type="submit" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign in"}
            </button>
        </form>
    </main>
}

export default AdminLogin;