export async function buscarCatalogo(){
    //let url = process.env.REACT_APP_API + 'customers'; 
    //console.log("API URL:", url); // Agregar log para verificar la URL
    let response = await fetch('http://127.0.0.1:8000/api/products/catalogo/', {
        "method": 'GET',
        "headers": {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    console.log("Response from API:", data); // Agregar log para verificar la respuesta
    return data;
};


export async function mostrarProductoPorCategoria(categ_id: number){
    let response = await fetch('http://127.0.0.1:8000/api/products/categoria/'+categ_id,{
        "method": 'GET',
        "headers": {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    console.log("Response from API:" , data);
    return data;
}