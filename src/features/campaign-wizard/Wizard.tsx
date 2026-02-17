import { useMemo, useReducer } from "react";
import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { initialState, wizardReducer } from "./reducer";
import StepTemplate from "./steps/StepTemplate";
import StepChannels from "./steps/StepChannels";
import StepSms from "./steps/StepSms";

export default function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

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

  const canNext = useMemo(() => {
  const step = dynamicSteps[state.stepIndex];

  if (step === "Plantilla") return state.template !== null;
  if (step === "Canales") return state.channels.length > 0;

  if (step === "Sms") return state.sms.message.trim() !== "";
  if (step === "Correo electrónico")
    return (
      state.email.subject.trim() !== "" &&
      state.email.message.trim() !== ""
    );

  if (step === "Whatsapp")
    return state.whatsapp.message.trim() !== "";

  return true;
}, [state, dynamicSteps]);


  const onNext = () => dispatch({ type: "NEXT_STEP" });
  const onBack = () => dispatch({ type: "PREV_STEP" });

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

        {state.stepIndex === 0 && (
          <StepTemplate
            value={state.template}
            onChange={(v) => dispatch({ type: "SET_TEMPLATE", payload: v })}
          />
        )}

        {state.stepIndex === 1 && (
          <StepChannels
            selected={state.channels}
            onToggle={(c) => dispatch({ type: "TOGGLE_CHANNEL", payload: c })}
          />
        )}
        {dynamicSteps[state.stepIndex] === "Sms" && (
            <StepSms
                value={state.sms.message}
                onChange={(v) => dispatch({ type: "UPDATE_SMS", payload: v })}
            />
        )}


        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            disabled={state.stepIndex === 0}
            onClick={onBack}
          >
            Atrás
          </Button>

          <Button
            variant="contained"
            disabled={!canNext || state.stepIndex === dynamicSteps.length - 1}
            onClick={onNext}
          >
            Siguiente
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
