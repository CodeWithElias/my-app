import carrito from "./carrito";

export async function agregarAlCarrito(caro: carrito){
    //let url = process.env.REACT_APP_API + 'customers'; 
    //console.log("API URL:", url); // Agregar log para verificar la URL
    //const url = process.env.REACT_APP_API + 'add-to-cart';
    const body = {
      usuario_id: caro.usuario_id,
      producto_id: caro.producto_id,
      cantidad: caro.cantidad,
    };
    
    if (!body.usuario_id || !body.producto_id || !body.cantidad) {
      throw new Error("El cuerpo de la solicitud no tiene todos los campos necesarios.");
    }
    
    try {
      let respuesta = await fetch("http://127.0.0.1:8000/api/cart/agregar-producto/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    
      if (!respuesta.ok) {
        throw new Error(`Error en la API: ${respuesta.status} - ${respuesta.statusText}`);
      }
    
      const data = await respuesta.json();
      console.log("Datos recibidos de la API:", data);
      return data;
    } catch (error) {

      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
      throw error;
    }
}


export async function obtenerCarrito(usuario_id: number) {
    const url = `http://127.0.0.1:8000/api/cart/${usuario_id}`;
    console.log("URL:", url);
  
    try {
      const respuesta = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Respuesta cruda:", respuesta);
      if (!respuesta.ok) {
        console.error("Error HTTP:", respuesta.status);
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
  
      const data = await respuesta.json();
      console.log("Datos JSON recibidos:", data);
      return data;
    } catch (error) {

      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
      throw error;
    }
  }

  export async function eliminarProductoDelCarrito(prod_id: number, usu_id: number){
    const url = 'http://127.0.0.1:8000/api/cart/eliminar-del-carrito/';

    const body = {
      usuario_id: usu_id,
      producto_id: prod_id,
    };

    try {
      const respuesta = await fetch (url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
  
      console.log("Respuesta cruda:", respuesta);
      if (!respuesta.ok) {
        console.error("Error HTTP:", respuesta.status);
        throw new Error(`Error HTTP: ${respuesta.status}`);
      }
  
      const data = await respuesta.json();
      console.log("Datos JSON recibidos:", data);
      return data;
    } catch (error) {

      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
      throw error;
    }
  }