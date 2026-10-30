import {useRef, useState} from "react";
import axios from "axios";
import "./ManageCard.css";

const maxProductImageDimension = 1600;
const imageOptimizationThreshold = 256 * 1024;
const optimizableImageTypes = new Set(["image/jpeg", "image/png"]);

async function optimizeProductImage(file) {
    if (!optimizableImageTypes.has(file.type) || file.size < imageOptimizationThreshold) return file;

    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxProductImageDimension / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) {
        bitmap.close();
        throw new Error("Image optimization is unavailable.");
    }

    try {
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        const optimizedBlob = await new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (blob) resolve(blob);
                else reject(new Error("Could not encode the optimized product image."));
            }, "image/webp", 0.9);
        });
        if (optimizedBlob.size >= file.size) return file;

        const filename = file.name.replace(/\.[^.]+$/, "") || "product-image";
        return new File([optimizedBlob], `${filename}.webp`, {
            type: "image/webp",
            lastModified: file.lastModified,
        });
    } finally {
        bitmap.close();
        canvas.width = 0;
        canvas.height = 0;
    }
}

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
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(false);
    const [preparingImage, setPreparingImage] = useState(false);
    const [imageOptimizationWarning, setImageOptimizationWarning] = useState(false);
    const submittingRef = useRef(false);
    const imageSelectionRef = useRef(0);
    const preparingImageRef = useRef(false);

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

    async function handleImageChange(event) {
        const selectedImage = event.target.files?.[0] || null;
        const selectionId = ++imageSelectionRef.current;
        setImage(selectedImage);
        setImageOptimizationWarning(false);
        setPreparingImage(false);
        preparingImageRef.current = false;
        if (!selectedImage || !optimizableImageTypes.has(selectedImage.type) || selectedImage.size < imageOptimizationThreshold) return;

        setPreparingImage(true);
        preparingImageRef.current = true;
        try {
            const optimizedImage = await optimizeProductImage(selectedImage);
            if (selectionId === imageSelectionRef.current) setImage(optimizedImage);
        } catch (optimizationError) {
            console.error("Could not optimize product image; the original image will be uploaded.", optimizationError);
            if (selectionId === imageSelectionRef.current) {
                setImage(selectedImage);
                setImageOptimizationWarning(true);
            }
        } finally {
            if (selectionId === imageSelectionRef.current) {
                setPreparingImage(false);
                preparingImageRef.current = false;
            }
        }
    }

    async function handleSubmit(event){
        event.preventDefault();
        if (submittingRef.current || preparingImageRef.current) return;
        submittingRef.current = true;
        setSubmitting(true);
        setError(false);
        try {
            const isAdding = props.operation === "Add Product";
            const savedProduct = isAdding ? await handleAdd() : await handleEdit();
            props.data((currentProducts) => isAdding
                ? [...currentProducts, savedProduct]
                : currentProducts.map((product) => product.id === savedProduct.id ? savedProduct : product));
            props.close();
        } catch {
            setError(true);
        } finally {
            submittingRef.current = false;
            setSubmitting(false);
        }
    }

    async function handleAdd(){        
        const formData = new FormData();
        formData.append("name", name);
        if (image) formData.append("image", image);
        formData.append("price", price);
        formData.append("des1", des1);
        formData.append("des2", des2);
        formData.append("des3", des3);
        formData.append("category", category);

            const response = await axios.post(`${url}/addProduct`, formData, {
                headers : {
                    Authorization : `Bearer ${token}` 
                }
            });

            return response.data;
    }

    async function handleEdit(){
        const formData = new FormData();
        formData.append("name", name);
        formData.append("id", id);
        if(image){
            formData.append("image", image);
        }
        else{
            if (image_id) formData.append("image_id", image_id);
            if (image_url) formData.append("image_url", image_url);
        }
        formData.append("price", price);
        formData.append("des1", des1);
        formData.append("des2", des2);
        formData.append("des3", des3);
        
            const response = await axios.put(`${url}/editProduct`, formData, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });

            return response.data;


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
        <input id="file" onChange={handleImageChange} type="file" accept="image/*"/>
        {preparingImage && <p className="image-preparation-message" role="status">Optimizing image for faster upload…</p>}
        {imageOptimizationWarning && <p className="image-preparation-message" role="status">Image optimization wasn’t available; the original image will be uploaded.</p>}
        {error && <p className="form-feedback form-error" role="alert">The product couldn’t be saved. Please try again.</p>}
        <button className="submit-button" type="submit" disabled={submitting || preparingImage}>
            {preparingImage ? "Preparing image…" : submitting ? "Saving…" : props.operation === "Add Product" ? "Add product" : "Save changes"}
        </button>
    </form> 
    </section>
    </div>
}

export default ManageCard;