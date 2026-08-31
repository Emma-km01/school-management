import db from "../db/database.js";
import Students from "../models/modelsStudents.js";

async function ajouterStudents(matricule, nom, prenom, age, classe, user_id = null) {
    const addStudents = new Students(matricule, nom, prenom, age, classe, user_id);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    return await stmt.run([addStudents.matricule, addStudents.nom, addStudents.prenom, addStudents.age, addStudents.classe, addStudents.user_id]);
}

async function modifierStudents(id, data) {
    const stmt = await db.prepare(`
        UPDATE students SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
        WHERE id = ?
    `);
    return await stmt.run([data.matricule, data.nom, data.prenom, data.age, data.classe, id]);
}

async function supprimerStudents(id) {
    const stmt = await db.prepare(`DELETE FROM students WHERE id = ?`);
    return await stmt.run([id]);
}

async function rechercherStudents(id) {
    const stmt = await db.prepare(`SELECT * FROM students WHERE id = ?`);
    return await stmt.get([id]);
}

async function listerStudents() {
    const stmt = await db.prepare(`SELECT * FROM students`);
    return await stmt.all([]);
}

export { ajouterStudents, modifierStudents, supprimerStudents, rechercherStudents, listerStudents };