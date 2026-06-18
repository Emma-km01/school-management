import db from "../db/database.js";
import Students from "../models/modelsStudents.js";


function ajouterStudents(matricule, nom, prenom, age, classe){

    const addStudents = new Students(matricule, nom, prenom, age, classe);

    const ajout = db.prepare(`
        INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe)
        VALUES (?, ?, ?, ?, ?)
    `);

   return ajout.run(addStudents.matricule, addStudents.nom, addStudents.prenom, addStudents.age, addStudents.classe);

    
}


function modifierStudents(id,data){

    const updateStudents =  db.prepare(`
        UPDATE students SET matricule = ?, nom = ?, prenom = ?, age = ?, classe = ?
    `);

    return updateStudents.run(data.matricule, data.nom, data.prenom, data.age, data.classe)
}


function supprimerStudents(id){
    return db.prepare(`
        DELETE FROM students WHERE id = ?
    `).run(id)
}


function rechercherStudents(id){
    return db.prepare(`
        SELECT * FROM students WHERE id = ?
    `).get(id)
}

function listerStudents(){
    return db.prepare(`
        SELECT * FROM students
    `).all()
}

export {ajouterStudents, modifierStudents, supprimerStudents}

