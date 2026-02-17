import type { WizardState, Channel, TemplateId } from "./types";
import { CHANNEL_ORDER } from "./types";
import { TEMPLATES } from "./templates";

export type WizardAction =
  | { type: "SET_TEMPLATE"; payload: TemplateId }
  | { type: "TOGGLE_CHANNEL"; payload: Channel }
  | { type: "UPDATE_SMS"; payload: string }
  | { type: "UPDATE_WHATSAPP"; payload: string }
  | { type: "UPDATE_EMAIL_SUBJECT"; payload: string }
  | { type: "UPDATE_EMAIL_MESSAGE"; payload: string }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "SUBMIT_REQUEST" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "RESET" };

export const initialState: WizardState = {
  stepIndex: 0,
  template: null,
  channels: [],
  sms: { message: "" },
  whatsapp: { message: "" },
  email: { subject: "", message: "" },
  sending: false,
  submitted: false,
  error: null,
};

function sortChannels(channels: Channel[]): Channel[] {
  return CHANNEL_ORDER.filter((c) => channels.includes(c));
}

export function wizardReducer(
  state: WizardState,
  action: WizardAction
): WizardState {
  switch (action.type) {
    case "SET_TEMPLATE": {
      const t = action.payload;
      const tpl = TEMPLATES[t];
      return {
        ...state,
        template: t,
        sms: { message: state.sms.message || tpl.sms },
        whatsapp: { message: state.whatsapp.message || tpl.whatsapp },
        email: {
          subject: state.email.subject || tpl.email.subject,
          message: state.email.message || tpl.email.message,
        },
      };
    }

    case "TOGGLE_CHANNEL": {
      const exists = state.channels.includes(action.payload);

      const updated = exists
        ? state.channels.filter((c) => c !== action.payload)
        : [...state.channels, action.payload];

      return {
        ...state,
        channels: sortChannels(updated),
      };
    }

    case "UPDATE_SMS":
      return { ...state, sms: { message: action.payload } };

    case "UPDATE_WHATSAPP":
      return { ...state, whatsapp: { message: action.payload } };

    case "UPDATE_EMAIL_SUBJECT":
      return { ...state, email: { ...state.email, subject: action.payload } };

    case "UPDATE_EMAIL_MESSAGE":
      return { ...state, email: { ...state.email, message: action.payload } };

    case "NEXT_STEP":
      return { ...state, stepIndex: state.stepIndex + 1 };

    case "PREV_STEP":
      return { ...state, stepIndex: state.stepIndex - 1 };

    case "SUBMIT_REQUEST":
      return { ...state, sending: true, error: null };

    case "SUBMIT_SUCCESS":
      return { ...state, sending: false, submitted: true };

    case "SUBMIT_ERROR":
      return { ...state, sending: false, error: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}
