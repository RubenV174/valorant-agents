import React from "react";
import { Props } from "../types/agente";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";

const AgenteCard: React.FC<Props> = ({ agente, onClick }) => {
  return (
    <IonCard button onClick={() => onClick(agente.id)}>
      <IonCardHeader>
        <IonCardTitle>{agente.name}</IonCardTitle>
        <IonCardSubtitle>{agente.rol}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>
        <p>🌍 {agente.origen}</p>
        <div
          style={{
            marginTop: 8,
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
          }}
        >
          {agente.habilidades.map((h, i) => (
            <IonBadge key={i} color="primary">
              {h.name}
            </IonBadge>
          ))}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

export default AgenteCard;
