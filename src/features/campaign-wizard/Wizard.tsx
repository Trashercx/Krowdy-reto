import { useMemo, useReducer } from "react";
import { Box, Button, Paper, Step, StepLabel, Stepper } from "@mui/material";
import { initialState, wizardReducer } from "./reducer";
import StepTemplate from "./steps/StepTemplate";
import StepChannels from "./steps/StepChannels";

export default function Wizard() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  const steps = ["Plantilla", "Canales"]; // por ahora solo 2

  const canNext = useMemo(() => {
    if (state.stepIndex === 0) return state.template !== null;
    if (state.stepIndex === 1) return state.channels.length > 0;
    return true;
  }, [state.stepIndex, state.template, state.channels.length]);

  const onNext = () => dispatch({ type: "NEXT_STEP" });
  const onBack = () => dispatch({ type: "PREV_STEP" });

  return (
    <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ width: 720, maxWidth: "100%", p: 3, borderRadius: 3 }}>
        <Stepper activeStep={state.stepIndex} sx={{ mb: 3 }}>
          {steps.map((label) => (
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
            disabled={!canNext || state.stepIndex === steps.length - 1}
            onClick={onNext}
          >
            Siguiente
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
