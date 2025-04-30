import Cliente from "./Cliente";

export async function editarDato(cliente: Cliente, id: number) {
    const url = import.meta.env.VITE_API_URL;
    
    const body = {
        nombre_completo: cliente.nombre,
        email: cliente.email,
        password: cliente.password,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
    };
    
    try {
        let respuesta = await fetch(url+'/api/auth/editar/'+id+'/', {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body) // Envía las credenciales en el cuerpo
        });

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status}`);
        }

        const data = await respuesta.json();
        console.log("Response from API:", data); // Log para verificar respuesta
        return data;
    } catch (error) {
        console.error("Error during login:", error); // Log de errores
        throw error;
    }
}