import express from "express";

import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controller/controllerUsers.js";

const router = express.Router();

// Lister tous les utilisateurs
router.get("/", getUsers);

// Récupérer un utilisateur
router.get("/:id", getUser);

// Ajouter un utilisateur
router.post("/", createUser);

// Modifier un utilisateur
router.put("/:id", updateUser);

// Supprimer un utilisateur
router.delete("/:id", deleteUser);

export default router;