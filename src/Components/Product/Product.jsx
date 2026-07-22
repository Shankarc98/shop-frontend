import "./Product.css";

function Product(props){
    return <div className="product-card">
        <img className="product-image" src={props.image} alt={props.caption}/>
        <p className="product-name">{props.name}</p>
        <p className="product-price">₹ {props.price}</p>
        <ul className="product-description">
            <li>{props.des1}</li> 
            <li>{props.des2}</li>
            <li>{props.des3}</li>
        </ul>
    </div>
}

export default Product; 