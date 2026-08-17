import {
    enregistrerAbsences,
    modifierAbsences,
    afficherAbsences,
    consulterAbsences,
    supprimerAbsences,
    absencesParEtudiant
} from "../services/servicesAbsences.js";

// Afficher toutes les absences avec nom et prénom
export function getAbsences(req, res) {
    const absences = afficherAbsences();
    res.json(absences);
}

// Modifier une absence
export function updateAbsence(req, res) {
    const id = req.params.id;
    const data = req.body;

    modifierAbsences(id, data);

    res.json({
        message: "Absence modifiée"
    });
}

// Consulter toutes les absences brutes
export function getRawAbsences(req, res) {
    const absences = consulterAbsences();
    res.json(absences);
}

// Consulter les absences d'un étudiant
export function getStudentAbsences(req, res) {
    const student_id = req.params.student_id;

    const absences = absencesParEtudiant(student_id);

    res.json(absences);
}

// Enregistrer une absence
export function createAbsence(req, res) {
    const { student_id, date, status } = req.body;

    const result = enregistrerAbsences(
        student_id,
        date,
        status
    );

    res.status(201).json({
        message: "Absence enregistrée",
        id: result.lastInsertRowid
    });
}

// Supprimer une absence
export function deleteAbsence(req, res) {
    const id = req.params.id;

    supprimerAbsences(id);

    res.json({
        message: "Absence supprimée"
    });
}