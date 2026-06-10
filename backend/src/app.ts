import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

import collegeRoutes from "./routes/college.routes";
import authRoutes from "./routes/auth.routes";
import savedRoutes from "./routes/saved.routes";
import comparisonRoutes from "./routes/comparison.routes";
import { errorHandler } from "./middleware/error.middleware";

app.use(errorHandler);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "College Discovery Backend Running"
  });
});

app.use("/api/colleges", collegeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/saved", savedRoutes);
app.use("/api/compare", comparisonRoutes);


export default app;