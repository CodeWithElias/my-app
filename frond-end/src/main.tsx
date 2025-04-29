import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { IonApp } from '@ionic/react';
import { AuthProvider } from './pages/Cliente/authContext';
import { IonReactRouter } from '@ionic/react-router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Obtener el contenedor de la app
const container = document.getElementById('root');

// Crear la raíz e incluir el AuthProvider
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <IonReactRouter>
      <AuthProvider>
        <IonApp>
          <ToastContainer />
          <App />
        </IonApp>
      </AuthProvider>
    </IonReactRouter>
  </React.StrictMode>
);