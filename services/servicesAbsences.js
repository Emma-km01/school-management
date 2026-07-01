import db from "../db/database.js";
import Absences from "../models/modelsAbsences.js";

// 1. Enregistrer une absence
function enregistrerAbsences(student_id, date, status) {
    const addAbsences = new Absences(student_id, date, status);

    return db.prepare(`
        INSERT OR IGNORE INTO absences(student_id, date, status)
        VALUES (?, ?, ?)
    `).run(addAbsences.student_id, addAbsences.date, addAbsences.status); // absences et non grades
}

// 2. Afficher les absences avec nom et prénom de l'étudiant
function afficherAbsences() {
    return db.prepare(`
        SELECT absences.id, students.nom, students.prenom,
               absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
    `).all();
}

// 3. Consulter toutes les absences brutes
function consulterAbsences() {
    return db.prepare(`
        SELECT * FROM absences
    `).all();
}

// 4. Supprimer une absence
function supprimerAbsences(id) {
    return db.prepare(`
        DELETE FROM absences WHERE id = ?
    `).run(id);
}

// 5. Absences d'un étudiant spécifique
function absencesParEtudiant(student_id) {
    return db.prepare(`
        SELECT * FROM absences WHERE student_id = ?
    `).all(student_id);
}

export { enregistrerAbsences, afficherAbsences, consulterAbsences, supprimerAbsences, absencesParEtudiant };