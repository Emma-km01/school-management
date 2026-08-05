import express from "express";

const router = express.Router();

//lister tous les utilisateurs
router.get("/", (req, res) => {
    res.send("Liste des utilisateurs");
});

//recuperer un utilisateur
router.get("/:id",(req, res) => {
    res.send(`Utilisateur ${req.params.id}`);
});

//ajouter un utilisateur
router.post("/", (req, res) => {
    res.send("Utilisateur ajouté");
});

//modifier un utilisateur
router.put("/:id", (req, res) => {
    res.send(`Utilisateur ${req.params.id} modifié`);
});

//supprimer un utilisateur
router.delete("/:id", (req, res) => {
    res.send(`Utilisateur ${req.params.id} supprimé`);
});


export default router
