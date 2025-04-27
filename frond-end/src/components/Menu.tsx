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

import { people, peopleOutline, home, homeOutline, cog, cogOutline, 
  bookOutline, book, radio, radioOutline, 
  cash, cashOutline, logoWhatsapp, menu, close,
  cart,
  cartOutline} from 'ionicons/icons';


import { useMediaQuery } from 'react-responsive'; 
import { useHistory } from 'react-router-dom';
import '../components/Menu.css';
import { IonImg } from '@ionic/react';
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
    label: 'Acerca de Nosotros',
    path: '/login',
    iosIcon: peopleOutline,
    mdIcon: people
  },

  { 
    label: 'Actividades',
    path: '/registrarse',
    iosIcon: cogOutline,
    mdIcon: cog
  },

  { 
    label: 'Carrito',
    path: '/carrito',
    iosIcon: cartOutline,
    mdIcon: cart
  },

  { 
    label: 'Testimonios',
    path: '/inicio',
    iosIcon: radioOutline,
    mdIcon: radio
  },

  { 
    label: 'Donaciones',
    path: '/inicio',
    iosIcon: cashOutline,
    mdIcon: cash
  },

  { 
    label: 'Contacto',
    path: '/inicio',
    iosIcon: logoWhatsapp,
    mdIcon: logoWhatsapp
  },

  { 
    label: 'Comunidad',
    path: '/inicio',
    iosIcon: peopleOutline,
    mdIcon: people
  }
];

const Header: React.FC = () => {

  const [menuOpen, setMenuOpen] = useState(false);
  const [label] = useState("E-COMMERCE");
  const [activeButton, setActiveButton] = useState<number | null>(null);


  const history = useHistory();
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });


  useEffect(() =>{

  }, [history.location.pathname]);


  const handleButtonClick = (index: null | number) => {   
    setActiveButton((prev) => (prev === index ? null : index)); // Alterna entre activado/desactivado
  };
  
  const cerrarSesion = () => {
    localStorage.clear(); // Vacía completamente el localStorage
    console.log("localStorage ha sido vaciado.");
    history.push("/inicio")
    window.location.reload();
  };


      const [isPortalOpen, setIsPortalOpen] = useState(false);
      const {inicioSesion} = useAuth();
  
      const portalContent = isPortalOpen && (
          <div className="user-portal-overlay">
              <div  className="user-portal-content" onClick={(e) => e.stopPropagation()}>

              <IonItem button onClick={() => inicioSesion == true ? history.push("/perfil") : (history.push("/login"))}>
                <IonLabel>{inicioSesion ? "Perfil de Usuario" : "Inicia Sesión"}</IonLabel>
              </IonItem>

              <IonItem button onClick={() => inicioSesion == true ? cerrarSesion() : (history.push("/registrarse"))}>
                <IonLabel>{inicioSesion ? "Cerrar Sesión" : "Registrarse"}</IonLabel>
              </IonItem>

              </div>
          </div>
      );  


  return (
    <>
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
                    {activeButton === index && item.label} {/* Mostrar texto solo si está activo */}
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
                  <IonImg
                      src=""
                      className="imagen-usuario"
                      onClick= {isPortalOpen == false ? () => setIsPortalOpen(true) : () => setIsPortalOpen(false)}
                  />
                  {isPortalOpen && ReactDOM.createPortal(portalContent, document.body)}
              </>

            </IonButtons>
          </div>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default Header;
