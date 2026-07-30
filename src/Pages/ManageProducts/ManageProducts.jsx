import AdminHeader from "../../Components/AdminHeader/AdminHeader"
import {useState, useEffect} from "react";
import getProducts from "../../utils/helpers";
import AdminProductCard from "../../Components/AdminProductCard/AdminProductCard"
import ManageCard from "../../Components/ManageCard/ManageCard"
import "./ManageProducts.css"
import "../../Components/AdminProductCard/AdminProductCard.css"
import  "../../Components/Footer/Footer.css"
import "../../Components/Dashboard/Dashboard.css"
import "../../Components/AdminHeader/AdminHeader.css"


function ManageProducts(){
    
    const emptyProduct = {
        id: null,
        name: "",
        image: "",
        price: "",
        des1: "",
        des2: "",
        des3: "",
        category: ""
    }
    const [products, setProducts] = useState([]); 
    const [card, setCard] = useState(false); 
    const [operation, setOperation] = useState("Add Product");
    const [edit, setEdit] = useState(emptyProduct);
    
    async function getData(){
        let arr = await getProducts();
        setProducts(arr);
    }

    useEffect(() => {        
        getData();
    }, [])


    return <div className = "manage-products">

        <AdminHeader />

        {card ? <ManageCard 
            isCard = {card}
            close = {() => {setCard(false); setEdit(emptyProduct)}}
            data = {setProducts}
            edit = {edit}
            operation = {operation}
        />: null}

        <h3 className="admin-title">Manage Products</h3>
        <button onClick = {() => {setCard(true); setOperation("Add Product")}} className = "add-button">Add +</button>
        <div className = "admin-products-list">
            {
                products.map(p => {
                    return <AdminProductCard 
                        key = {p.id}
                        id = {p.id}
                        image = {p.image_url}
                        image_id = {p.image_id}
                        name = {p.name}
                        price = {p.price}
                        des1 = {p.des1}
                        des2 = {p.des2}
                        des3 = {p.des3}
                        category = {p.category}
                        setCard = {setCard}
                        setEdit = {setEdit}
                        product = {p}
                        setOperation = {setOperation}
                        setProducts = {setProducts}
                    />
                })
            }
        </div>

    </div>
}

export default ManageProducts; 