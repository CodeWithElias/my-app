import { IonContent, IonInput, IonInputPasswordToggle, IonTitle, IonButton, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Cliente from './Cliente';
import './registrar.css'
import { registrarCliente } from './registrarApi';

const Registrar: React.FC = () => {
    const history = useHistory();
    const [cliente, setCliente] = useState<Cliente>({});

    useEffect(() => {
        search();
    }, [history]);

    const search = async () => {
        // Aquí podrías implementar lógica si es necesario buscar algo.
    };

    const registrar = async () => {
        try {
            let result = await registrarCliente(cliente);

            if (result.mensaje === "Usuario registrado con éxito") {
                history.push('/login');
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
        
            <IonContent fullscreen>
                <section>
                    <div className='login'>
                        <IonTitle className='title-registro'>Registrarse</IonTitle>
                        
                        <IonLabel className='title-label'>Nombre</IonLabel>
                        <IonInput
                            className='input'
                            onIonChange={e => setCliente({ ...cliente, nombre_completo: String(e.detail.value) })}
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

                        <IonButton onClick={() => registrar()}>Registrarse</IonButton>
                    </div>
                </section>
            </IonContent>

    );
};

export default Registrar;
