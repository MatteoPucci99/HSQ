import Prejob from "../models/prejobModel.js"; // Importa il modello Prejob

// Funzione del controller per creare un nuovo prejob
export const createPrejob = async (req, res) => {
  try {
    const prejobData = req.body; // Dati del nuovo prejob
    const newPrejob = new Prejob({
      ...prejobData,
      createdBy: req.userId,
      createdAt: new Date().toISOString(), // Supponendo che l'ID dell'utente sia disponibile in req.user._id
    });
    await newPrejob.save();
    res.status(201).json(newPrejob);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Si è verificato un errore durante la creazione del lavoro preliminare",
    });
  }
};

// Funzione del controller per ottenere tutti i prejobs
export const getAllPrejobs = async (req, res) => {
  try {
    const prejobs = await Prejob.find();
    res.status(200).json(prejobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Si è verificato un errore durante il recupero dei lavori preliminari",
    });
  }
};
