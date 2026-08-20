import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";

function SearchBar(props){
        
    const [input, setInput] = useState("");    

    function handleSearch(event){
        
        const value = event.target.value; 

        setInput(value);    
        props.setSearchTerm(value);
        
    }

    

    return <div className="searchbar-container">
        <SearchIcon />
        <input className="searchbar" value = {input} onChange = {handleSearch} type="text" size="30" placeholder="Search products and services"/>
    </div>
    
}

export default SearchBar