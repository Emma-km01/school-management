import {
    ajouterSubjects,
    affecterSubjects,
    modifierSubjects,
    supprimerSubjects,
    listerSubjects,
    rechercherSubjects
} from "../services/servicesSubjects.js";

// Lister toutes les matières
export async function getSubjects(req, res) {
    const subjects = await listerSubjects();
    res.json(subjects);
}

// Récupérer une matière
export async function getSubject(req, res) {
    const id = req.params.id;
    const subject = await rechercherSubjects(id);

    if (!subject) {
        return res.status(404).json({
            message: "Matière introuvable"
        });
    }

    res.json(subject);
}

// Ajouter une matière
export async function createSubject(req, res) {
    const { nom, teacher_id } = req.body;

    const result = await ajouterSubjects(nom, teacher_id);

    res.status(201).json({
        message: "Matière ajoutée",
        id: result.lastInsertRowid
    });
}

// Affecter une matière à un professeur
export async function assignSubject(req, res) {
    const subjectId = req.params.id;
    const { teacher_id } = req.body;

    await affecterSubjects(subjectId, teacher_id);

    res.json({
        message: "Professeur affecté à la matière"
    });
}

// Modifier une matière
export async function updateSubject(req, res) {
    const id = req.params.id;
    const { nom, teacher_id } = req.body;

    await modifierSubjects(id, nom, teacher_id);

    res.json({
        message: "Matière modifiée"
    });
}

// Supprimer une matière
export async function deleteSubject(req, res) {
    const id = req.params.id;

    await supprimerSubjects(id);

    res.json({
        message: "Matière supprimée"
    });
}