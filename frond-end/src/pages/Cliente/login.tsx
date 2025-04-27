import { IonButtons, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import './login.css';
import { useEffect, useState } from 'react';
import { loginCustomer } from './loginApi';
import { useHistory, useParams } from 'react-router';
import Cliente from './Cliente';
import { useAuth } from './authContext';

const Login: React.FC = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();
    const [cliente, setCliente] = useState<Cliente>({});

    const {inicioSesion, setInicioSesion, usuarioLogin, setUsuarioLogin} = useAuth();

    useEffect(() => {
        search();
    }, [history.location.pathname]);


    
    const search = async () => {
        // Aquí podrías implementar lógica si es necesario buscar algo.
    };


    
    const login = async () => {
        try {
            let result = await loginCustomer(cliente);
    
            console.log("Respuesta del backend:", result);
    
            if (result && result.mensaje === "Inicio de sesión exitoso") {
                setInicioSesion(true);
    
                let res = {
                    id: result.id || "Sin ID",
                    nombre: result.nombre || "Sin Nombre"
                };
    
                console.log("Valores asignados al usuarioLogin:", res);
                setUsuarioLogin(res);
    
                history.push('/inicio/');
            } else {
                alert('Login fallido: ' + (result.message || "Error desconocido en el login."));
            }
        } catch (error) {
            console.error("Detalles del error:", error);

            if (error instanceof Error) {
                console.error("Error en la petición:", error.message);
                } else {
                console.error("Error en la petición:", error);
              }
              
        }
    };

    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    <IonTitle>{name}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <section>
                    <div className='login'>
                        <IonTitle className='title'>Iniciar Sesión</IonTitle>

                        <IonInput
                            className='input'
                            onIonChange={e => setCliente({ ...cliente, email: String(e.detail.value) })}
                            type="email"
                            label="Correo Electrónico"
                            placeholder="usuario@gmail.com"
                        />

                        <IonInput
                            className='input'
                            onIonChange={e => setCliente({ ...cliente, password: String(e.detail.value) })}
                            type="password"
                            label="Contraseña"
                        >
                            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                        </IonInput>

                        <a href="#">Olvidé mi contraseña</a>

                        <IonButton onClick={() => login()}>Iniciar</IonButton>
                        <IonButton onClick={() => history.push("/registrarse")}>Crear Cuenta</IonButton>
                    </div>
                </section>
            </IonContent>
        </IonPage>
    );
};

export default Login;