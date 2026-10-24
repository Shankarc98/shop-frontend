import axios from "axios"; 
import {useState} from "react";
import "./EnquiryCard.css";

function EnquiryCard(props){
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(false);

    async function handleDelete(){
        const url = import.meta.env.VITE_API_URL; 
        setDeleting(true);
        setError(false);
        const token = JSON.parse(localStorage.getItem('token'));

        try{
            const headers = {
                Authorization : `Bearer ${token}` 
            }

            await axios.delete(`${url}/deleteEnquiry/${props.id}`, {headers});
            await props.getEnquiries();

        } catch {
            setError(true);
        } finally {
            setDeleting(false);
        }
    }

    return <article className="enquiry-card-container">
        <div className = "enquiry-name-email">
            <h2 className="enquiry-name enquiry-field">{props.name}</h2>
            <a className="enquiry-email enquiry-field" href={`mailto:${props.email}`}>{props.email}</a>
        </div>

        {props.subject && <p className="enquiry-subject enquiry-field">{props.subject}</p>}
        <p className="enquiry-message enquiry-field">{props.message}</p>
        {error && <p className="form-feedback form-error" role="alert">This enquiry couldn’t be deleted. Please try again.</p>}
        <button type="button" onClick={handleDelete} className="delete-query-button" disabled={deleting}>
            {deleting ? "Deleting…" : "Delete enquiry"}
        </button>
    </article>
}

export default EnquiryCard;