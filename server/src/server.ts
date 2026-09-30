import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import registerRoutes from "./routes/register.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const ALLOWED_ORIGIN =
  process.env.ALLOWED_ORIGIN ||
  "http://localhost:3000";

app.use(helmet());

app.use(
  cors({
    origin: ALLOWED_ORIGIN,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hack for Good API is running",
  });
});

app.use("/api/register", registerRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Hack for Good API running on port ${PORT}`);
});