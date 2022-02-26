import express from "express";
import cors from "cors";
import recipes from "./routes/recipes.route.js";
import auth from "./routes/auth.route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/recipes", recipes);
app.use("/api/v1/user", auth);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
