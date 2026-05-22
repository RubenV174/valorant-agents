import { useEffect, useState } from "react";
import { Agente } from "../types/agente";
import { useHistory } from "react-router";
import { agentesService } from "../services/agentes";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import AgenteCard from "../components/AgenteCard";
import { getAllAgentesAction } from "../actions/agentes";

const Agentes: React.FC = () => {
  const [agentes, setAgentes] = useState<Agente[] | undefined>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>("");
  const history = useHistory();

  const cargarAgentes = async () => {
    try {
      setError("");
      const data = await agentesService.getAll();
      setAgentes(data);
    } catch {
      setError("No se puede conectar con la API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // cargarAgentes();
    const cargarAgentes = async () => {
      setLoading(true);

      const { success, data, message } = await getAllAgentesAction();

      if (success) {
        setAgentes(data);
        setLoading(false);
      } else setError(message);
    };

    cargarAgentes();
  }, []);

  const handleRefresh = async (e: CustomEvent) => {
    await cargarAgentes();
    e.detail.complete();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Agentes de Valorant</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {loading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <IonSpinner />
          </div>
        )}

        {!error && (
          <IonText color="danger">
            <p style={{ textAlign: "center", marginTop: 40 }}>{error}</p>
          </IonText>
        )}

        {!loading &&
          !error &&
          agentes?.map((agente) => (
            <AgenteCard
              key={agente.id}
              agente={agente}
              onClick={(id) => history.push(`/agentes/${id}`)}
            />
          ))}
      </IonContent>
    </IonPage>
  );
};

export default Agentes;
