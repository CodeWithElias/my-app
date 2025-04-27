import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './login.css';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useAuth } from './authContext';

const Perfil: React.FC = () => {
    const history = useHistory();
    const { name } = useParams<{ name: string }>();

    const {usuarioLogin} = useAuth();

    useEffect(() => {
        search();
    }, [history.location.pathname]);


    
    const search = async () => {
        // Aquí podrías implementar lógica si es necesario buscar algo.
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
                {usuarioLogin && (
                    <>
                        <h1>{usuarioLogin.nombre_completo}</h1>
                        <h1>{usuarioLogin.id}</h1>
                    </>
                )}


            </IonContent>
        </IonPage>
    );
};

export default Perfil;