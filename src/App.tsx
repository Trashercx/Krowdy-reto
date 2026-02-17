import { Box } from "@mui/material";
import Wizard from "./features/campaign-wizard/Wizard";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e1e2f 0%, #2b2b45 100%)",
      }}
    >
      <Wizard />
    </Box>
  );
}
