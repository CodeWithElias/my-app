import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonLabel, IonPage, IonRow, IonTitle } from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import './Page.css';
import { useEffect, useState } from 'react';
import catologo from './catalogo/catalogo';
import { buscarCatalogo } from './catalogo/catalogoApi';
import { useAuth } from './Cliente/authContext';
import { agregarAlCarrito } from './carrito/carritoApi';

const Page: React.FC = () => {

  useParams<{ name: string; }>();
  const [catalogo, setCatalogo] = useState<catologo[]>([]);
  const history = useHistory();


  
  
  const {inicioSesion, usuarioLogin} = useAuth();


  useEffect(() =>{
          search();
  }, [history.location.pathname]);
      

  const search = async () => {
          let result = await buscarCatalogo();
              
          if (!Array.isArray(result)) {
              console.error("Error: No se pudo obtener la lista de clientes.");
          return;
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
    
      const response = await agregarAlCarrito(nuevoCarrito);
      console.log("Respuesta de la API:", response);

    }
    
  };
  

  return (
      <IonPage>
        <IonContent className='content'>
          
          <img className='img' src=''></img>
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
                              <IonLabel>{cata.descripcion}</IonLabel>
                              <IonLabel>{cata.precio}</IonLabel>
                              <IonLabel>{cata.stock}</IonLabel>
                              <IonButton onClick={() => {
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

          <IonFooter className='footer'>
            contactos y atocinadores
          </IonFooter>
        </IonContent>
      </IonPage>
    );
};

export default Page;
