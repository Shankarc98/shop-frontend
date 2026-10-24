import Dashboard from "../../Components/Dashboard/Dashboard";
import Footer from "../../Components/Footer/Footer"
import MobileNavBar from "../../Components/MobileNavBar/MobileNavBar";
import {useState} from "react"; 
import axios from "axios";
import "./Contact.css";
import "../../Components/Dashboard/Dashboard.css";
import "../../Components/MobileNavBar/MobileNavBar.css"
import "../../Components/Footer/Footer.css";

function Contact(){
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submissionState, setSubmissionState] = useState("idle");


    function handleName(event){
        setName(event.target.value);
    }
    function handleEmail(event){
        setEmail(event.target.value);
    }
    function handleSubject(event){
        setSubject(event.target.value);
    }
    function handleMessage(event){
        setMessage(event.target.value);
    }

    async function submitEnquiry(event){
        event.preventDefault();
        setSubmissionState("sending");
        const url = import.meta.env.VITE_API_URL; 

        const body = {
            name : name,
            email : email,
            subject : subject,
            message : message
        }
        try {
            await axios.post(`${url}/sendEnquiry`, body);
            setSubmissionState("sent");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
        } catch {
            setSubmissionState("error");
        }
    }
    return <div className="contact-page">
        <Dashboard 
            searchbox = {true}
            category = {"contactus"}
        />
        
        <main className="page-content">
        <div className="page-intro">
            <h1 className="page-title">Talk to our team</h1>
            <p>Ask about a product, service, or anything else. We’ll be glad to help.</p>
        </div>

        <div className="contact-container">
            
            <div className = "opening-hrs-container">
                <h4>Opening Hours</h4>
                <p className = "contact-field">Sunday to Friday</p>
                <p className = "contact-field">9:00 a.m. to 8:00 p.m.</p>
                <a className="contact-field" href="tel:+919894257279">+91 9894257279</a>
            </div>

            <div className = "address-container">
                <h4>Address</h4>
                <address className="contact-field">Sankar Electronics<br/>Thambidurai Street<br/>Attayampatti<br/>Salem District<br/>637503</address>
            </div>

            <div className = "email-container">
                <h4>E-Mail</h4>
                <a className = "contact-field" href="mailto:sankarelectronics@gmail.com">sankarelectronics@gmail.com</a>
            </div>

            <form onSubmit={submitEnquiry} className="message-container">
                <div className="message-form-heading">
                    <h2>Send an enquiry</h2>
                    <p className="message-description">Fields marked with * are required.</p>
                </div>
                <div className="enquiry-field">
                    <label htmlFor="enquiry-name">Name *</label>
                    <input id="enquiry-name" onChange={handleName} className="message-field" type="text" autoComplete="name" required placeholder="Your name" value={name}/>
                </div>
                <div className="enquiry-field">
                    <label htmlFor="enquiry-email">Email *</label>
                    <input id="enquiry-email" onChange={handleEmail} className="message-field" type="email" autoComplete="email" required placeholder="you@example.com" value={email}/>
                </div>
                <div className="enquiry-field">
                    <label htmlFor="enquiry-subject">Subject</label>
                    <input id="enquiry-subject" onChange={handleSubject} className="message-field" type="text" placeholder="What can we help with?" value={subject}/>
                </div>
                <div className="enquiry-field">
                    <label htmlFor="enquiry-message">Message</label>
                    <textarea id="enquiry-message" onChange={handleMessage} className="message-field message-textarea" rows="5" placeholder="Write your message" value={message}/>
                </div>
                {submissionState === "sent" && <p className="form-feedback form-success" role="status">Your enquiry was sent. Thank you for getting in touch.</p>}
                {submissionState === "error" && <p className="form-feedback form-error" role="alert">Your enquiry couldn’t be sent. Please try again.</p>}
                <button className="submit-message" type="submit" disabled={submissionState === "sending"}>
                    {submissionState === "sending" ? "Sending…" : "Send enquiry"}
                </button>
            </form>
        </div>
        </main>

        <MobileNavBar />
        <Footer />
    </div> 
}

export default Contact; 