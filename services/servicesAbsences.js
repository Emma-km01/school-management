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

// 2. Modifier une absence
function modifierAbsences(id, data) {
    return db.prepare(`
        UPDATE absences
        SET student_id = ?, date = ?, status = ?
        WHERE id = ?
    `).run(data.student_id, data.date, data.status, id);
}


// 3. Afficher les absences avec nom et prénom de l'étudiant
function afficherAbsences() {
    return db.prepare(`
        SELECT absences.id, students.nom, students.prenom,
               absences.date, absences.status
        FROM absences
        JOIN students ON absences.student_id = students.id
    `).all();
}

// 4. Consulter toutes les absences brutes
function consulterAbsences() {
    return db.prepare(`
        SELECT * FROM absences
    `).all();
}

// 5. Supprimer une absence
function supprimerAbsences(id) {
    return db.prepare(`
        DELETE FROM absences WHERE id = ?
    `).run(id);
}

// 6. Absences d'un étudiant spécifique
function absencesParEtudiant(student_id) {
    return db.prepare(`
        SELECT * FROM absences WHERE student_id = ?
    `).all(student_id);
}

export { enregistrerAbsences, modifierAbsences, afficherAbsences, consulterAbsences, supprimerAbsences, absencesParEtudiant };