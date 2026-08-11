import express from "express";

const router = express.Router();

//statistiques
router.get("/", (req, res) => {
    res.send("Statistiques : /best-student, /average, /absences");
});

// Identifier le meilleur étudiant
router.get("/meilleur- etudiant", (req, res) => {
    res.send("Meilleur étudiant selon la moyenne");
});

// Calculer la moyenne générale
router.get("/moyenne", (req, res) => {
    res.send("Moyenne générale des étudiants");
});

// Compter les absences
router.get("/absences", (req, res) => {
    res.send("Nombre total d'absences");
});

export default router;