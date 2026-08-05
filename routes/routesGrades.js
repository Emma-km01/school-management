import express from "express";

const router = express.Router();

//lister les notes 
router.get("/", (req, res) => {
    res.send("Liste des notes");
});

//lire une note
router.get("/:id",(req, res) => {
    res.send(`Note ${req.params.id}`);
});

//ajouter une note
router.post("/", (req, res) => {
    res.send("Note ajoutée");
});

//modifier une note
router.put("/:id", (req, res) => {
    res.send(`Note ${req.params.id} modifiée`);
});

//supprimer une note
router.delete("/:id", (req, res) => {
    res.send(`Note ${req.params.id} supprimée`);
});


export default router
