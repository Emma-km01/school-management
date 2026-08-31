import db from "../db/database.js";
import Subjects from "../models/modelsSubjects.js";

async function ajouterSubjects(nom, teacher_id = null) {
    const addSubjects = new Subjects(nom, teacher_id);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO subjects(nom, teacher_id)
        VALUES (?, ?)
    `);
    return await stmt.run([addSubjects.nom, addSubjects.teacher_id]);
}

async function affecterSubjects(subjectId, teacherId) {
    const stmt = await db.prepare(`UPDATE subjects SET teacher_id = ? WHERE id = ?`);
    return await stmt.run([teacherId, subjectId]);
}

async function modifierSubjects(id, nouveauNom, teacher_id) {
    const stmt = await db.prepare(`UPDATE subjects SET nom = ?, teacher_id = ? WHERE id = ?`);
    return await stmt.run([nouveauNom, teacher_id, id]);
}

async function supprimerSubjects(id) {
    const stmt = await db.prepare(`DELETE FROM subjects WHERE id = ?`);
    return await stmt.run([id]);
}

async function listerSubjects() {
    const stmt = await db.prepare(`SELECT * FROM subjects`);
    return await stmt.all([]);
}

async function rechercherSubjects(id) {
    const stmt = await db.prepare(`SELECT * FROM subjects WHERE id = ?`);
    return await stmt.get([id]);
}

export { ajouterSubjects, affecterSubjects, modifierSubjects, supprimerSubjects, listerSubjects, rechercherSubjects };