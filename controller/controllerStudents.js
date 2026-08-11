import { listerStudents, rechercherStudents } from "../services/servicesStudents.js";

export function getStudents(req, res) {
    const students = listerStudents();

    res.json(students);
}

export function getStudent(req, res) {
    const id = req.params.id;

    const student = rechercherStudents(id);

    res.json(student);
}