import axios from "axios"; 
import "./EnquiryCard.css";

function EnquiryCard(props){

    async function handleDelete(){
        const url = import.meta.env.VITE_API_URL; 

        const token = JSON.parse(localStorage.getItem('token'));

        try{
            const headers = {
                Authorization : `Bearer ${token}` 
            }

            console.log(headers);
            await axios.delete(`${url}/deleteEnquiry/${props.id}`, {headers});
            
            await props.getEnquiries();
            

        }catch(err){
            console.log(err.stack);
        }
    }

    return <div className = "enquiry-card-container">
        <div className = "enquiry-name-email">
            <p className = "enquiry-name enquiry-field">Name : {props.name}</p>
            <p className = "enquiry-email enquiry-field">Email: {props.email}</p>
        </div>

        <p className = "enquiry-subject enquiry-field">Subject: {props.subject}</p>
        <p className = "enquiry-message enquiry-field">Message: {props.message}</p>

        <button onClick = {handleDelete} className = "delete-query-button">Delete Query</button>
    </div>
}

export default EnquiryCard;