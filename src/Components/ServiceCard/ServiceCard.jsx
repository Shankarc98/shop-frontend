import "./ServiceCard.css";

function ServiceCard(props){
    
    return <div className = "service-card" >
        <img className = "service-image" src = {props.image} alt = "service"/>

        <div className = "service">
            <h4 className = "service-title">{props.service}</h4>
            <p className = "service-description">
                {props.description}
            </p>
        </div>
        
    </div>
}

export default ServiceCard; 