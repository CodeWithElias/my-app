import { IonButtons, IonContent, IonHeader, IonInput, IonInputPasswordToggle, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonLabel } from '@ionic/react';
import './login.css';
import { useEffect, useState } from 'react';
import { loginCustomer } from './loginApi';
import { useHistory, useParams } from 'react-router';
import Cliente from './Cliente';
import { useAuth } from './authContext';
import { IonLoading } from '@ionic/react';


const Login: React.FC = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();
    const [cliente, setCliente] = useState<Cliente>({});

    const [cargando, setCargando] = useState(true);

    const {setInicioSesion, setUsuarioLogin} = useAuth();

    useEffect(() => {
        
        // muestra al sensacion de estar cargando
        const fetchData = async () => {
            // Simulamos una consulta a la API
            await new Promise((res) => setTimeout(res, 1500));
            setCargando(false);
        };          
        fetchData();
        search();
    }, []);


    
    const search = async () => {
        // Aquí podrías implementar lógica si es necesario buscar algo.
    };


    
    const login = async () => {
        setCargando(true);
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
        setCargando(false);
    };

    
    return (
        <>
        <IonLoading isOpen={cargando} message="Cargando..." spinner="crescent" />
            
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
                    <section className='section-register'>
                        <div className='login'>
                            <IonTitle className='title-registro'>Iniciar Sesión</IonTitle>

                            <IonLabel className='title-label'>Correo Electronico</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, email: String(e.detail.value) })}
                                type="email"
                            />
                            <IonLabel className='title-label'>Contraseña</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, password: String(e.detail.value) })}
                                type="password"
                            >
                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>

                            <div className='botones'>
                                <IonButton onClick={() => login()}>Iniciar</IonButton>
                                <IonButton onClick={() => history.push("/registrarse")}>Crear Cuenta</IonButton>
                            </div>
                        </div>
                    </section>
                </IonContent>
            </IonPage>
        </>
    );
};

export default Login;