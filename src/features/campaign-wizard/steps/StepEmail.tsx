import { TextField, Typography, Stack } from "@mui/material";

type Props = {
  subject: string;
  message: string;
  onChangeSubject: (v: string) => void;
  onChangeMessage: (v: string) => void;
};

export default function StepEmail({ subject, message, onChangeSubject, onChangeMessage }: Props) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Correo electrónico
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          label="Asunto"
          value={subject}
          onChange={(e) => onChangeSubject(e.target.value)}
        />

        <TextField
          fullWidth
          multiline
          rows={6}
          label="Mensaje"
          value={message}
          onChange={(e) => onChangeMessage(e.target.value)}
        />
      </Stack>
    </div>
  );
}
