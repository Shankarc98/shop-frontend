import "./Product.css";
import {useState} from "react";

function Product(props){
    const [imageUnavailable, setImageUnavailable] = useState(!props.image);

    return <div className="product-card">
        <div className="product-image-wrap">
            {imageUnavailable
                ? <div className="product-image-placeholder" role="img" aria-label={`Image unavailable for ${props.name || "product"}`}>Image unavailable</div>
                : <img className="product-image" src={props.image} alt={props.name || "Shop product"} loading="lazy" onError={() => setImageUnavailable(true)}/>}
        </div>
        <div className="product-details">
            <p className="product-name">{props.name}</p>
            <p className="product-price">₹ {props.price}</p>
            {[props.des1, props.des2, props.des3].filter(Boolean).length > 0 && (
                <ul className="product-description">
                    {[props.des1, props.des2, props.des3].filter(Boolean).map((description, index) => (
                        <li key={`${description}-${index}`}>{description}</li>
                    ))}
                </ul>
            )}
        </div>
    </div>
}

export default Product; 