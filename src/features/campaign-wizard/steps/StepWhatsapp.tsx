import { TextField, Typography } from "@mui/material";

type Props = { value: string; onChange: (v: string) => void };

export default function StepWhatsapp({ value, onChange }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Whatsapp
      </Typography>

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Mensaje"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
