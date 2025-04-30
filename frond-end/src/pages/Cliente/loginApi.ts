import Cliente from "./Cliente";

export async function loginCustomer(cliente: Cliente) {
    const url = import.meta.env.VITE_API_URL;

    const body = {
        email: cliente.email,
        password: cliente.password
    };
    
    try {
        let respuesta = await fetch(url+'/api/auth/login/', {
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