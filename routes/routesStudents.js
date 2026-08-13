import express from "express";
import { getStudents, getStudent, createStudent } from "../controller/controllerStudents.js";
import { ajouterStudents } from "../services/servicesStudents.js";

const router = express.Router();


//lister tout les etudiants
router.get("/", getStudents);

// //lire un etudiant
router.get("/:id",getStudent);

//ajouter un etudiant
router.post("/", createStudent);

// //modifier un etudiant
// router.put("/:id", (req, res) => {
//     res.send(`Étudiant ${req.params.id} modifié`);
// });

// //supprimer un etudiant
// router.delete("/:id", (req, res) => {
//     res.send(`Étudant ${req.params.id} supprimé`);
// });

// //lire un etudiant
// router.get("/:id",(req,res) => {
//     res.send(`Étudiant ${req.params.id}`);
// });

// //ajouter un etudiant
// router.post("/", (req,res) => {
//     res.send("Étudiant ajouté");
// });

// //modifier un etudiant
// router.put("/:id", (req, res) => {
//     res.send(`Étudiant ${req.params.id} modifié`);
// });

// //supprimer un etudiant
// router.delete("/:id", (req, res) => {
//     res.send(`Étudant ${req.params.id} supprimé`);
// });


export default router
