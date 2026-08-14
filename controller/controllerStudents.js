import { listerStudents, rechercherStudents, ajouterStudents, modifierStudents, supprimerStudents } from "../services/servicesStudents.js";

export function getStudents(req, res) {
    const students = listerStudents();

    res.json(students);
}

export function getStudent(req, res) {
    const id = req.params.id;

    const student = rechercherStudents(id);

    res.json(student);
}

export function createStudent(req, res){
    const {matricule, nom, prenom, age, classe, user_id } = req.body;

    const student = ajouterStudents(matricule, nom, prenom, age, classe, user_id);

    res.json(student);
}

export function updateStudent(req, res){
    const id = req.params.id;

    const {matricule, nom, prenom, age, classe, user_id } = req.body;

    const data = {matricule, nom, prenom, age, classe};

    const student = modifierStudents(id, data);

    res.json(student);
}

export function deleteStudent(req, res){
    const id = req.params.id;

    const student = supprimerStudents(id)

    res.json(student)
}