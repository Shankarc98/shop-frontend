import {useState} from "react";
import axios from "axios";
import getProducts from "../../utils/helpers";
import "./ManageCard.css";

function ManageCard(props){
    const edit = props.edit;
    const id = edit.id;
    const image_id = edit.image_id;
    const image_url = edit.image_url;
    const [name, setName] = useState(edit.name);
    const [price, setPrice] = useState(edit.price);
    const [des1, setDes1] = useState(edit.des1);
    const [des2, setDes2] = useState(edit.des2);
    const [des3, setDes3] = useState(edit.des3);
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(edit.category);
    const formData = new FormData();
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);

    const token = JSON.parse(localStorage.getItem('token'));

    function handleName(event){
        setName(event.target.value);
    }
    
    function handlePrice(event){
        setPrice(event.target.value);
    }
    function handleDes1(event){
        setDes1(event.target.value);
    }
    function handleDes2(event){
        setDes2(event.target.value);
    }
    function handleDes3(event){
        setDes3(event.target.value);
    }
    function handleCategory(event){
        setCategory(event.target.value);
    }

    const url = import.meta.env.VITE_API_URL; 

    async function handleSubmit(event){
        event.preventDefault();
        setSubmitting(true);
        setError(false);
        try {
            if (props.operation === "Add Product") await handleAdd();
            else await handleEdit();
            props.close();
        } catch {
            setError(true);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleAdd(){        
        
        formData.append("name", name);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("des1", des1);
        formData.append("des2", des2);
        formData.append("des3", des3);
        formData.append("category", category);

            await axios.post(`${url}/addProduct`, formData, {
                headers : {
                    Authorization : `Bearer ${token}` 
                }
            });

            const arr = await getProducts();
            props.data(arr);
            

    }

    async function handleEdit(){
        
        formData.append("name", name);
        formData.append("id", id);
        if(image){
            formData.append("image", image);
        }
        else{
            formData.append("image_id", image_id);
            formData.append("image_url", image_url);
        }
        formData.append("price", price);
        formData.append("des1", des1);
        formData.append("des2", des2);
        formData.append("des3", des3);
        
            await axios.put(`${url}/editProduct`, formData, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });

            const arr = await getProducts();

            props.data(arr);
            


    }
    return <div className="manage-card-backdrop">
    <section className="manage-card" role="dialog" aria-modal="true" aria-labelledby="manage-card-title">
     <div className="manage-card-title">
        <h2 id="manage-card-title" className="operation-title">{props.operation}</h2>
        <button type="button" onClick={props.close} className="cancel-button" aria-label="Close product form">×</button>
     </div>
          
     <form onSubmit={handleSubmit} className="manage-form">
        <label className="input-label" htmlFor="name">Name of the product</label>
        <input id="name" onChange={handleName} className="manage-input" type="text" value={name} placeholder="Enter product name" required/>
        
        <label className="input-label" htmlFor="price">Price of the product</label>
        <input id="price" onChange={handlePrice} className="manage-input" type="number" min="0" value={price} placeholder="Enter product price" required/>

        <label className="input-label" htmlFor="des1">Description 1</label>
        <input id="des1" onChange={handleDes1} className="manage-input" type="text" value={des1} placeholder="Add a product detail"/>

        <label className="input-label" htmlFor="des2">Description 2</label>
        <input id="des2" onChange={handleDes2} className="manage-input" type="text" value={des2} placeholder="Add another detail"/>

        <label className="input-label" htmlFor="des3">Description 3</label>
        <input id="des3" onChange={handleDes3} className="manage-input" type="text" value={des3} placeholder="Add another detail"/>

        <label className="input-label" htmlFor="category">Category {props.operation === "Edit Product" && "(unchanged)"}</label>
        <select id="category" onChange={handleCategory} value={(category || "others").toLowerCase()} disabled={props.operation === "Edit Product"}>
            <option value="dth">DTH</option>
            <option value="speakers">Speakers</option>
            <option value="tools">Tools</option>
            <option value="remotes">Remotes</option>
            <option value="wires & cables">Wires &amp; cables</option>
            <option value="others">Others</option>
        </select>

        <label className="input-label" htmlFor="file">{props.operation === "Edit Product" ? "Replace product image (optional)" : "Product image"}</label>
        <input id="file" onChange={(event) => setImage(event.target.files?.[0] || null)} type="file" accept="image/*"/>
        {error && <p className="form-feedback form-error" role="alert">The product couldn’t be saved. Please try again.</p>}
        <button className="submit-button" type="submit" disabled={submitting}>
            {submitting ? "Saving…" : props.operation === "Add Product" ? "Add product" : "Save changes"}
        </button>
    </form> 
    </section>
    </div>
}

export default ManageCard;