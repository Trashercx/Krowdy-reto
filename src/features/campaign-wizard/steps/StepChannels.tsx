import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import type { Channel } from "../types";

type Props = {
  selected: Channel[];
  onToggle: (c: Channel) => void;
};

export default function StepChannels({ selected, onToggle }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Selección de Canales
      </Typography>

      <FormControlLabel
        control={<Checkbox checked={selected.includes("sms")} onChange={() => onToggle("sms")} />}
        label="Sms"
      />
      <FormControlLabel
        control={<Checkbox checked={selected.includes("email")} onChange={() => onToggle("email")} />}
        label="Correo electrónico"
      />
      <FormControlLabel
        control={<Checkbox checked={selected.includes("whatsapp")} onChange={() => onToggle("whatsapp")} />}
        label="Whatsapp"
      />
    </div>
  );
}
