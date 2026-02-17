import { useMemo, useReducer, useCallback } from "react";
import { Box, Button, Paper, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { initialState, wizardReducer } from "./reducer";
import StepTemplate from "./steps/StepTemplate";
import StepChannels from "./steps/StepChannels";
import StepSms from "./steps/StepSms";
import StepEmail from "./steps/StepEmail";
import StepWhatsapp from "./steps/StepWhatsapp";
import StepReview from "./steps/StepReview";

export default function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const dynamicSteps = useMemo(() => {
    const baseSteps = ["Plantilla", "Canales"] as const;

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
      return state.email.subject.trim() !== "" && state.email.message.trim() !== "";
    if (currentStep === "Whatsapp") return state.whatsapp.message.trim() !== "";

    return true;
  }, [currentStep, state]);

  const onBack = useCallback(() => {
    dispatch({ type: "PREV_STEP" });
  }, []);

  const onNext = useCallback(() => {
    if (currentStep === "Resumen") {
      dispatch({ type: "SUBMIT" });
      return;
    }
    dispatch({ type: "NEXT_STEP" });
  }, [currentStep]);

  if (state.submitted) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="h5" gutterBottom>
         Campaña creada correctamente
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: 720, maxWidth: "100%", p: 3, borderRadius: 3 }}>
        <Stepper activeStep={state.stepIndex} sx={{ mb: 3 }}>
          {dynamicSteps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {currentStep === "Plantilla" && (
          <StepTemplate
            value={state.template}
            onChange={(v) => dispatch({ type: "SET_TEMPLATE", payload: v })}
          />
        )}

        {currentStep === "Canales" && (
          <StepChannels
            selected={state.channels}
            onToggle={(c) => dispatch({ type: "TOGGLE_CHANNEL", payload: c })}
          />
        )}

        {currentStep === "Sms" && (
          <StepSms
            value={state.sms.message}
            onChange={(v) => dispatch({ type: "UPDATE_SMS", payload: v })}
          />
        )}

        {currentStep === "Correo electrónico" && (
          <StepEmail
            subject={state.email.subject}
            message={state.email.message}
            onChangeSubject={(v) => dispatch({ type: "UPDATE_EMAIL_SUBJECT", payload: v })}
            onChangeMessage={(v) => dispatch({ type: "UPDATE_EMAIL_MESSAGE", payload: v })}
          />
        )}

        {currentStep === "Whatsapp" && (
          <StepWhatsapp
            value={state.whatsapp.message}
            onChange={(v) => dispatch({ type: "UPDATE_WHATSAPP", payload: v })}
          />
        )}

        {currentStep === "Resumen" && <StepReview state={state} />}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button variant="outlined" disabled={state.stepIndex === 0} onClick={onBack}>
            Atrás
          </Button>

          <Button variant="contained" disabled={!canNext} onClick={onNext}>
            {currentStep === "Resumen" ? "Finalizar" : "Siguiente"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
