import {
    listerStudents,
    rechercherStudents,
    ajouterStudents,
    modifierStudents,
    supprimerStudents
} from "../services/servicesStudents.js";

export async function getStudents(req, res) {
    const students = await listerStudents();
    res.json(students);
}

export async function getStudent(req, res) {
    const id = req.params.id;
    const student = await rechercherStudents(id);
    res.json(student);
}

export async function createStudent(req, res) {
    const { matricule, nom, prenom, age, classe, user_id } = req.body;
    const student = await ajouterStudents(matricule, nom, prenom, age, classe, user_id);
    res.json(student);
}

export async function updateStudent(req, res) {
    const id = req.params.id;
    const { matricule, nom, prenom, age, classe } = req.body;
    const data = { matricule, nom, prenom, age, classe };

    const student = await modifierStudents(id, data);
    res.json(student);
}

export async function deleteStudent(req, res) {
    const id = req.params.id;
    const student = await supprimerStudents(id);
    res.json(student);
}