import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, IonButton, IonLoading, IonInput, IonItem, IonModal, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import { useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router';
import catologo from './catalogo';
import { buscarCatalogo, mostrarProductoPorCategoria } from './catalogoApi';
import { useAuth } from '../Cliente/authContext';
import { agregarAlCarrito, comprarProductoAhora, confirmarPago, pagoPaypal } from '../carrito/carritoApi';
import Carrito from '../carrito/carrito';
import { toast } from 'react-toastify';
import  './busquedaVoz.css';
import { logoPaypal } from 'ionicons/icons';
const Vistas: React.FC = () => {


    const { name } = useParams<{ name: string; }>();

    const [catalogo, setCatalogo] = useState<catologo[]>([]);

    const [,setCarrito] = useState<Carrito[]>([]);

    const {inicioSesion, usuarioLogin} = useAuth();

    const history = useHistory();
    const [cargando, setCargando] = useState(true);
    
    const [busqueda, setBusqueda] = useState('');

    const [catalogoFiltrado, setCatalogoFiltrado] = useState<catologo[]>([]);

    // para busqueda por voz
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const categoriasMap: { [clave: string]: number } = {
      "celulares": 1,
      "teléfonos": 1,
      "computadoras": 2,
      "laptops": 2,
      "tabletas": 3,
      "accesorios": 4,
      "televisores": 5,
      "electrodomésticos": 6,
      "audio": 7,
      "cámaras": 8
    };
    
    const [mostrarModal, setMostrarModal] = useState(false);
    const [direccion, setDireccion] = useState("");
    const [tipoEntrega, setTipoEntrega] = useState("estandar");
    const [IdProducto, setIdProducto] = useState("")

    useEffect(() =>{
      search();
    },[] );
    

    useEffect(() => {
      const resultados = catalogo.filter((producto) =>
        producto.nombre?.toLowerCase().includes(busqueda.toLowerCase())
      );
      setCatalogoFiltrado(resultados);
    }, [busqueda, catalogo]);
    

    const search = async () => {
        let result = await buscarCatalogo();
            
        if (!Array.isArray(result)) {
            console.error("Error: No se pudo obtener la lista de Productos.");
          return;
        }
      setCatalogo(result);
      setCargando(false);
    }


    const mostrarPorCategoria = async (categ_id: number) => {

      let result = await mostrarProductoPorCategoria(categ_id);

      if (!Array.isArray(result)){
        console.error("Error: No se pudo obtener la lista de Productos")
        return ;
      }
      setCatalogo(result);
    }

    
    const agregarCarrito = async (id_prod: number) => {
      if (usuarioLogin && usuarioLogin.id) {
        const nuevoCarrito = {
          usuario_id: Number(usuarioLogin.id),
          producto_id: id_prod,
          cantidad: 1,
        };
      
        setCarrito([nuevoCarrito]);
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
      }
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

        toast.success("Gracias por su compra", {
          position: "bottom-center",
          autoClose: 3000, // Se cierra en 3 segundos
        });
        if (response){
          const res = await confirmarPago(response.pago_id);

          if (res) {
            const respay = await pagoPaypal(response.pago_id);

            setMostrarModal(false);
            window.open(respay.approval_url, '_blank');

          }
        }else {
          toast.error("La compra tuvo un error", {
            position: "bottom-center",
            autoClose: 3000, // Se cierra en 3 segundos
          });
        }
        
      }
    }

    // busqueda por voz
    const iniciarBusquedaPorVoz = () => {
      if (!recognition) {
        alert("Tu navegador no soporta reconocimiento de voz.");
        return;
      }
    
      recognition.lang = 'es-ES'; // idioma español
      recognition.start();
    
      recognition.onresult = (event: any) => {
        const textoReconocido = event.results[0][0].transcript.toLowerCase();
        console.log("Texto detectado por voz:", textoReconocido);
        toast.warn(textoReconocido);

        // 1. Buscar si es una categoría
        for (const clave in categoriasMap) {
          if (textoReconocido.includes(clave)) {
            const categoriaId = categoriasMap[clave];
            console.log(`Categoría detectada: ${clave} con ID: ${categoriaId}`);
            mostrarPorCategoria(categoriaId);
            return;
          }
        }
    
        // 2. Buscar si quiere agregar al carrito
        if (textoReconocido.includes("agregar al carrito")) {
          const nombreDicho = textoReconocido.replace("agregar al carrito", "").trim();
    
          if (nombreDicho.length === 0) {
            toast.warn("No se entendió el nombre del producto.");
            return;
          }
    
          const productoEncontrado = catalogo.find((prod) =>
            prod.nombre?.toLowerCase().includes(nombreDicho)
          );
    
          if (productoEncontrado && productoEncontrado.id) {
            agregarCarrito(Number(productoEncontrado.id));
            toast.success(`"${productoEncontrado.nombre}" agregado al carrito 🛒`);
          } else {
            toast.error("No se encontró el producto.");
          }
    
          return;
        }
    
        // 3. Si no es ninguna de las anteriores, lo usamos como búsqueda normal
        setBusqueda(textoReconocido);
      };
    
      recognition.onerror = (event: any) => {
        console.error("Error en reconocimiento de voz:", event.error);
        toast.error("Error con el micrófono o reconocimiento de voz.");
      };
    };
    
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

        <div className="busqueda-contenedor">
          <input
            type="text"
            placeholder="Buscar producto o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="busqueda-input"
          />
          <IonButton onClick={iniciarBusquedaPorVoz} className="boton-voz">
            🎤 Buscar con voz
          </IonButton>
        </div>


          <IonGrid className="table">
              <IonRow className='table-item-row'>
              {(busqueda ? catalogoFiltrado : catalogo).map((cata: catologo) => (
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

export default Vistas;
