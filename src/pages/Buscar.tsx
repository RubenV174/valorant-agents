import { useEffect, useState } from "react";
import { Agente } from "../types/agente";
import { agentesService } from "../services/agentes";
import { useHistory } from "react-router";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonSearchbar,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import AgenteCard from "../components/AgenteCard";

const Buscar: React.FC = () => {
  const [agentes, setAgentes] = useState<Agente[]>([]);
  const [filtrados, setFiltrados] = useState<Agente[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const history = useHistory();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await agentesService.getAll();
        setAgentes(data);
        setFiltrados(data);
      } catch {
        setError("No se pudo conectar con la API");
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleSearch = (e: CustomEvent) => {
    const valor = e.detail.value ?? "";
    setQuery(valor);

    const resultado = agentes.filter(
      (a) =>
        a.name.toLowerCase().includes(valor.toLowerCase()) ||
        a.rol.toLowerCase().includes(valor.toLowerCase()) ||
        a.origen.toLowerCase().includes(valor.toLowerCase()),
    );
    setFiltrados(resultado);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Buscar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          value={query}
          onIonInput={handleSearch}
          placeholder="Buscar por nombre, rol u origen"
          debounce={300}
        />

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

        {!loading && !error && filtrados.length === 0 && (
          <IonText>
            <p style={{ textAlign: "center", marginTop: 40 }}>
              No se encontraron agentes
            </p>
          </IonText>
        )}

        {!loading &&
          !error &&
          filtrados.map((agente) => (
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

export default Buscar;
