import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Agente } from "../types/agente";
import { agentesService } from "../services/agentes";
import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonText,
  IonToolbar,
} from "@ionic/react";
import { create, trash } from "ionicons/icons";
import { deleteAgenteAction } from "../actions/agentes";

const AgenteDetalle: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [agente, setAgente] = useState<Agente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await agentesService.getById(Number(id));
        setAgente(data);
      } catch {
        setError("No se pudo cargar el agente");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, [id]);

  const handleDeleteClick = async (id: string) => {
    const { success, message } = await deleteAgenteAction(Number(id));

    if (success) history.push("/agentes");
    else setError(message);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tab1" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {loading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <IonSpinner />
          </div>
        )}

        {error && (
          <IonText color="danger">
            <p style={{ textAlign: "center", marginTop: 40 }}>{error}</p>
          </IonText>
        )}

        {agente && (
          <>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>{agente.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonItem lines="none">
                  <IonLabel>
                    <p>Rol</p>
                    <h2>{agente.rol}</h2>
                  </IonLabel>
                </IonItem>
                <IonItem lines="none">
                  <IonLabel>
                    <p>Origen</p>
                    <h2>{agente.origen}</h2>
                  </IonLabel>
                </IonItem>
              </IonCardContent>
            </IonCard>

            <IonCard>
              <IonCardHeader>
                <IonCardTitle>Habilidades</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {agente.habilidades.map((h, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <IonItem>
                      <IonBadge color="primary" style={{ marginBottom: 4 }}>
                        {h.name}
                      </IonBadge>
                    </IonItem>
                    <IonItem>
                      <IonText>
                        <p>{h.description}</p>
                      </IonText>
                    </IonItem>
                  </div>
                ))}
              </IonCardContent>
            </IonCard>

            <IonButtons>
              <IonButton
                type="button"
                fill="outline"
                color="warning"
                routerLink={`/editar/${id}`}
              >
                <IonIcon icon={create} />
                Editar
              </IonButton>
              <IonButton
                onClick={() => handleDeleteClick(id)}
                type="button"
                fill="outline"
                color="danger"
              >
                <IonIcon icon={trash}></IonIcon>
                Eliminar
              </IonButton>
            </IonButtons>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default AgenteDetalle;
