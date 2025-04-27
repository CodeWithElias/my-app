import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IonApp } from '@ionic/react';
import { AuthProvider } from './pages/Cliente/authContext';

// Obtener el contenedor de la app
const container = document.getElementById('root');

// Crear la raíz e incluir el AuthProvider
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <IonApp>
        <App />
      </IonApp>
    </AuthProvider>
  </React.StrictMode>
);