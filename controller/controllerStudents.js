import { listerStudents, rechercherStudents, ajouterStudents } from "../services/servicesStudents.js";

export function getStudents(req, res) {
    const students = listerStudents();

    res.json(students);
}

export function getStudent(req, res) {
    const id = req.params.id;

    const student = rechercherStudents(id);

    res.json(student);
}

export function createStudent(rep, res){
    const {matricule, nom, prenom, age, classe, user_id } = req.body;

    const student = ajouterStudents(matricule, nom, prenom, age, classe, user_id);

    res.json(student);
}