import db from "../db/database.js";
import Grades from "../models/modelsGrades.js";

// 1. Ajouter une note
function ajouterGrades(student_id, subject_id, note) {
    if (note < 0 || note > 20) {
        console.log("Note invalide (doit être entre 0 et 20)");
        return null;
    }

    const addGrades = new Grades(student_id, subject_id, note);

    return db.prepare(`
        INSERT OR IGNORE INTO grades(student_id, subject_id, note)
        VALUES (?, ?, ?)
    `).run(addGrades.student_id, addGrades.subject_id, addGrades.note);
}

// 2. Modifier une note
function modifierGrades(id, data) {
    if (data.note < 0 || data.note > 20) {
        console.log("Note invalide (doit être entre 0 et 20)");
        return null;
    }

    return db.prepare(`
        UPDATE grades
        SET student_id = ?, subject_id = ?, note = ?
        WHERE id = ?
    `).run(data.student_id, data.subject_id, data.note, id);
}

// 3. Supprimer une note
function supprimerGrades(id) {
    return db.prepare(`
        DELETE FROM grades WHERE id = ?
    `).run(id);
}

// 4. Lister toutes les notes avec noms étudiant et matière
function listerGrades() {
    return db.prepare(`
        SELECT grades.id, students.nom, students.prenom,
               subjects.nom AS matiere, grades.note
        FROM grades
        JOIN students ON grades.student_id = students.id
        JOIN subjects ON grades.subject_id = subjects.id
    `).all();
}

// 5. Calculer la moyenne d'un étudiant pour une matière ✅
function calculerGrades(student_id, subject_id) {
    return db.prepare(`
        SELECT AVG(note) AS moyenne
        FROM grades
        WHERE student_id = ? AND subject_id = ?
    `).get(student_id, subject_id);
}

export { ajouterGrades, modifierGrades, supprimerGrades, listerGrades, calculerGrades };