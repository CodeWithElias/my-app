import Cliente from "./Cliente";

export async function registrarCliente(cliente: Cliente) {
    const url = 'http://127.0.0.1:8000/api/auth/register/'; // URL de tu endpoint de login
    const body = {
        nombre_completo: cliente.nombre_completo,
        email: cliente.email,
        password: cliente.password,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        fecha_registro: cliente.fecha_registro,
    };
    
    try {
        let respuesta = await fetch(url, {
            method: 'POST',
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