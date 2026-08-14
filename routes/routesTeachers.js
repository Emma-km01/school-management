import express from "express";
import { getTeacher, getTeachers, createTeacher,  updateTeacher, deleteTeacher } from "../controller/controllerTeachers.js";

const router = express.Router();

//lister les professeurs
router.get("/", getTeachers);

//lire un professeur
router.get("/:id",getTeacher);

//ajouter un professeur
router.post("/", createTeacher);

//modifier un professeur
router.put("/:id", updateTeacher);

//supprimer un professeur
router.delete("/:id", deleteTeacher);


export default router
