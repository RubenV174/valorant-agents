import { Agente, AgenteCreate } from "../types/agente";

const BASE_URL = "https://api-olng.onrender.com/api/v1";

const endpoints = {
  agentes: {
    base: `${BASE_URL}/agentes`,
    byId: (id: number) => `${BASE_URL}/agentes/${id}`,
  },
};

export const agentesService = {
  getAll: async (): Promise<Agente[]> => {
    const res = await fetch(endpoints.agentes.base, { cache: "no-store" });
    if (!res.ok) throw new Error("Error al obtener agentes");
    return res.json();
  },

  getById: async (id: number): Promise<Agente> => {
    const res = await fetch(endpoints.agentes.byId(id), { cache: "no-cache" });
    if (!res.ok) throw new Error("Agente no encontrado");
    return res.json();
  },

  create: async (agente: AgenteCreate): Promise<Agente> => {
    const res = await fetch(endpoints.agentes.base, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agente),
    });
    if (!res.ok) throw new Error("Error al crear agente");
    return res.json();
  },

  update: async (id: number, agente: AgenteCreate): Promise<Agente> => {
    const res = await fetch(endpoints.agentes.byId(id), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(agente),
    });
    if (!res.ok) throw new Error("Error al actualizar agente");
    return res.json();
  },

  delete: async (id: number): Promise<boolean> => {
    const res = await fetch(endpoints.agentes.byId(id), { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar agente");
    return true;
  },
};
