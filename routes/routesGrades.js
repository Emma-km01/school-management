import express from "express";

import {
    getGrades,
    createGrade,
    updateGrade,
    deleteGrade,
    getGradeAverage
} from "../controller/controllerGrades.js";

const router = express.Router();

// Lister toutes les notes
router.get("/", getGrades);

// Calculer la moyenne d'un étudiant dans une matière
router.get("/average/:student_id/:subject_id", getGradeAverage);

// Ajouter une note
router.post("/", createGrade);

// Modifier une note
router.put("/:id", updateGrade);

// Supprimer une note
router.delete("/:id", deleteGrade);

export default router;