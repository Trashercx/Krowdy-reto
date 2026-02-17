import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import type { TemplateId } from "../types";

type Props = {
  value: TemplateId | null;
  onChange: (v: TemplateId) => void;
};

export default function StepTemplate({ value, onChange }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Selección de Plantilla
      </Typography>

      <RadioGroup
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value as TemplateId)}
      >
        <FormControlLabel value="invitation" control={<Radio />} label="Invitación" />
        <FormControlLabel value="reminder" control={<Radio />} label="Recordatorio" />
        <FormControlLabel value="custom" control={<Radio />} label="Personalizado" />
      </RadioGroup>
    </div>
  );
}
