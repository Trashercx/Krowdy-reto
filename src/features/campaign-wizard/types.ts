export type TemplateId = "invitation" | "reminder" | "custom";

export type Channel = "sms" | "email" | "whatsapp";

export const CHANNEL_ORDER: Channel[] = ["sms", "email", "whatsapp"];

export interface WizardState {
  stepIndex: number;
  template: TemplateId | null;
  channels: Channel[];

  sms: {
    message: string;
  };

  whatsapp: {
    message: string;
  };

  email: {
    subject: string;
    message: string;
  };

  sending: boolean;
  submitted: boolean;
  error: string | null;
}
