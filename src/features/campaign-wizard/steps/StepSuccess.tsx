import { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Box,
  Button,
  Paper,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { WizardState } from "../types";

type Props = {
  state: WizardState;
  onRestart: () => void;
};

export default function StepSuccess({ state, onRestart }: Props) {
  useEffect(() => {
    // “Celebración” al montar el componente (cuando entras a Success)
    const duration = 1200;
    const end = Date.now() + duration;

    const frame = () => {
      // Disparo desde dos lados
      confetti({
        particleCount: 4,
        spread: 70,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.2 },
      });
      confetti({
        particleCount: 4,
        spread: 70,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.2 },
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();

    // “boom” final
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 90,
        startVelocity: 45,
        origin: { x: 0.5, y: 0.25 },
      });
    }, 250);
  }, []);

  return (
    <Paper
      elevation={10}
      sx={{
        width: 820,
        maxWidth: "100%",
        p: 4,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.97)",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
        <CheckCircleIcon fontSize="large" color="success" />
        <Box>
          <Typography variant="h5" fontWeight={600}>
            Campaña creada correctamente
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Revisa el contenido enviado por canal o crea una nueva campaña.
          </Typography>
        </Box>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: "wrap" }}>
        <Chip label={`Plantilla: ${state.template ?? "-"}`} />
        {state.channels.map((c) => (
          <Chip key={c} label={c.toUpperCase()} />
        ))}
      </Stack>

      {state.channels.includes("sms") && (
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>SMS</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography whiteSpace="pre-line">{state.sms.message}</Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {state.channels.includes("email") && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Correo electrónico</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2">Asunto</Typography>
            <Typography sx={{ mb: 2 }}>{state.email.subject}</Typography>

            <Typography variant="subtitle2">Mensaje</Typography>
            <Typography whiteSpace="pre-line">{state.email.message}</Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {state.channels.includes("whatsapp") && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>WhatsApp</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography whiteSpace="pre-line">{state.whatsapp.message}</Typography>
          </AccordionDetails>
        </Accordion>
      )}

      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Button variant="contained" size="large" onClick={onRestart}>
          Crear otra campaña
        </Button>
      </Stack>
    </Paper>
  );
}
