import {
    listerTeachers,
    rechercherTeachers,
    ajouterTeachers,
    modifierTeachers,
    supprimerTeachers
} from "../services/servicesTeachers.js";

export function getTeachers(req, res) {
    const teachers = listerTeachers();
    res.json(teachers);
}

export function getTeacher(req, res) {
    const id = req.params.id;
    const teacher = rechercherTeachers(id);
    res.json(teacher);
}

export function createTeacher(req, res) {
    const { nom, matiere, user_id } = req.body;

    const teacher = ajouterTeachers(nom, matiere, user_id);

    res.json(teacher);
}

export function updateTeacher(req, res) {
    const id = req.params.id;

    const { nom, matiere } = req.body;

    const data = {
        nom,
        matiere
    };

    const teacher = modifierTeachers(id, data);

    res.json(teacher);
}

export function deleteTeacher(req, res) {
    const id = req.params.id;

    const teacher = supprimerTeachers(id);

    res.json(teacher);
}