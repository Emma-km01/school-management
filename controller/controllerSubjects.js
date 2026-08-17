import {
    ajouterSubjects,
    affecterSubjects,
    modifierSubjects,
    supprimerSubjects,
    listerSubjects,
    rechercherSubjects
} from "../services/servicesSubjects.js";

// Lister toutes les matières
export function getSubjects(req, res) {
    const subjects = listerSubjects();
    res.json(subjects);
}

// Récupérer une matière
export function getSubject(req, res) {
    const id = req.params.id;
    const subject = rechercherSubjects(id);

    if (!subject) {
        return res.status(404).json({
            message: "Matière introuvable"
        });
    }

    res.json(subject);
}

// Ajouter une matière
export function createSubject(req, res) {
    const { nom, teacher_id } = req.body;

    const result = ajouterSubjects(nom, teacher_id);

    res.status(201).json({
        message: "Matière ajoutée",
        id: result.lastInsertRowid
    });
}

// Affecter une matière à un professeur
export function assignSubject(req, res) {
    const subjectId = req.params.id;
    const { teacher_id } = req.body;

    affecterSubjects(subjectId, teacher_id);

    res.json({
        message: "Professeur affecté à la matière"
    });
}

// Modifier une matière
export function updateSubject(req, res) {
    const id = req.params.id;
    const { nom, teacher_id } = req.body;

    modifierSubjects(id, nom, teacher_id);

    res.json({
        message: "Matière modifiée"
    });
}

// Supprimer une matière
export function deleteSubject(req, res) {
    const id = req.params.id;

    supprimerSubjects(id);

    res.json({
        message: "Matière supprimée"
    });
}