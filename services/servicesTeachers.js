import db from "../db/database.js";
import Teachers from "../models/modelsTeachers.js";

async function ajouterTeachers(nom, matiere, user_id = null) {
    const addTeachers = new Teachers(nom, matiere, user_id);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO teachers(nom, matiere, user_id)
        VALUES (?, ?, ?)
    `);
    return await stmt.run([addTeachers.nom, addTeachers.matiere, addTeachers.user_id]);
}

async function modifierTeachers(id, data) {
    const stmt = await db.prepare(`
        UPDATE teachers SET nom = ?, matiere = ?
        WHERE id = ?
    `);
    return await stmt.run([data.nom, data.matiere, id]);
}

async function supprimerTeachers(id) {
    const stmt = await db.prepare(`DELETE FROM teachers WHERE id = ?`);
    return await stmt.run([id]);
}

async function rechercherTeachers(id) {
    const stmt = await db.prepare(`SELECT * FROM teachers WHERE id = ?`);
    return await stmt.get([id]);
}

async function listerTeachers() {
    const stmt = await db.prepare(`SELECT * FROM teachers`);
    return await stmt.all([]);
}

export { ajouterTeachers, modifierTeachers, supprimerTeachers, rechercherTeachers, listerTeachers };