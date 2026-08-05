import express from "express";

const router = express.Router();

//lister les absences 
router.get("/", (req, res) => {
    res.send("Liste des absents");
});

//recuperer une absence
router.get("/:id",(req, res) => {
    res.send(`Absence ${req.params.id}`);
});

//ajouter une absence
router.post("/", (req, res) => {
    res.send("Absence ajoutée");
});

//modifier une absence
router.put("/:id", (req, res) => {
    res.send(`Absence ${req.params.id} modifiée`);
});

//supprimer une absence
router.delete("/:id", (req, res) => {
    res.send(`Absence ${req.params.id} supprimée`);
});


export default router
