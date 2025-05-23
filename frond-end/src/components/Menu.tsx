import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonButtons,
  IonContent,
  IonMenuButton,
  IonMenu,
  IonItem,
  IonList,
  IonMenuToggle,
  IonLabel,
  IonIcon,
} from '@ionic/react';

import { people, peopleOutline, home, homeOutline, 
  bookOutline, book, 
  menu, close,
  cart,
  cartOutline,
  person} from 'ionicons/icons';


import { useMediaQuery } from 'react-responsive'; 
import { useHistory } from 'react-router-dom';
import '../components/Menu.css';
import ReactDOM from 'react-dom';
import { useAuth } from '../pages/Cliente/authContext';



const menuItems = [
  
  { 
    label: 'Inicio',
    path: '/inicio',
    iosIcon: homeOutline,
    mdIcon: home
  },

  { 
    label: 'Catalogo',
    path: '/catalogo' ,
    iosIcon: bookOutline,
    mdIcon: book
  },

  { 
    label: 'Sobre Nosotros',
    path: '/nosotros',
    iosIcon: peopleOutline,
    mdIcon: people
  },

  { 
    label: 'Carrito',
    path: '/carrito',
    iosIcon: cartOutline,
    mdIcon: cart
  },

];

const Header: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [label] = useState("E-COMMERCE");
  const [activeButton, setActiveButton] = useState<number | null>(null);


  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const {inicioSesion, setInicioSesion} = useAuth();
  const {setUsuarioLogin} = useAuth();


  useEffect(() =>{

  }, []);


  const handleButtonClick = (index: null | number) => {   
    setActiveButton((prev) => (prev === index ? null : index)); // Alterna entre activado/desactivado
  };
  
  const cerrarSesion = () => {
    setUsuarioLogin(null);
    setInicioSesion(false);
    console.log("localStorage ha sido vaciado.");
    history.push("/inicio")
    
  };

  
      const [isPortalOpen, setIsPortalOpen] = useState(false);
  
      const portalContent = isPortalOpen && (
          <div className="user-portal-overlay">
              <div  className="user-portal-content" onClick={(e) => e.stopPropagation()}>

              <IonItem button onClick={() => {
                                        setIsPortalOpen(false); // Cierra el portal
                                        inicioSesion ? history.push("/perfil") : history.push("/login");
                                      }}>
                <IonLabel>{inicioSesion ? "Perfil" : "Inicia Sesión"}</IonLabel>
              </IonItem>

              <IonItem button onClick={() => {
                                        setIsPortalOpen(false); // Cierra el portal
                                        inicioSesion ? cerrarSesion() : history.push("/registrarse");
                                      }}>
                <IonLabel>{inicioSesion ? "Cerrar Sesión" : "Registrarse"}</IonLabel>
              </IonItem>
              
              </div>
          </div>
      );  

  return (
    <>
    {!isMobile}(
      {/* MENÚ LATERAL PARA MÓVILES */}
      <IonMenu
        side="end"
        contentId="main-content"
        className="ion-menu-custom" // Clase personalizada para el menú
        onIonDidOpen={() => setMenuOpen(true)} // Detectar apertura del menú
        onIonDidClose={() => setMenuOpen(false)} // Detectar cierre del menú
      >
        <IonContent id="main-content" className="ion-padding">
            <IonList className='list'>
                <IonMenuButton className="menu-boton" autoHide={false} >
                    <IonIcon icon={menuOpen ? close : menu} className="custom-icon" /> {/* Cambia entre íconos */}
                </IonMenuButton>

                {menuItems.map((item, index) => (
                    <IonMenuToggle key={index} autoHide={false}>
                        <IonItem
                            className={`custom-item cursor-pointer ${location.pathname === item.path ? 'selected' : ''}`}
                            onClick={() => {
                                history.push(item.path);
                                setMenuOpen(false);
                              }
                            }
                            lines="none"
                            detail={false}
                        >
                            <IonIcon
                                aria-hidden="true"
                                slot="start"
                                ios={item.iosIcon}
                                md={item.mdIcon}
                                className="custom-icon"
                            />
                            <IonLabel className="custom-label">{item.label}</IonLabel>
                        </IonItem>
                    </IonMenuToggle>
                ))}
            </IonList>
        </IonContent>
      </IonMenu>
    ):(
      {/* HEADER */}
      <IonHeader>
        
        <IonToolbar>
          <div className='header'>
            
            <IonTitle className='title'>{label}</IonTitle>
            <IonButtons>
              {isMobile ? (
                <IonMenuButton autoHide={false}>
                  <IonIcon icon={menuOpen ? close : menu} /> {/* Cambia entre ícono de "menu" y "close" */}
                </IonMenuButton>
              ) : (
                menuItems.map((item, index) => (
                  <IonButton
                    className={`boton ${activeButton === index ? 'active' : ''}`}
                    key={index}
                    onClick={() => {
                        history.push(item.path);
                        handleButtonClick(index);
                      }
                    }
                  >
                    {item.label} {/* Mostrar texto solo si está activo */}
                    <IonIcon
                      aria-hidden="true"
                      slot="start"
                      ios={item.iosIcon}
                      md={item.mdIcon}
                    />
                  </IonButton>

                ))
              )}

              <>
                  <IonButton
                      fill='clear'
                      onClick= {isPortalOpen == false ? () => setIsPortalOpen(true) : () => setIsPortalOpen(false)}
                  >
                    <IonIcon icon={person} slot="icon-only"/>
                  </IonButton>
                  {isPortalOpen && ReactDOM.createPortal(portalContent, document.body)}
              </>

            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
    );
    </>
  );
};

export default Header;
