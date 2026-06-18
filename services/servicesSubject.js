import db from "../db/database.js";
import Students from "../models/modelsSubjects.js";


function ajouterSubjects(nom){

    const addUsers = new Subjects(nom);

    const ajout = db.prepare(`
        INSERT OR IGNORE INTO users(nom)
        VALUES (?, ?)
    `);

   return ajout.run(addUsers.nom);

    
}

function affecterSubjects(subjectId, teacherId){

    const affect = db.prepare(`
        UPDATE subjects SET teacher_id = ? WHERE id = ?
    `);
    return affect.run(teacherId, subjectId)

}

function supprimerSubjects(id){
    return db.prepare(`
        DELETE FROM users WHERE id = ?
    `).run(id)
}


function listerSubjects(){
    return db.prepare(`
        SELECT * FROM users
    `).all()
}

export {ajouterSubjects, supprimerSubjects, listerSubjects}

