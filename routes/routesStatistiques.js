import express from "express";

import {
    getStatistiques,
    getMeilleurEtudiant,
    getClassementEtudiants,
    getMoyenneGenerale,
    getMoyenneEtudiant,
    getMoyennesParMatiere,
    getAbsencesEtudiant
} from "../controller/controllerStatistiques.js";

const router = express.Router();

// Statistiques globales
router.get("/", getStatistiques);

// Meilleur étudiant
router.get("/meilleur-etudiant", getMeilleurEtudiant);

// Classement des étudiants
router.get("/classement", getClassementEtudiants);

// Moyenne générale
router.get("/moyenne-generale", getMoyenneGenerale);

// Moyenne d'un étudiant
router.get("/moyenne/:student_id", getMoyenneEtudiant);

// Moyennes par matière
router.get("/moyennes-matieres/:student_id", getMoyennesParMatiere);

// Absences d'un étudiant
router.get("/absences/:student_id", getAbsencesEtudiant);

export default router;