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
import { useFieldArray, useForm } from "react-hook-form";
import { AgenteCreate } from "../types/agente";
import { useState, useTransition } from "react";
import { createAgenteAction } from "../actions/agentes";

const AgenteAdd: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{
    text: string;
    error: boolean;
  } | null>(null);

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

  const onSubmit = (agente: AgenteCreate) => {
    setMessage(null);

    startTransition(async () => {
      const response = await createAgenteAction(agente);
      setMessage({ text: response.message, error: !response.success });

      if (response.success) reset();
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuevo Agente</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <IonItem>
            <IonInput
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
              {isPending ? "Agregando..." : "Agregar Agente"}
            </IonButton>
          </IonItem>

          {message && (
            <IonItem>
              <p className={message.error ? "text-red-500" : "text-green-500"}>
                {message.text}
              </p>
            </IonItem>
          )}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AgenteAdd;
