import axios from "axios";
import getProducts from "../../utils/helpers"
import "./AdminProductCard.css"

function AdminProductCard(props){
    const token = JSON.parse(localStorage.getItem('token'));
    
    function handleEdit(){
        props.setEdit(props.product);
        props.setCard(true);
        props.setOperation("Edit Product");
    }

    async function deleteProduct(){
        const url = import.meta.env.VITE_API_URL; 
        
        try{
            await axios.delete(`${url}/deleteProduct?id=${props.id}&image_id=${props.image_id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            
            const response = await getProducts();

            await props.setProducts(response);
        }catch(err){
            console.log(err.stack);
        }
        
    }
    

    return <div className = "admin-product-card">
        <img className = "admin-product-image" src = {props.image} alt = {props.alt}/>
        <div className = "admin-product-info">
            <div className = "admin-product-name-price">
                <p className="admin-product-name">{"Product name: " + props.name}</p>
                <p className = "admin-product-price">{"Price: " + "₹ " + props.price}</p>
            </div>

            <ul className = "admin-product-description">
                <li>{props.des1}</li>
                <li>{props.des2}</li>
                <li>{props.des3}</li>
            </ul>
        </div>

        <div className = "manage-button-container">
            <button onClick = {handleEdit} className = "manage-button">Edit</button>
            <button onClick = {deleteProduct} className = "manage-button">Delete</button>
        </div>
    </div>
}

export default AdminProductCard;