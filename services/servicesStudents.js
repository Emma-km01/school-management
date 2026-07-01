import db from "../db/database.js";
import Students from "../models/modelsStudents.js";

function ajouterStudents(matricule, nom, prenom, age, classe, user_id = null) {
    const addStudents = new Students(matricule, nom, prenom, age, classe, user_id);

    return db.prepare(`
        INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe, user_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(addStudents.matricule, addStudents.nom, addStudents.prenom, addStudents.age, addStudents.classe, addStudents.user_id);
}

function modifierStudents(id, data) {
    return db.prepare(`
        UPDATE students SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
        WHERE id = ?
    `).run(data.matricule, data.nom, data.prenom, data.age, data.classe, id); // WHERE id = ? ajouté
}

function supprimerStudents(id) {
    return db.prepare(`
        DELETE FROM students WHERE id = ?
    `).run(id);
}

function rechercherStudents(id) {
    return db.prepare(`
        SELECT * FROM students WHERE id = ?
    `).get(id);
}

function listerStudents() {
    return db.prepare(`
        SELECT * FROM students
    `).all();
}

export { ajouterStudents, modifierStudents, supprimerStudents, rechercherStudents, listerStudents };