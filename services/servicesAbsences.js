import db from "../db/database.js";
import Absences from "../models/modelsAbsences.js";

async function enregistrerAbsences(student_id, date, status) {
    const addAbsences = new Absences(student_id, date, status);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO absences(student_id, date, status)
        VALUES (?, ?, ?)
    `);
    return await stmt.run([addAbsences.student_id, addAbsences.date, addAbsences.status]);
}

async function modifierAbsences(id, data) {
    const stmt = await db.prepare(`
        UPDATE absences SET student_id = ?, date = ?, status = ? WHERE id = ?
    `);
    return await stmt.run([data.student_id, data.date, data.status, id]);
}

async function afficherAbsences() {
    const stmt = await db.prepare(`
        SELECT absences.id, students.nom, students.prenom,
               absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
    `);
    return await stmt.all([]);
}

async function consulterAbsences() {
    const stmt = await db.prepare(`SELECT * FROM absences`);
    return await stmt.all([]);
}

async function supprimerAbsences(id) {
    const stmt = await db.prepare(`DELETE FROM absences WHERE id = ?`);
    return await stmt.run([id]);
}

async function absencesParEtudiant(student_id) {
    const stmt = await db.prepare(`SELECT * FROM absences WHERE student_id = ?`);
    return await stmt.all([student_id]);
}

export { enregistrerAbsences, modifierAbsences, afficherAbsences, consulterAbsences, supprimerAbsences, absencesParEtudiant };