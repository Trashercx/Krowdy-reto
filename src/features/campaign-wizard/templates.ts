import type { TemplateId } from "./types";

export type TemplateContent = {
  sms: string;
  whatsapp: string;
  email: { subject: string; message: string };
};

export const TEMPLATES: Record<TemplateId, TemplateContent> = {
  invitation: {
    sms: "Hola [Nombre], te invitamos a participar en [proceso] el [fecha] a las [hora]. Confirma respondiendo a este mensaje. ¡Te esperamos!",
    whatsapp: "Hola [Nombre], te invitamos a participar en [proceso] el [fecha] a las [hora]. Confirma por este medio. ¡Te esperamos!",
    email: {
      subject: "Invitación al proceso de [proceso]",
      message:
        "Estimado/a [Nombre],\n\nTe invitamos a participar en el proceso de [proceso], que se llevará a cabo el [fecha] a las [hora] en [lugar].\n\nAgradeceríamos confirmes tu asistencia.\n\nSaludos,\n[Remitente]\n[Puesto]\n[Empresa]",
    },
  },

  reminder: {
    sms: "Hola [Nombre], recordatorio: el proceso [proceso] será el [fecha] a las [hora]. ¡Te esperamos puntual!",
    whatsapp: "Hola [Nombre], recordatorio: el proceso [proceso] será el [fecha] a las [hora]. ¡Te esperamos puntual!",
    email: {
      subject: "Recordatorio del proceso de [proceso]",
      message:
        "Estimado/a [Nombre],\n\nTe recordamos que el proceso de [proceso] se realizará el [fecha] a las [hora] en [lugar].\n\nSaludos,\n[Remitente]\n[Puesto]\n[Empresa]",
    },
  },

  custom: {
    sms: "",
    whatsapp: "",
    email: { subject: "", message: "" },
  },
};
