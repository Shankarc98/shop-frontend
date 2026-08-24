import SearchIcon from '@mui/icons-material/Search';
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {searchProducts} from "../../utils/helpers.js";

function SearchBar(props){
    const navigate = useNavigate();
    const [input, setInput] = useState("");    
    const boxRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    
    
    useEffect(() => {

        if(!input.trim()){
            setSuggestions([]);
            return 
        }
        const timer = setTimeout(async () => {
            const response = await searchProducts(input, props.category);                 
            
            const array = response.products;
            console.log("response in searchbar: ", response);
            setSuggestions(array);    

        }, 500);

        return () => clearTimeout(timer);

    }, [input, props.category])

    async function handleSearch(event){
        
        const value = event.target.value; 

        setInput(value);            
    }

    function handlePointerClick(page){
        navigate("/productCategory",{
            state : page
        })
        
    }

    useEffect(() => {
        
        function handleClick(event){
            if(boxRef.current && !boxRef.current.contains(event.target))
                setOpen(false);
        }

        document.addEventListener("mousedown", handleClick);

        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    }, []); 


    return <div ref = {boxRef} className="searchbar-container">
        <div className = "icon-searchbar">
            <SearchIcon />
            <input onFocus = {() => setOpen(true)} className="searchbar" value = {input} onChange = {handleSearch} type="text" size="30" placeholder="Search products and services"/>
        </div>
        {open ? <div className = "suggestions" style = {{display : suggestions ? "flex" : "block"}}>
            {
                                
                input.trim() !== "" && suggestions?.length > 0 ? suggestions.map(
                    s =>  <li 
                            key = {s.id} 
                            onClick={() => handlePointerClick(s.category)}
                            className = "suggestion-point">{s.name}</li>
                ) : suggestions ? null : <p>No results found</p> 
            }
        </div> : null}
        
    </div>
    
}

export default SearchBar