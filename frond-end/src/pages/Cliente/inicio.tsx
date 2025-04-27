import { IonButtons, IonContent, IonHeader,  IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {  useParams } from 'react-router';

const Inicio: React.FC = () => {


  const { name } = useParams<{ name: string; }>();


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
          elias puma claure
      </IonContent>
    </IonPage>
  );
};

export default Inicio;
