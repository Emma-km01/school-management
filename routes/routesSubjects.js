import express from "express";

const router = express.Router();

//lister les matieres
router.get("/", (req, res) => {
    res.send("Liste des matières");
});

//recuperer une matiere
router.get("/:id",(req, res) => {
    res.send(`Matière ${req.params.id}`);
});

//ajouter une matiere
router.post("/", (req, res) => {
    res.send("Matière ajoutée");
});

//modifier une matiere
router.put("/:id", (req, res) => {
    res.send(`Matière ${req.params.id} modifiée`);
});

//supprimer une matiere
router.delete("/:id", (req, res) => {
    res.send(`Matière ${req.params.id} supprimée`);
});


export default router
