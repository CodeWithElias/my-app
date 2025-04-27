import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import React from 'react';
import { eliminarProductoDelCarrito, obtenerCarrito } from './carritoApi';
import Producto from '../producto/Producto';
import { useAuth } from '../Cliente/authContext';
import { trash } from 'ionicons/icons';
import './carrito.css';

const CarritoPage: React.FC = () => {
  
  const { name } = useParams<{ name: string; }>();
  const [producto, setProducto] = useState<Producto[]>([]);

  const {usuarioLogin} = useAuth();

  useEffect(() => {
    search();
  }, );

  const search = async () => {
    try {
      if (usuarioLogin && usuarioLogin.id) {
        const result = await obtenerCarrito(Number(usuarioLogin.id));
        console.log("Contenido recibido:", result);
      
        if (result && Array.isArray(result.productos)) {
          setProducto(result.productos);
        }
      } else {
        console.error("Error: No se pudo obtener la lista de productos del carrito.");
      }
    } catch (error) {

      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
    }
  };


  const remove = async (prod_id: number) => {
    try{
      if (usuarioLogin && usuarioLogin.id) {
        await eliminarProductoDelCarrito(prod_id, Number(usuarioLogin.id));
      }
      
      search()
    } catch (error){

      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
    }
  }

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
        
        <IonCard>                
          
          <IonGrid className="table-car">
              <IonRow>
                
                  <IonCol>Producto</IonCol>
                  <IonCol>Cantidad</IonCol>
                  <IonCol>Precio</IonCol>
                  <IonCol>Acciones</IonCol>
                
              </IonRow>

              {Array.isArray(producto) && producto.map((cata:Producto) => (
                  <IonRow key={cata.producto_id}>
                      
                      <IonCol>{cata.nombre}</IonCol>
                      <IonCol>{cata.cantidad}</IonCol>
                      <IonCol>{cata.precio + ' bs'}</IonCol>
                      <IonCol > 
                        
                        <IonButton  fill="clear"
                                      onClick={() => remove(cata.producto_id)}>
                        <IonIcon icon={trash} slot="icon-only"/>
                        </IonButton>


                      </IonCol>
                  </IonRow>
              ))}
              
          </IonGrid>
      </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default CarritoPage;
