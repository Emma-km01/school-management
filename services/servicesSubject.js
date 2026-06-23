import db from "../db/database.js";
import Subjects from "../models/modelsSubjects.js";

function ajouterSubjects(nom, teacher_id = null) {
    const addSubjects = new Subjects(nom, teacher_id);

    return db.prepare(`
        INSERT OR IGNORE INTO subjects(nom, teacher_id)
        VALUES (?, ?)
    `).run(addSubjects.nom, addSubjects.teacher_id); // ✅ teacher_id et non teacherId
}

function affecterSubjects(subjectId, teacherId) {
    return db.prepare(`
        UPDATE subjects SET teacher_id = ? WHERE id = ?
    `).run(teacherId, subjectId);
}

function modifierSubjects(id, nouveauNom, teacher_id) {
    return db.prepare(`
        UPDATE subjects SET nom = ?, teacher_id = ? WHERE id = ?
    `).run(nouveauNom, teacher_id, id);
}

function supprimerSubjects(id) {
    return db.prepare(`
        DELETE FROM subjects WHERE id = ?
    `).run(id);
}

function listerSubjects() {
    return db.prepare(`
        SELECT * FROM subjects
    `).all();
}

export { ajouterSubjects, affecterSubjects, modifierSubjects, supprimerSubjects, listerSubjects };