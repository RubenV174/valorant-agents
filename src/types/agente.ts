export type Habilidad = {
  name: string;
  description: string;
};

export type Agente = {
  id: number;
  name: string;
  rol: string;
  origen: string;
  habilidades: Habilidad[];
};

export type AgenteCreate = Omit<Agente, "id">;

export type Props = {
  agente: Agente;
  onClick: (id: number) => void;
};
