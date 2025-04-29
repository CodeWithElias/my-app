import {
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
  } from "@ionic/react";
  import "./NosotrosStyle.css";
  
  const Nosotros = () => {
    return (
      <IonPage>
        <IonContent fullscreen>
            <section className="nosotros-content">
                <div className="nosotros-fade">
                    <IonCard className="nosotros-card">
                    <IonCardHeader>
                        <IonCardTitle className="nosotros-title">💬 Sobre Nosotros</IonCardTitle>
                    </IonCardHeader>
        
                    <IonCardContent>
                        <p className="nosotros-text">
                        Somos una tienda apasionada por ofrecer los mejores productos a nuestros clientes.
                        Nuestro compromiso es brindarte calidad, confianza y un excelente servicio.
                        </p>
        
                        <div className="nosotros-section">
                        <h3>Misión 🎯</h3>
                        <p>Proporcionar productos de alta calidad que superen las expectativas de nuestros clientes.</p>
        
                        <h3>Visión 🚀</h3>
                        <p>Ser una tienda líder reconocida por su innovación y servicio al cliente.</p>
        
                        <h3>Valores 💡</h3>
                        <ul>
                            <li>Calidad</li>
                            <li>Confianza</li>
                            <li>Compromiso</li>
                            <li>Innovación</li>
                        </ul>
                        </div>
                        
                        <IonButton expand="block" color="primary" routerLink="/catalogo" className="nosotros-button">
                        Explora nuestros productos
                        </IonButton>
                    </IonCardContent>
                    </IonCard>
                </div>
            </section>
        </IonContent>
    </IonPage>
    );
};
  
export default Nosotros;
  