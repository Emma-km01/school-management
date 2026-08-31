import {
    ajouterGrades,
    modifierGrades,
    supprimerGrades,
    listerGrades,
    calculerGrades
} from "../services/servicesGrades.js";

export async function getGrades(req, res) {
    const grades = await listerGrades();
    res.json(grades);
}

export async function createGrade(req, res) {
    const { student_id, subject_id, note } = req.body;

    const result = await ajouterGrades(student_id, subject_id, note);

    if (!result) {
        return res.status(400).json({ message: "Note invalide. La note doit être comprise entre 0 et 20." });
    }

    res.status(201).json({
        message: "Note ajoutée",
        id: result.lastInsertRowid
    });
}

export async function updateGrade(req, res) {
    const id = req.params.id;
    const data = req.body;

    const result = await modifierGrades(id, data);

    if (!result) {
        return res.status(400).json({ message: "Note invalide. La note doit être comprise entre 0 et 20." });
    }

    res.json({ message: "Note modifiée" });
}

export async function deleteGrade(req, res) {
    const id = req.params.id;

    await supprimerGrades(id);

    res.json({ message: "Note supprimée" });
}

export async function getGradeAverage(req, res) {
    const { student_id, subject_id } = req.params;

    const resultat = await calculerGrades(student_id, subject_id);

    res.json(resultat);
}