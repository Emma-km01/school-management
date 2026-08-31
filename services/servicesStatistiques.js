import db from "../db/database.js";

async function moyenneEtudiant(student_id) {
    const stmt = await db.prepare(`SELECT AVG(note) AS moyenne FROM grades WHERE student_id = ?`);
    return await stmt.get([student_id]);
}

async function moyenneGenerale() {
    const stmt = await db.prepare(`SELECT AVG(note) AS moyenne FROM grades`);
    return await stmt.get([]);
}

async function moyenneParMatiere(student_id) {
    const stmt = await db.prepare(`
        SELECT subjects.nom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN subjects ON grades.subject_id = subjects.id
        WHERE grades.student_id = ?
        GROUP BY grades.subject_id
    `);
    return await stmt.all([student_id]);
}

async function compterAbsencesEtudiant(student_id) {
    const stmt = await db.prepare(`SELECT COUNT(*) AS total_absences FROM absences WHERE student_id = ?`);
    return await stmt.get([student_id]);
}

async function classementEtudiants() {
    const stmt = await db.prepare(`
        SELECT students.nom, students.prenom, AVG(grades.note) AS moyenne
        FROM grades
        JOIN students ON grades.student_id = students.id
        GROUP BY grades.student_id
        ORDER BY moyenne DESC
    `);
    return await stmt.all([]);
}

async function statsGlobales() {
    const stmtEtudiants = await db.prepare(`SELECT COUNT(*) AS total FROM students`);
    const nbEtudiants = await stmtEtudiants.get();

    const stmtEnseignants = await db.prepare(`SELECT COUNT(*) AS total FROM teachers`);
    const nbEnseignants = await stmtEnseignants.get();

    const stmtMatieres = await db.prepare(`SELECT COUNT(*) AS total FROM subjects`);
    const nbMatieres = await stmtMatieres.get();

    return {
        etudiants: nbEtudiants.total,
        enseignants: nbEnseignants.total,
        matieres: nbMatieres.total
    };
}

export { moyenneEtudiant, moyenneGenerale, moyenneParMatiere, compterAbsencesEtudiant, classementEtudiants, statsGlobales };