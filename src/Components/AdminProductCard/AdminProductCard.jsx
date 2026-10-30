import axios from "axios";
import {useEffect, useRef, useState} from "react";
import getProducts from "../../utils/helpers"
import "./AdminProductCard.css"

function AdminProductCard(props){
    const token = JSON.parse(localStorage.getItem('token'));
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState(false);
    const [imageUnavailable, setImageUnavailable] = useState(!props.image);
    const [previewOpen, setPreviewOpen] = useState(false);
    const previewCloseRef = useRef(null);

    useEffect(() => {
        if (!previewOpen) return undefined;

        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        previewCloseRef.current?.focus();

        function closeOnEscape(event) {
            if (event.key === "Escape") setPreviewOpen(false);
        }

        document.addEventListener("keydown", closeOnEscape);
        return () => {
            document.removeEventListener("keydown", closeOnEscape);
            document.body.style.overflow = previousOverflow;
            if (previousFocus instanceof HTMLElement) previousFocus.focus();
        };
    }, [previewOpen]);
    
    function handleEdit(){
        props.setEdit(props.product);
        props.setCard(true);
        props.setOperation("Edit Product");
    }

    async function deleteProduct(){
        const url = import.meta.env.VITE_API_URL; 
        setDeleting(true);
        setError(false);
        try{
            await axios.delete(`${url}/deleteProduct?id=${props.id}&image_id=${props.image_id}`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            
            const response = await getProducts();

            await props.setProducts(response);
        }catch{
            setError(true);
        } finally {
            setDeleting(false);
        }
        
    }
    

    return <div className = "admin-product-card">
        {imageUnavailable
            ? <div className="admin-product-image admin-product-image-placeholder" role="img" aria-label={`Image unavailable for ${props.name || "product"}`}>No image</div>
            : <button
                type="button"
                className="admin-product-image-trigger"
                aria-label={`Preview image of ${props.name || "product"}`}
                onClick={() => setPreviewOpen(true)}
            >
                <img className="admin-product-image" src={props.image} alt={props.name || "Shop product"} loading="lazy" onError={() => setImageUnavailable(true)}/>
            </button>}
        <div className = "admin-product-info">
            <div className = "admin-product-name-price">
                <p className="admin-product-name">{props.name}</p>
                <p className = "admin-product-price">₹ {props.price}</p>
            </div>

            {props.category && <span className="admin-product-category">{props.category}</span>}
            {[props.des1, props.des2, props.des3].filter(Boolean).length > 0 && (
                <ul className="admin-product-description">
                    {[props.des1, props.des2, props.des3].filter(Boolean).map((description, index) => (
                        <li key={`${description}-${index}`}>{description}</li>
                    ))}
                </ul>
            )}
        </div>

        <div className = "manage-button-container">
            <button type="button" onClick={handleEdit} className="manage-button">Edit</button>
            <button type="button" onClick={deleteProduct} className="manage-button manage-button-delete" disabled={deleting}>
                {deleting ? "Deleting…" : "Delete"}
            </button>
        </div>
        {error && <p className="form-feedback form-error admin-card-error" role="alert">Couldn’t delete this product. Please try again.</p>}
        {previewOpen && (
            <div
                className="admin-image-preview-backdrop"
                onClick={(event) => {
                    if (event.target === event.currentTarget) setPreviewOpen(false);
                }}
            >
                <section className="admin-image-preview-dialog" role="dialog" aria-modal="true" aria-label={`Product image: ${props.name || "Shop product"}`}>
                    <div className="admin-image-preview-heading">
                        <h2>{props.name || "Product image"}</h2>
                        <button
                            ref={previewCloseRef}
                            type="button"
                            className="admin-image-preview-close"
                            onClick={() => setPreviewOpen(false)}
                            aria-label="Close image preview"
                        >
                            ×
                        </button>
                    </div>
                    <img className="admin-image-preview-full" src={props.image} alt={props.name || "Shop product"} />
                </section>
            </div>
        )}
    </div>
}

export default AdminProductCard;