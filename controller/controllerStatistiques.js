import {
    moyenneEtudiant,
    moyenneParMatiere,
    moyenneGenerale,
    compterAbsencesEtudiant,
    classementEtudiants,
    statsGlobales
} from "../services/servicesStatistiques.js";

// Statistiques globales
export function getStatistiques(req, res) {
    const stats = statsGlobales();

    res.json(stats);
}

// Meilleur étudiant
export function getMeilleurEtudiant(req, res) {
    const classement = classementEtudiants();

    if (classement.length === 0) {
        return res.status(404).json({
            message: "Aucun étudiant n'a encore de note"
        });
    }

    res.json(classement[0]);
}

// Classement complet des étudiants
export function getClassementEtudiants(req, res) {
    const classement = classementEtudiants();

    res.json(classement);
}

// Moyenne générale de tous les étudiants
export function getMoyenneGenerale(req, res) {
    const moyenne = moyenneGenerale();

    res.json(moyenne);
}

// Moyenne d'un étudiant
export function getMoyenneEtudiant(req, res) {
    const student_id = req.params.student_id;

    const moyenne = moyenneEtudiant(student_id);

    res.json(moyenne);
}

// Moyenne par matière pour un étudiant
export function getMoyennesParMatiere(req, res) {
    const student_id = req.params.student_id;

    const moyennes = moyenneParMatiere(student_id);

    res.json(moyennes);
}

// Nombre d'absences d'un étudiant
export function getAbsencesEtudiant(req, res) {
    const student_id = req.params.student_id;

    const absences = compterAbsencesEtudiant(student_id);

    res.json(absences);
}