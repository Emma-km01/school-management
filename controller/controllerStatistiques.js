import {
    moyenneEtudiant,
    moyenneParMatiere,
    moyenneGenerale,
    compterAbsencesEtudiant,
    classementEtudiants,
    statsGlobales
} from "../services/servicesStatistiques.js";

export async function getStatistiques(req, res) {
    const stats = await statsGlobales();
    res.json(stats);
}

export async function getMeilleurEtudiant(req, res) {
    const classement = await classementEtudiants();

    if (classement.length === 0) {
        return res.status(404).json({ message: "Aucun étudiant n'a encore de note" });
    }

    res.json(classement[0]);
}

export async function getClassementEtudiants(req, res) {
    const classement = await classementEtudiants();
    res.json(classement);
}

export async function getMoyenneGenerale(req, res) {
    const moyenne = await moyenneGenerale();
    res.json(moyenne);
}

export async function getMoyenneEtudiant(req, res) {
    const student_id = req.params.student_id;
    const moyenne = await moyenneEtudiant(student_id);
    res.json(moyenne);
}

export async function getMoyennesParMatiere(req, res) {
    const student_id = req.params.student_id;
    const moyennes = await moyenneParMatiere(student_id);
    res.json(moyennes);
}

export async function getAbsencesEtudiant(req, res) {
    const student_id = req.params.student_id;
    const absences = await compterAbsencesEtudiant(student_id);
    res.json(absences);
}