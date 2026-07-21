import "./Discover.css";

function Discover(props){


    return <button 
            onClick = {props.handleClick}
            className="discover-container" 
            style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${props.image})`, backgroundSize: 'cover'}}            
            >
        {props.title}
    </button>
}

export default Discover;