import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { addOutline, peopleOutline, searchOutline } from "ionicons/icons";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Agentes from "./pages/Agentes";
import AgenteDetalle from "./pages/AgenteDetalle";
import Buscar from "./pages/Buscar";
import AgenteAdd from "./pages/AgenteAdd";
import AgenteEdit from "./pages/AgenteEdit";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/agentes" component={Agentes} />
          <Route exact path="/agentes/:id" component={AgenteDetalle} />
          <Route exact path="/buscar" component={Buscar} />
          <Route exact path="/agregar" component={AgenteAdd} />
          <Route exact path="/editar/:id" component={AgenteEdit} />
          <Route exact path="/" render={() => <Redirect to="/agentes" />} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="agentes" href="/agentes">
            <IonIcon icon={peopleOutline} />
            <IonLabel>Agentes</IonLabel>
          </IonTabButton>
          <IonTabButton tab="buscar" href="/buscar">
            <IonIcon icon={searchOutline} />
            <IonLabel>Buscar</IonLabel>
          </IonTabButton>
          <IonTabButton tab="agregar" href="/agregar">
            <IonIcon icon={addOutline} />
            <IonLabel>Agregar</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
