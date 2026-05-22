import { agentesService } from "../services/agentes";
import { Agente, AgenteCreate } from "../types/agente";

export async function createAgenteAction(data: AgenteCreate) {
  try {
    const nuevoAgente = await agentesService.create(data);
    console.log("Agente creado exitosamente:", nuevoAgente);

    return { success: true, message: "Agente creado con éxito." };
  } catch (err) {
    console.error("Error en Server Action", err);
    return { success: false, message: "Hubo un error al crear el agente." };
  }
}

export async function updateAgenteAction(id: number, data: AgenteCreate) {
  try {
    await agentesService.update(id, data);

    return { success: true, message: "Agente actualizado con éxito." };
  } catch (err) {
    console.error("Error en Server Action", err);
    return {
      success: false,
      message: "Hubo un error al actualizar el agente.",
    };
  }
}

export async function deleteAgenteAction(id: number): Promise<{
  success: boolean;
  message?: string;
}> {
  try {
    await agentesService.delete(id);

    return { success: true, message: "Agente eliminado con éxito" };
  } catch {
    return { success: false, message: "Error al eliminar el agente" };
  }
}

export async function getAgenteByIdAction(id: number): Promise<{
  success: boolean;
  data?: Agente;
  message?: string;
}> {
  try {
    const agente = await agentesService.getById(id);
    return { success: true, data: agente };
  } catch {
    return { success: false, message: "Agente no encontrado" };
  }
}

export async function getAllAgentesAction(): Promise<{
  success: boolean;
  data?: Agente[];
  message?: string;
}> {
  try {
    const agentes = await agentesService.getAll();
    return { success: true, data: agentes };
  } catch {
    return { success: false, message: "Error al obtener agentes" };
  }
}
