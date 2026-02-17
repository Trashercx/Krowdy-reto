import { useMemo, useReducer, useCallback, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
} from "@mui/material";
import { initialState, wizardReducer } from "./reducer";
import StepTemplate from "./steps/StepTemplate";
import StepChannels from "./steps/StepChannels";
import StepSms from "./steps/StepSms";
import StepEmail from "./steps/StepEmail";
import StepWhatsapp from "./steps/StepWhatsapp";
import StepReview from "./steps/StepReview";
import StepSuccess from "./steps/StepSuccess";

export default function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const dynamicSteps = useMemo(() => {
    const baseSteps = ["Plantilla", "Canales"];

    const channelSteps = state.channels.map((c) => {
      if (c === "sms") return "Sms";
      if (c === "email") return "Correo electrónico";
      if (c === "whatsapp") return "Whatsapp";
      return "";
    });

    return [...baseSteps, ...channelSteps, "Resumen"];
  }, [state.channels]);

  const currentStep = dynamicSteps[state.stepIndex];

  const canNext = useMemo(() => {
    if (currentStep === "Plantilla") return state.template !== null;
    if (currentStep === "Canales") return state.channels.length > 0;
    if (currentStep === "Sms") return state.sms.message.trim() !== "";
    if (currentStep === "Correo electrónico")
      return (
        state.email.subject.trim() !== "" &&
        state.email.message.trim() !== ""
      );
    if (currentStep === "Whatsapp")
      return state.whatsapp.message.trim() !== "";

    return true;
  }, [currentStep, state]);

  const onBack = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
  }, []);

  const onNext = useCallback(() => {
    if (currentStep === "Resumen") {
      setConfirmOpen(true);
      return;
    }
    dispatch({ type: "NEXT_STEP" });
  }, [currentStep]);

  const onConfirmSubmit = useCallback(() => {
    setConfirmOpen(false);
    dispatch({ type: "SUBMIT_REQUEST" });

    setTimeout(() => {
      dispatch({ type: "SUBMIT_SUCCESS" });
    }, 900);
  }, []);

  if (state.submitted) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 3,
          background: "linear-gradient(135deg, #1e1e2f 0%, #2b2b45 100%)",
        }}
      >
        <StepSuccess
          state={state}
          onRestart={() => dispatch({ type: "RESET" })}
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        background: "linear-gradient(135deg, #1e1e2f 0%, #2b2b45 100%)",
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 720,
          maxWidth: "100%",
          p: 4,
          borderRadius: 4,
          backgroundColor: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Stepper activeStep={state.stepIndex} sx={{ mb: 3 }}>
          {dynamicSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {state.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {state.error}
          </Alert>
        )}

        {currentStep === "Plantilla" && (
          <StepTemplate
            value={state.template}
            onChange={(v) =>
              dispatch({ type: "SET_TEMPLATE", payload: v })
            }
          />
        )}

        {currentStep === "Canales" && (
          <StepChannels
            selected={state.channels}
            onToggle={(c) =>
              dispatch({ type: "TOGGLE_CHANNEL", payload: c })
            }
          />
        )}

        {currentStep === "Sms" && (
          <StepSms
            value={state.sms.message}
            onChange={(v) =>
              dispatch({ type: "UPDATE_SMS", payload: v })
            }
          />
        )}

        {currentStep === "Correo electrónico" && (
          <StepEmail
            subject={state.email.subject}
            message={state.email.message}
            onChangeSubject={(v) =>
              dispatch({ type: "UPDATE_EMAIL_SUBJECT", payload: v })
            }
            onChangeMessage={(v) =>
              dispatch({ type: "UPDATE_EMAIL_MESSAGE", payload: v })
            }
          />
        )}

        {currentStep === "Whatsapp" && (
          <StepWhatsapp
            value={state.whatsapp.message}
            onChange={(v) =>
              dispatch({ type: "UPDATE_WHATSAPP", payload: v })
            }
          />
        )}

        {currentStep === "Resumen" && (
          <StepReview state={state} />
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            disabled={state.stepIndex === 0}
            onClick={onBack}
          >
            Atrás
          </Button>

          <Button
            variant="contained"
            disabled={!canNext || state.sending}
            onClick={onNext}
          >
            {state.sending ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={18} />
                Enviando...
              </Box>
            ) : currentStep === "Resumen" ? (
              "Finalizar"
            ) : (
              "Siguiente"
            )}
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Confirmar envío</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Se creará la campaña con:
          </Typography>

          <Typography>
            <strong>Plantilla:</strong> {state.template}
          </Typography>

          <Typography>
            <strong>Canales:</strong> {state.channels.join(", ")}
          </Typography>

          <Typography sx={{ mt: 2 }}>
            ¿Deseas continuar?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => setConfirmOpen(false)}
            variant="outlined"
          >
            Cancelar
          </Button>

          <Button
            onClick={onConfirmSubmit}
            variant="contained"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
