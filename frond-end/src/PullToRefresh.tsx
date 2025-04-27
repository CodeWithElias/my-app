import React from 'react';
import { IonRefresher, IonRefresherContent } from '@ionic/react';

const PullToRefresh: React.FC = () => {
  const doRefresh = (event: CustomEvent) => {
    console.log('Refrescando...');
    setTimeout(() => {
      console.log('Refresco completo');
      event.detail.complete();
    }, 1500);
  };

  return (
    <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
      <IonRefresherContent
        pullingIcon="arrow-down-circle-outline"
        pullingText="Desliza para refrescar"
        refreshingSpinner="circles"
        refreshingText="Refrescando..."
      />
    </IonRefresher>
  );
};

export default PullToRefresh;