async function getProducts(){
    try{
      const url = import.meta.env.VITE_API_URL; 

      const response = await fetch(`${url}/`)
      let arr = await response.json();
      
      return arr;
    }
    catch(err){
      console.log(err.stack);
    }
  }  
  
function handleResize(setMobile){
  setMobile(window.innerWidth <= 768);
}

async function searchProducts(searchTerm, category){
  const url = import.meta.env.VITE_API_URL;                
  const api = `${url}/searchProducts?q=${encodeURIComponent(searchTerm)}&currentCategory=${encodeURIComponent(category.toLowerCase())}`;
  const response = await fetch(api);
  const body = await response.json();  

  return body;
}
export {searchProducts}
export {handleResize} 
export default getProducts;