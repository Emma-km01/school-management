import express from "express";
import { getStudents, getStudent, createStudent, updateStudent, deleteStudent } from "../controller/controllerStudents.js";
import { ajouterStudents } from "../services/servicesStudents.js";

const router = express.Router();


//lister tout les etudiants
router.get("/", getStudents);

// //lire un etudiant
router.get("/:id",getStudent);

//ajouter un etudiant
router.post("/", createStudent);

//modifier un etudiant
router.put("/:id", updateStudent);

//supprimer un etudiant
router.delete("/:id", deleteStudent);


export default router
