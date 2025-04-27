import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactHashRouter, IonReactRouter } from '@ionic/react-router';
import { Redirect, Route, Switch } from 'react-router-dom';



/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Cliente/login';
import Vistas from './pages/catalogo/vistas';
import Registrar from './pages/Cliente/registrar';
import Header from './components/Menu';
import Page from './pages/Page';
import CarritoVista from './pages/carrito/CarritoVista';
import Perfil from './pages/Cliente/perfilVista';
import PullToRefresh from './PullToRefresh';


setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactHashRouter>
        <PullToRefresh/>
        <Header />
        <IonSplitPane contentId="main">
          
          <IonRouterOutlet id="main">
                      
              <Route exact path="/">
                <Redirect to="/inicio" />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/inicio">
                <Page />
              </Route>
              <Route exact path="/catalogo">
                <Vistas />
              </Route>
              <Route exact path="/registrarse">
                <Registrar />
              </Route>
              <Route exact path="/carrito">
                <CarritoVista />
              </Route>
              <Route exact path="/perfil">
                <Perfil />
              </Route>

          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactHashRouter>
    </IonApp>
  )
};
export default App;
