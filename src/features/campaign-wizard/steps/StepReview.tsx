import { Typography, Divider, Box } from "@mui/material";
import type { WizardState } from "../types";

type Props = {
  state: WizardState;
};

export default function StepReview({ state }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Resumen
      </Typography>

      <Typography><strong>Plantilla:</strong> {state.template}</Typography>
      <Typography><strong>Canales:</strong> {state.channels.join(", ")}</Typography>

      <Divider sx={{ my: 2 }} />

      {state.channels.includes("sms") && (
        <Box mb={2}>
          <Typography variant="subtitle1">SMS</Typography>
          <Typography>{state.sms.message}</Typography>
        </Box>
      )}

      {state.channels.includes("email") && (
        <Box mb={2}>
          <Typography variant="subtitle1">Correo electrónico</Typography>
          <Typography><strong>Asunto:</strong> {state.email.subject}</Typography>
          <Typography>{state.email.message}</Typography>
        </Box>
      )}

      {state.channels.includes("whatsapp") && (
        <Box mb={2}>
          <Typography variant="subtitle1">Whatsapp</Typography>
          <Typography>{state.whatsapp.message}</Typography>
        </Box>
      )}
    </div>
  );
}
