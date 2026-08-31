import {
    listerTeachers,
    rechercherTeachers,
    ajouterTeachers,
    modifierTeachers,
    supprimerTeachers
} from "../services/servicesTeachers.js";

export async function getTeachers(req, res) {
    const teachers = await listerTeachers();
    res.json(teachers);
}

export async function getTeacher(req, res) {
    const id = req.params.id;
    const teacher = await rechercherTeachers(id);
    res.json(teacher);
}

export async function createTeacher(req, res) {
    const { nom, matiere, user_id } = req.body;
    const teacher = await ajouterTeachers(nom, matiere, user_id);
    res.json(teacher);
}

export async function updateTeacher(req, res) {
    const id = req.params.id;
    const { nom, matiere } = req.body;
    const data = { nom, matiere };

    const teacher = await modifierTeachers(id, data);
    res.json(teacher);
}

export async function deleteTeacher(req, res) {
    const id = req.params.id;
    const teacher = await supprimerTeachers(id);
    res.json(teacher);
}