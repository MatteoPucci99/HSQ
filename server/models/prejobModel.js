import mongoose from "mongoose";

//Creazione dello schema per il prejob
const prejobSchema = new mongoose.Schema({
  company: String,
  site: String,
  time: Date,
  info: String,
  safety: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String,
  },
  activities: {
    1: String,
    2: String,
    3: String,
    4: String,
  },
  env: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
    6: String,
    7: String,
    8: String,
    9: String,
  },
  method: {
    1: String,
    2: String,
    3: String,
  },
  dpiDpcCheck: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
  },
  note: String,
  inCharge: String,
  signature: String,
  workers: [String],
});

const Prejob = mongoose.model("Session", prejobSchema);

export default Prejob;
