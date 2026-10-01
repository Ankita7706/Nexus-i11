import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import registerRoutes from "./routes/register.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.ALLOWED_ORIGIN ||
  "http://localhost:5173,http://localhost:3000"
)
  .split(",")
  .map((o) => o.trim());

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
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
app.use(["/api/admin", "/admin"], adminRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Hack for Good API running on port ${PORT}`);
});