import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonLoading, IonModal, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import './Page.css';
import { useEffect, useState } from 'react';
import catologo from './catalogo/catalogo';
import { buscarCatalogo } from './catalogo/catalogoApi';
import { useAuth } from './Cliente/authContext';
import { agregarAlCarrito, comprarProductoAhora, confirmarPago, pagoPaypal } from './carrito/carritoApi';
import { toast } from 'react-toastify';
import { logoPaypal } from 'ionicons/icons';
import Carrito from './carrito/carrito';


const Page: React.FC = () => {

  useParams<{ name: string; }>();
  const [catalogo, setCatalogo] = useState<catologo[]>([]);
  const history = useHistory();
  const [,setCarrito] = useState<Carrito[]>([]);

  const {inicioSesion, usuarioLogin} = useAuth();
  const [cargando, setCargando] = useState(true);


  const [mostrarModal, setMostrarModal] = useState(false);
  const [direccion, setDireccion] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState("estandar");
  const [IdProducto, setIdProducto] = useState("")


  useEffect(() =>{
      
    search();
    
  }, []);
      

  const search = async () => {
          let result = await buscarCatalogo();
              
          if (!Array.isArray(result)) {
              console.error("Error: No se pudo obtener la lista de clientes.");
          return;
      }
              
          setCatalogo(result);
          setCargando(false);
      
  }


  const agregarCarrito = async (id_prod: number) => {

    if (usuarioLogin && usuarioLogin.id) {
      const nuevoCarrito = {
        usuario_id: Number(usuarioLogin.id),
        producto_id: id_prod,
        cantidad: 1,
      };
    
      const response = await agregarAlCarrito(nuevoCarrito);
      console.log("Respuesta de la API:", response);
      if (response) {
      // Lógica para agregar el producto
        toast.success("Producto agregado al carrito 🛒", {
          position: "bottom-center",
          autoClose: 3000, // Se cierra en 3 segundos
        });
      }else{
        toast.error("Error al agregar al 🛒", {
          position: "bottom-center",
          autoClose: 3000, // Se cierra en 3 segundos
        });
      }
    };
  };
  



    const comprarAhora = async (id_prod: number) => {
      if (usuarioLogin && usuarioLogin.id) {
        const nuevoCarrito = {
          usuario_id: Number(usuarioLogin.id),
          producto_id: id_prod,
          cantidad: 1,
          metodo_pago_id: 1,
          direccion_envio: direccion,
          tipo_entrega: tipoEntrega
        };
      
        setCarrito([nuevoCarrito]);
        const response = await comprarProductoAhora(nuevoCarrito);
        console.log("Respuesta de la API:", response);
        if (response){
          const res = await confirmarPago(response.pago_id);

          toast.success("Gracias por su compra", {
            position: "bottom-center",
            autoClose: 3000, // Se cierra en 3 segundos
          });       

          if (res) {
            const respay = await pagoPaypal(response.pago_id);

            setMostrarModal(false);
            window.open(respay.approval_url, '_blank');

          }
        }else {
          toast.error("La compra tubo un error", {
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
      
        <IonContent className='content'>

          <img className='img' src='https://i.pinimg.com/736x/fe/e3/c2/fee3c249f7f5ed43cec103cf37f9170c.jpg'></img>
          <h2 className='titulo-page'>E-COMMERCE</h2>
  
          <IonTitle id='title'>Productos</IonTitle>

          <IonGrid className="table">
                      <IonRow className='table-item-row'>
                      {catalogo.slice(0, 10).map((cata: catologo) => (
                          <IonCol className='table-item' key={cata.id}>
                              <IonLabel className='titulo'>{cata.nombre}</IonLabel>
                              <img
                                  className='imagen'
                                  src={cata.imagen_url}
                                  alt="Producto del negocio"
                              ></img>
                              <IonLabel className='descripcion-label'>{cata.descripcion}</IonLabel>
                              <IonLabel className='precio-label'>{cata.precio+' bs'}</IonLabel>
                              <IonLabel className='label-stock'>{"stock : "+cata.stock}</IonLabel>
                              <div id="botones">
                              <IonButton  className="botom-comprar" id="boton-comprar" onClick={() => {
                                                if (inicioSesion) {
                                                  if (cata.id !== undefined) {
                                                    agregarCarrito(Number(cata.id));
                                                  }
                                                } else {
                                                  history.push("/login");
                                                }
                                              }}
                              >agregar al carrito</IonButton>
                              <IonButton className="botom-comprar" id="boton-agregar" onClick={() => {
                                                  if (inicioSesion) {
                                                    if (cata.id !== undefined) {
                                                      setMostrarModal(true);
                                                      setIdProducto(cata.id)
                                                    }
                                                  } else {
                                                    history.push("/login");
                                                  }
                                                }}
                                >Comprar Ahora</IonButton>
                                </div>
                          </IonCol>
                      ))}
                      </IonRow>  
          </IonGrid>   



          
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
                <IonButton className="pagar-paypal" fill="clear" onClick={() => (comprarAhora(Number(IdProducto)))}>
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

export default Page;
