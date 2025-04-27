import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar, IonGrid } from '@ionic/react';
import './perfilStyle.css';
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
                <section className='perfil-content'>
                    <IonCard className="perfil-card">
                        <IonCardHeader>
                        <IonCardTitle className="perfil-title">👤 Mi Perfil</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                        <div className="perfil-info">
                            <IonItem lines="none" className="perfil-item">
                            <IonLabel>
                                <h2 className="perfil-label">Nombre:</h2>
                                <p className="perfil-text">{usuarioLogin?.nombre}</p>
                            </IonLabel>
                            </IonItem>

                            <IonItem lines="none" className="perfil-item">
                            <IonLabel>
                                <h2 className="perfil-label">Código de Cliente:</h2>
                                <p className="perfil-text">#{usuarioLogin?.id}</p>
                            </IonLabel>
                            </IonItem>
                        </div>

                        <div className="perfil-buttons">
                            <IonButton expand="block" color="primary" >
                            Editar Perfil
                            </IonButton>
                            <IonButton expand="block" color="danger" >
                            Cerrar Sesión
                            </IonButton>
                        </div>
                        </IonCardContent>
                    </IonCard>

                    <IonGrid>eliaspuma</IonGrid>
                </section>

            </IonContent>
        </IonPage>
    );
};

export default Perfil;