import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import prejobsRoutes from "./routes/prejob.js";
//us: matteopuccifx
//pw: 50REpyChDrcAi1L1

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/prejobs", prejobsRoutes);

const CONNECTION_URL =
  "mongodb+srv://matteopuccifx:50REpyChDrcAi1L1@hseq-test.pt00ei7.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5002;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log("Server is running on ", PORT))
  )
  .catch((err) => console.log(err));
