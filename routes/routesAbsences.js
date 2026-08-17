import express from "express";

import {
    getAbsences,
    getRawAbsences,
    getStudentAbsences,
    createAbsence,
    updateAbsence,
    deleteAbsence
} from "../controller/controllerAbsences.js";

const router = express.Router();

// Toutes les absences avec nom et prénom
router.get("/", getAbsences);

// Toutes les absences brutes
router.get("/raw", getRawAbsences);

// Absences d'un étudiant
router.get("/student/:student_id", getStudentAbsences);

// Enregistrer une absence
router.post("/", createAbsence);

// Modifier une absence
router.put("/:id", updateAbsence);

// Supprimer une absence
router.delete("/:id", deleteAbsence);

export default router;