import "./CategoryButton.css"
import {useNavigate} from "react-router-dom";

export default function CategoryButton(props){
    const page = props.buttonName; 
    const navigate = useNavigate();

    function handleClick(){
        navigate("/productCategory", {
            state : page
        });
    }
    return <button className = "category-button" onClick = {handleClick}>
        {props.buttonName}
    </button>
}