import express from "express";

const router = express.Router();

//lister les professeurs
router.get("/", (req, res) => {
    res.send("Liste des professeurs");
});

//lire un professeur
router.get("/:id",(req, res) => {
    res.send(`Professeur ${req.params.id}`);
});

//ajouter un professeur
router.post("/", (req, res) => {
    res.send("Professeur ajouté");
});

//modifier un professeur
router.put("/:id", (req, res) => {
    res.send(`Professeur ${req.params.id} modifié`);
});

//supprimer un professeur
router.delete("/:id", (req, res) => {
    res.send(`Professeur ${req.params.id} supprimé`);
});


export default router
