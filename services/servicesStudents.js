import db from "../db/database.js";
import Students from "../models/modelsStudents.js";


function ajouter(matricule, nom, prenom, age, classe){

    const addStudents = new Students(matricule, nom, prenom, age, classe);

    const ajout = db.prepare(`
        INSERT OR IGNORE INTO students(matricule, nom, prenom, age, classe)
        VALUES (?, ?, ?, ?, ?)
    `);

    ajout.run(insertStudents.matricule, insertStudents.nom, insertStudents.prenom, insertStudents.age, insertStudents.classe);

    
}

 ajouter("13498676h", "zahui", "keline", 27, "TD3")

export default {ajouter}


function supprimer(id){
    const delStudents = new Students (id)

    const supp = db.prepare(`
        
    `)
}
