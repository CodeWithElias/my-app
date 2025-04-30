export async function buscarCatalogo(){
    const url = import.meta.env.VITE_API_URL;

    //console.log("API URL:", url); // Agregar log para verificar la URL
    let response = await fetch(url+'/api/products/catalogo/', {
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
    const url = import.meta.env.VITE_API_URL;
    let response = await fetch(url+'/api/products/categoria/'+categ_id,{
        "method": 'GET',
        "headers": {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    console.log("Response from API:" , data);
    return data;
}
