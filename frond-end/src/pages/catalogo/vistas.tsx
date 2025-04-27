import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, IonButton, IonAccordionGroup, IonAccordion, IonItem } from '@ionic/react';
import { useEffect, useState } from 'react';
import {  useHistory, useParams } from 'react-router';
import catologo from './catalogo';
import { buscarCatalogo, mostrarProductoPorCategoria } from './catalogoApi';
import { useAuth } from '../Cliente/authContext';
import { agregarAlCarrito } from '../carrito/carritoApi';
import Carrito from '../carrito/carrito';

const Vistas: React.FC = () => {


    const { name } = useParams<{ name: string; }>();

    const [catalogo, setCatalogo] = useState<catologo[]>([]);

    const [,setCarrito] = useState<Carrito[]>([]);

    const {inicioSesion, usuarioLogin} = useAuth();

    const history = useHistory();

    useEffect(() =>{
        search();
    }, []);
    
    const search = async () => {
        let result = await buscarCatalogo();
            
        if (!Array.isArray(result)) {
            console.error("Error: No se pudo obtener la lista de Productos.");
          return;
        }
      setCatalogo(result);
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
      }
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
          
        <IonAccordionGroup>
          {/* Acordeón de Categorías */}
          <IonAccordion value="categorias">
            <IonItem slot="header">
              <IonLabel>Selecciona una categoría</IonLabel>
            </IonItem>
            <div slot="content">
              {/* Botones dentro del acordeón */}
              <IonButton expand="block" onClick={() => mostrarPorCategoria(1)}>Telefonos</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(2)}>Computadoras</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(3)}>Tabletas</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(4)}>Accesorios</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(5)}>Televisores</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(6)}>Electrodomésticos</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(7)}>Audio</IonButton>
              <IonButton expand="block" onClick={() => mostrarPorCategoria(8)}>Cámaras</IonButton>
            </div>
          </IonAccordion>
        </IonAccordionGroup>

          <IonGrid className="table">
              <IonRow className='table-item-row'>
              {catalogo.map((cata: catologo) => (
                  <IonCol className='table-item' key={cata.id}>
                      <IonLabel className='titulo'>{cata.nombre}</IonLabel>
                      <img
                          className='imagen'
                          src={cata.imagen_url}
                          alt="Producto del negocio"
                      ></img>
                      <IonLabel className='descripcion-label'>{cata.descripcion}</IonLabel>
                      <IonLabel className='precio-label'>{cata.precio+' bs'}</IonLabel>
                      <IonLabel>{cata.stock}</IonLabel>
                      <IonButton id="boton-agregar" onClick={() => {
                                        if (inicioSesion) {
                                          if (cata.id !== undefined) {
                                            agregarCarrito(Number(cata.id));
                                          }
                                        } else {
                                          history.push("/login");
                                        }
                                      }}
                      >agregar al carrito</IonButton>
                  </IonCol>
              ))}
              </IonRow>  
          </IonGrid>      
        
      </IonContent>
    </IonPage>
  );
};

export default Vistas;
