import db from "../db/database.js";
import Grades from "../models/modelsGrades.js";

async function ajouterGrades(student_id, subject_id, note) {
    if (note < 0 || note > 20) {
        console.log("Note invalide (doit être entre 0 et 20)");
        return null;
    }
    const addGrades = new Grades(student_id, subject_id, note);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO grades(student_id, subject_id, note)
        VALUES (?, ?, ?)
    `);
    return await stmt.run([addGrades.student_id, addGrades.subject_id, addGrades.note]);
}

async function modifierGrades(id, data) {
    if (data.note < 0 || data.note > 20) {
        console.log("Note invalide (doit être entre 0 et 20)");
        return null;
    }
    const stmt = await db.prepare(`
        UPDATE grades SET student_id = ?, subject_id = ?, note = ? WHERE id = ?
    `);
    return await stmt.run([data.student_id, data.subject_id, data.note, id]);
}

async function supprimerGrades(id) {
    const stmt = await db.prepare(`DELETE FROM grades WHERE id = ?`);
    return await stmt.run([id]);
}

async function listerGrades() {
    const stmt = await db.prepare(`
        SELECT grades.id, students.nom, students.prenom,
               subjects.nom AS matiere, grades.note
        FROM grades
        JOIN students ON grades.student_id = students.id
        JOIN subjects ON grades.subject_id = subjects.id
    `);
    return await stmt.all([]);
}

async function calculerGrades(student_id, subject_id) {
    const stmt = await db.prepare(`
        SELECT AVG(note) AS moyenne FROM grades WHERE student_id = ? AND subject_id = ?
    `);
    return await stmt.get([student_id, subject_id]);
}

export { ajouterGrades, modifierGrades, supprimerGrades, listerGrades, calculerGrades };