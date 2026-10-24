async function getProducts(){
    const url = import.meta.env.VITE_API_URL;

    const response = await fetch(`${url}/`);
    if (!response.ok) throw new Error("Unable to load products.");
    return response.json();
}
  
function handleResize(setMobile){
  setMobile(window.innerWidth <= 768);
}

async function searchProducts(searchTerm, category){
  const url = import.meta.env.VITE_API_URL;                
  const api = `${url}/searchProducts?q=${encodeURIComponent(searchTerm)}&currentCategory=${encodeURIComponent(category.toLowerCase())}`;
  const response = await fetch(api);
  if (!response.ok) throw new Error("Unable to search products.");
  const body = await response.json();  

  return body;
}
export {searchProducts}
export {handleResize} 
export default getProducts;