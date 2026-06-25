import db from "../db/database.js";
import Teachers from "../models/modelsTeachers.js";

function ajouterTeachers(nom, matiere, user_id = null) {
    const addTeachers = new Teachers(nom, matiere, user_id);

    return db.prepare(`
        INSERT OR IGNORE INTO teachers(nom, matiere, user_id)
        VALUES (?, ?, ?)
    `).run(addTeachers.nom, addTeachers.matiere, addTeachers.user_id);
}

function modifierTeachers(id, data) {
    return db.prepare(`
        UPDATE teachers SET nom = ?, matiere = ?
        WHERE id = ?
    `).run(data.nom, data.matiere, id); // WHERE id = ? ajouté
}

function supprimerTeachers(id) {
    return db.prepare(`
        DELETE FROM teachers WHERE id = ?
    `).run(id);
}

function rechercherTeachers(id) {
    return db.prepare(`
        SELECT * FROM teachers WHERE id = ?
    `).get(id);
}

function listerTeachers() {
    return db.prepare(`
        SELECT * FROM teachers
    `).all();
}

export { ajouterTeachers, modifierTeachers, supprimerTeachers, rechercherTeachers, listerTeachers };