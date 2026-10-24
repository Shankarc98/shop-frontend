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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if (!input.trim()) return undefined;
        let active = true;
        const timer = setTimeout(async () => {
            try {
                const response = await searchProducts(input, props.category);
                if (active) setSuggestions(Array.isArray(response.products) ? response.products : []);
            } catch {
                if (active) {
                    setSuggestions([]);
                    setError(true);
                }
            } finally {
                if (active) setLoading(false);
            }
        }, 500);

        return () => {
            active = false;
            clearTimeout(timer);
        };
    }, [input, props.category])

    async function handleSearch(event){
        const value = event.target.value; 
        setInput(value);
        setSuggestions([]);
        setError(false);
        setLoading(Boolean(value.trim()));
    }

    function handlePointerClick(page) {
        navigate("/productCategory",{
            state : page
        });
        setOpen(false);
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
        <div className="icon-searchbar">
            <SearchIcon />
            <input
                onFocus={() => setOpen(true)}
                className="searchbar"
                value={input}
                onChange={handleSearch}
                type="search"
                aria-label="Search products and services"
                aria-expanded={open && Boolean(input.trim())}
                aria-controls="product-search-suggestions"
                placeholder="Search products and services"
            />
        </div>
        {open && input.trim() && <ul id="product-search-suggestions" className="suggestions" role="listbox">
            {loading && <li className="suggestion-message">Searching products…</li>}
            {!loading && error && <li className="suggestion-message" role="status">Search is temporarily unavailable.</li>}
            {!loading && !error && suggestions.length === 0 && <li className="suggestion-message">No matching products found.</li>}
            {!loading && suggestions.map((suggestion) => (
                <li key={suggestion.id} role="option" aria-selected="false">
                    <button
                        type="button"
                        className="suggestion-point"
                        onClick={() => handlePointerClick(suggestion.category)}
                    >
                        <span>{suggestion.name}</span>
                        <span className="suggestion-category">{suggestion.category}</span>
                    </button>
                </li>
            ))}
        </ul>}
    </div>
    
}

export default SearchBar