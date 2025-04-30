import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonMenuButton, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import React from 'react';
import { comprarCarrito, confirmarPago, eliminarProductoDelCarrito, obtenerCarrito, pagoPaypal } from './carritoApi';
import Producto from '../producto/Producto';
import { useAuth } from '../Cliente/authContext';
import { logoPaypal, trash } from 'ionicons/icons';
import './carrito.css';
import { toast } from 'react-toastify';

const CarritoPage: React.FC = () => {
  
  const { name } = useParams<{ name: string; }>();
  const [producto, setProducto] = useState<Producto[]>([]);
  const {usuarioLogin} = useAuth();
  const [cargando, setCargando] = useState(true);


  const [mostrarModal, setMostrarModal] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState("estandar");


  useEffect(() =>{
      
    search();
  },[]);


  const search = async () => {

      if (usuarioLogin && usuarioLogin.id) {
        const result = await obtenerCarrito(Number(usuarioLogin.id));
        console.log("Contenido recibido:", result);
      
        if (result && Array.isArray(result.productos)) {
          setProducto(result.productos);
          setCargando(false);
        }
      } else {
        console.error("Error: No se pudo obtener la lista de productos del carrito.");
      }
  };


  const remove = async (prod_id: number) => {
    try{
      if (usuarioLogin && usuarioLogin.id) {
        await eliminarProductoDelCarrito(prod_id, Number(usuarioLogin.id));
      }
      
      search()
      
        toast.success("Producto eliminado 🛒", {
          position: "bottom-center",
          autoClose: 3000, // Se cierra en 3 segundos
        });
      
    } catch (error){

      toast.error("Error al eliminar el producto", {
        position: "bottom-center",
        autoClose: 3000, // Se cierra en 3 segundos
      });
    
      if (error instanceof Error) {
        console.error("Error en la petición:", error.message);
      } else {
        console.error("Error en la petición:", error);
      }
      
    }
  }


const pagar = async () => {

      if (usuarioLogin && usuarioLogin.id) {
        const nuevoCarrito = {
          usuario_id: Number(usuarioLogin.id),
          metodo_pago_id: 1,
          direccion_envio: direccion,
          tipo_entrega: tipoEntrega
        };
      
        const response = await comprarCarrito(nuevoCarrito);
        console.log("Respuesta de la API:", response);
        if (response){
          toast.success("Gracias por su compra", {
            position: "bottom-center",
            autoClose: 3000, // Se cierra en 3 segundos
          });
          const res = await confirmarPago(response.pago_id);

          if (res) {
            const respay = await pagoPaypal(response.pago_id);

            setMostrarModal(false);
            window.open(respay.approval_url, '_blank');

          }
        } else {
          toast.error("La compra tuvo  un error", {
            position: "bottom-center",
            autoClose: 3000, // Se cierra en 3 segundos
          });
        }
        
      }
    }




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
        
        <IonCard id="table-carito">                
          
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
          <div className='section-pago'> 
            
          <IonButton
                  className="pagar-paypal"
                  fill="clear"
                  onClick={() => {
                    search();
                  }}
                >
                  
                  Actualizar Carrito
            </IonButton>

            <IonButton
                  className="pagar-paypal"
                  fill="clear"
                  onClick={() => {
                    setMostrarModal(true);
                  }}
                >
                  <IonIcon icon={logoPaypal} slot="icon-only" />
                  PayPal
            </IonButton>

          </div>
      </IonCard>




          <IonModal isOpen={mostrarModal} onDidDismiss={() => setMostrarModal(false)}>
            <IonHeader>
              <IonToolbar>
                <IonTitle>Datos De La Compra</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setMostrarModal(false)}>Cerrar</IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonItem>
                <IonLabel position="stacked">Dirección de envío</IonLabel>
                <IonInput
                  value={direccion}
                  placeholder="Ej: Calle 12, Warnes"
                  onIonChange={(e) => setDireccion(e.detail.value!)}
                />
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Tipo de entrega</IonLabel>
                <IonSelect value={tipoEntrega} onIonChange={(e) => setTipoEntrega(e.detail.value)}>
                  <IonSelectOption value="estandar">Estándar</IonSelectOption>
                  <IonSelectOption value="express">Express</IonSelectOption>
                </IonSelect>
              </IonItem>

              <div className='section-pago'> 
                <IonButton className="pagar-paypal" fill="clear" onClick={() => (pagar())}>
                <IonIcon icon={logoPaypal} slot="icon-only"></IonIcon>
                    PayPal
                </IonButton>
              </div>
            </IonContent>
          </IonModal>




      </IonContent>
    </IonPage>
    </>
  );
};

export default CarritoPage;
