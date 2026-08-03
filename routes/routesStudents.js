import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Liste des étudiants");
});

export default router
