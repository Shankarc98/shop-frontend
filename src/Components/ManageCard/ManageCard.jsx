import {useState, useEffect} from "react";
import axios from "axios";
import getProducts from "../../utils/helpers";
import "./ManageCard.css";

function ManageCard(props){
    const edit = props.edit;
    const id = edit.id;
    const [name, setName] = useState(edit.name);
    const [price, setPrice] = useState(edit.price);
    const [des1, setDes1] = useState(edit.des1);
    const [des2, setDes2] = useState(edit.des2);
    const [des3, setDes3] = useState(edit.des3);
    const [image, setImage] = useState(null);
    const formData = new FormData();

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
    const url = import.meta.env.VITE_API_URL; 

    async function handleSubmit(event){

        event.preventDefault();
        if(props.operation == "Add Product") handleAdd();
        else handleEdit();
        const arr = await getProducts();

        props.data(arr);
        props.close();
    }

    async function handleAdd(){

        
        formData.append("name", name);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("des1", des1);
        formData.append("des2", des2);
        formData.append("des3", des3);
        const headers = {
            Authorization: `Bearer ${token}`
        }
        console.log(headers);
        try{
            await axios.post(`${url}/addProduct`, formData, {
                headers : {
                    Authorization : `Bearer ${token}` 
                }
            });

            
            
        }catch(err){
            console.log(err.stack);
        }
    }

    async function handleEdit(){
        
        const body = {
            id : id,
            name : name,
            image : edit.image,
            price: price,
            des1: des1,
            des2: des2,
            des3: des3
        }
        
        try{
            await axios.put(`${url}/editProduct`, body, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });

            const arr = await getProducts();

            props.data(arr);
            
        }catch(err){
            console.log(err.stack);
        }

    }
    return <div className = "manage-card" >
     
     <div className = "manage-card-title">
        <h4>{props.operation}</h4>
        <button onClick = {props.close} className = "cancel-button">x</button>
     </div>     
          
     <form onSubmit = {handleSubmit} className = "manage-form" >
        
        <input onChange = {handleName} className = "manage-input" type = "text" value = {name} placeholder="Enter Product Name" required/>
        
        <input onChange = {handlePrice} className = "manage-input" type = "number" value = {price} placeholder="Enter Product Price" required/>

        <input onChange = {handleDes1} className = "manage-input" type = "text" value = {des1} placeholder="Enter Description 1"/>

        <input onChange = {handleDes2} className = "manage-input" type = "text" value = {des2} placeholder="Enter Description 2"/>

        <input onChange = {handleDes3} className = "manage-input" type = "text" value = {des3} placeholder="Enter Description 3"/>

        <input onChange = {(e) => {setImage(e.target.files[0])}} type = "file" accept="images/*"/>

        <input  className = "submit-button" type = "submit" />
    </form> 

    </div>    
}

export default ManageCard;