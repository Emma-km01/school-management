import {
    ajouterGrades,
    modifierGrades,
    supprimerGrades,
    listerGrades,
    calculerGrades
} from "../services/servicesGrades.js";

// Lister toutes les notes
export function getGrades(req, res) {
    const grades = listerGrades();
    res.json(grades);
}

// Ajouter une note
export function createGrade(req, res) {
    const { student_id, subject_id, note } = req.body;

    const result = ajouterGrades(student_id, subject_id, note);

    if (!result) {
        return res.status(400).json({
            message: "Note invalide. La note doit être comprise entre 0 et 20."
        });
    }

    res.status(201).json({
        message: "Note ajoutée",
        id: result.lastInsertRowid
    });
}

// Modifier une note
export function updateGrade(req, res) {
    const id = req.params.id;
    const data = req.body;

    const result = modifierGrades(id, data);

    if (!result) {
        return res.status(400).json({
            message: "Note invalide. La note doit être comprise entre 0 et 20."
        });
    }

    res.json({
        message: "Note modifiée"
    });
}

// Supprimer une note
export function deleteGrade(req, res) {
    const id = req.params.id;

    supprimerGrades(id);

    res.json({
        message: "Note supprimée"
    });
}

// Calculer la moyenne d'un étudiant dans une matière
export function getGradeAverage(req, res) {
    const { student_id, subject_id } = req.params;

    const resultat = calculerGrades(student_id, subject_id);

    res.json(resultat);
}