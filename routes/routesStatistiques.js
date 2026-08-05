import express from "express";

const router = express.Router();

// Identifier le meilleur étudiant
router.get("/best-student", (req, res) => {
    res.send("Meilleur étudiant selon la moyenne");
});

// Calculer la moyenne générale
router.get("/average", (req, res) => {
    res.send("Moyenne générale des étudiants");
});

// Compter les absences
router.get("/absences", (req, res) => {
    res.send("Nombre total d'absences");
});

export default router;