import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import { config } from "./config";
// ... other imports ...

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: config.corsOrigins,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!!!!!! ");
});
// ... other routes and middleware ...

export default app;
