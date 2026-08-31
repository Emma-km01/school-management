import {
    enregistrerAbsences,
    modifierAbsences,
    afficherAbsences,
    consulterAbsences,
    supprimerAbsences,
    absencesParEtudiant
} from "../services/servicesAbsences.js";

export async function getAbsences(req, res) {
    const absences = await afficherAbsences();
    res.json(absences);
}

export async function updateAbsence(req, res) {
    const id = req.params.id;
    const data = req.body;

    await modifierAbsences(id, data);

    res.json({ message: "Absence modifiée" });
}

export async function getRawAbsences(req, res) {
    const absences = await consulterAbsences();
    res.json(absences);
}

export async function getStudentAbsences(req, res) {
    const student_id = req.params.student_id;
    const absences = await absencesParEtudiant(student_id);
    res.json(absences);
}

export async function createAbsence(req, res) {
    const { student_id, date, status } = req.body;

    const result = await enregistrerAbsences(student_id, date, status);

    res.status(201).json({
        message: "Absence enregistrée",
        id: result.lastInsertRowid
    });
}

export async function deleteAbsence(req, res) {
    const id = req.params.id;

    await supprimerAbsences(id);

    res.json({ message: "Absence supprimée" });
}