import express from "express";

import {
    getSubjects,
    getSubject,
    createSubject,
    assignSubject,
    updateSubject,
    deleteSubject
} from "../controller/controllerSubjects.js";

const router = express.Router();

// Lister les matières
router.get("/", getSubjects);

// Récupérer une matière
router.get("/:id", getSubject);

// Ajouter une matière
router.post("/", createSubject);

// Affecter un professeur à une matière
router.patch("/:id/teacher", assignSubject);

// Modifier une matière
router.put("/:id", updateSubject);

// Supprimer une matière
router.delete("/:id", deleteSubject);

export default router;