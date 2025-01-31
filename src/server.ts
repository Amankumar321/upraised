import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "./swagger";
import gadgetRoutes from "./routes/gadgetRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
setupSwagger(app);

const PORT = process.env.PORT || 5000;

app.use("/auth", authRoutes);
app.use("/gadgets", gadgetRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
