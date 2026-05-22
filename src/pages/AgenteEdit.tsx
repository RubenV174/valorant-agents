import { useParams } from "react-router";
import { getAgenteByIdAction, updateAgenteAction } from "../actions/agentes";
import { useFieldArray, useForm } from "react-hook-form";
import { AgenteCreate } from "../types/agente";
import { useEffect, useState, useTransition } from "react";
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const AgenteEdit: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [msg, setMsg] = useState<{
    text: string;
    error: boolean;
  } | null>(null);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const { register, control, handleSubmit, reset } = useForm<AgenteCreate>({
    defaultValues: {
      name: "",
      rol: "",
      origen: "",
      habilidades: [
        {
          name: "",
          description: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "habilidades",
  });

  useEffect(() => {
    const cargarAgente = async () => {
      const { success, data, message } = await getAgenteByIdAction(Number(id));

      if (success && data) {
        reset({
          name: data.name,
          rol: data.rol,
          origen: data.origen,
          habilidades: data.habilidades.length
            ? data.habilidades
            : [{ name: "", description: "" }],
        });
      }
      else console.error(message);
    };

    cargarAgente();
  }, [id, reset]);

  const onSubmit = (agente: AgenteCreate) => {
    setMsg(null);

    startTransition(async () => {
      const response = await updateAgenteAction(Number(id), agente);
      setMsg({ text: response.message, error: !response.success });

      if (response.success) {
        reset();
        history.push(`/agentes/${id}`);
      }
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Editar Agente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonInput
              readonly={true}
              label="Nombre:"
              {...register("name", { required: true })}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Rol:"
              {...register("rol", { required: true })}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Origen:"
              {...register("origen", { required: true })}
            />
          </IonItem>

          {fields.map((field, index) => (
            <IonList key={field.id}>
              <IonItem>
                <IonInput
                  labelPlacement="floating"
                  label="Nombre de la Habilidad:"
                  {...register(`habilidades.${index}.name`, { required: true })}
                />
                <IonTextarea
                  labelPlacement="floating"
                  label="Descripción de la habilidad:"
                  {...register(`habilidades.${index}.description`, {
                    required: true,
                  })}
                />

                {fields.length > 1 && (
                  <IonButton
                    type="button"
                    onClick={() => remove(index)}
                    shape="round"
                    color="danger"
                  >
                    ✕
                  </IonButton>
                )}
              </IonItem>
            </IonList>
          ))}

          <IonItem>
            <IonButton
              type="button"
              color="success"
              onClick={() => append({ name: "", description: "" })}
            >
              + Añadir otra habilidad
            </IonButton>
          </IonItem>

          <IonItem>
            <IonButton
              type="submit"
              onSubmit={() => onSubmit}
              disabled={isPending}
              color={isPending ? "warning" : "primary"}
            >
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </IonButton>
          </IonItem>

          {msg && (
            <IonItem>
              <p className={msg.error ? "text-red-500" : "text-green-500"}>
                {msg.text}
              </p>
            </IonItem>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AgenteEdit;
