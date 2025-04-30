import { IonContent, IonInput, IonInputPasswordToggle, IonTitle, IonButton, IonLabel, IonPage, IonHeader, IonToolbar, IonLoading, IonModal } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cliente from './Cliente';
import './registrar.css'
import { editarDato } from './editarUsuarioApi';
import { useAuth } from './authContext';


const Registrar: React.FC = () => {
    const history = useHistory();
    const [cliente, setCliente] = useState<Cliente>({});
    const [cargando, setCargando] = useState(true);
    const {usuarioLogin} = useAuth();

    useAuth();

    useEffect(() => {
        // muestra al sensacion de estar cargando
        const fetchData = async () => {
            // Simulamos una consulta a la API
            await new Promise((res) => setTimeout(res, 1500));
            setCargando(false);
        };          
        fetchData();
        search();
    }, [history.location.pathname]); // Se ejecuta solo una vez cuando cambia la ruta
    


    const search = async () => {
        // Aquí podrías implementar lógica si es necesario buscar algo.
    };

    const registrar = async () => {
        try {
            let result = await editarDato(cliente, Number(usuarioLogin?.id));

            if (result.mensaje === "Usuario actualizado con éxito") {
                history.push('/perfil');
            } else {
                alert('Registro fallido: ' + result.message);
            }
        } catch (error) {
            
            if (error instanceof Error) {
                console.error("Error en la petición:", error.message);
              } else {
                console.error("Error en la petición:", error);
              }
              
        }
    };

    return (
            <>
            <IonLoading isOpen={cargando} message="Cargando..." spinner="crescent" />
            <IonPage>
            <IonHeader>
                <IonToolbar>
                <IonTitle>Registro</IonTitle>
                </IonToolbar>
            </IonHeader>
                  
                <IonContent fullscreen>
                    <section className='section-register'>
                        <div className='login'>
                            <IonTitle className='title-registro'>Nuevos datos</IonTitle>
                            
                            <IonLabel className='title-label'>Nombre</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, nombre: String(e.detail.value) })}
                                type="text"
                            />

                            <IonLabel className='title-label'>Correo Electronico</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, email: String(e.detail.value) })}
                                type="email"
                            />

                            <IonLabel className='title-label'>Telefono</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, telefono: String(e.detail.value) })}
                                type="text"
                            />

                            <IonLabel className='title-label'>Direccion</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, direccion: String(e.detail.value) })}
                                type="text"
                            />

                            <IonLabel className='title-label'>Contraseña</IonLabel>
                            <IonInput
                                className='input'
                                onIonChange={e => setCliente({ ...cliente, password: String(e.detail.value) })}
                                type="password"
                            >
                                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
                            </IonInput>

                            <IonButton onClick={() => registrar()}>Guardar</IonButton>
                        </div>
                    </section>
                </IonContent>
            </IonPage>
            </>
            
    );
};

export default Registrar;
