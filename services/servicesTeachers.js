import db from "../db/database.js";
import Teachers from "../models/modelsTeachers.js";


function ajouterTeachers(nom, matiere){

    const addTeachers = new Teachers(nom, matiere);

    const ajoutTeachers = db.prepare(`
        INSERT OR IGNORE INTO teachers(nom, matiere)
        VALUES (?, ?)
    `)

    return ajoutTeachers.run(addTeachers.nom, addTeachers.matiere)
}


function modifierTeachers(id,data){

    const updateTeachers =  db.prepare(`
        UPDATE teachers SET nom = ?, matiere = ?
    `);

    return updateTeachers.run(data.nom, data.matiere)
}


function supprimerTeachers(id){
    return db.prepare(`
        DELETE FROM Teachers WHERE id = ?
    `).run(id)
}


function rechercherTeachers(id){
    return db.prepare(`
        SELECT * FROM teachers WHERE id = ?
    `).get(id)
}


function listerTeachers(){
    return db.prepare(`
        SELECT * FROM teachers
    `).all()
}