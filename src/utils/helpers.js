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
export {handleResize} 
export default getProducts;