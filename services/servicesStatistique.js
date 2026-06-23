import db from "../db/database.js";

// 1. Moyenne générale d'un étudiant
function moyenneEtudiant(student_id) {
    return db.prepare(`
        SELECT AVG(note) AS moyenne
        FROM grades
        WHERE student_id = ?
    `).get(student_id);
}

// 2. Moyenne par matière pour un étudiant
function moyenneParMatiere(student_id) {
    return db.prepare(`
        SELECT subjects.nom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE grades.student_id = ?
        GROUP BY grades.subject_id
    `).all(student_id);
}

// 3. Nombre d'absences d'un étudiant
function compterAbsencesEtudiant(student_id) {
    return db.prepare(`
        SELECT COUNT(*) AS total_absences
        FROM absences
        WHERE student_id = ?
    `).get(student_id);
}

// 4. Classement des étudiants par moyenne
function classementEtudiants() {
    return db.prepare(`
        SELECT students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        GROUP BY grades.student_id
        ORDER BY moyenne DESC
    `).all();
}

// 5. Statistiques globales (nb étudiants, enseignants, matières)
function statsGlobales() {
    const nbEtudiants = db.prepare(`SELECT COUNT(*) AS total FROM students`).get();
    const nbEnseignants = db.prepare(`SELECT COUNT(*) AS total FROM teachers`).get();
    const nbMatieres = db.prepare(`SELECT COUNT(*) AS total FROM subjects`).get();

    return {
        etudiants: nbEtudiants.total,
        enseignants: nbEnseignants.total,
        matieres: nbMatieres.total
    };
}

export { moyenneEtudiant, moyenneParMatiere, compterAbsencesEtudiant, classementEtudiants, statsGlobales };