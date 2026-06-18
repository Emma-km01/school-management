import db from "../db/database.js";
import Students from "../models/modelsUsers.js";


function ajouterUsers(name, role){

    const addUsers = new Users(name, role);

    const ajout = db.prepare(`
        INSERT OR IGNORE INTO users(name, role)
        VALUES (?, ?, ?)
    `);

   return ajout.run(addUsers.name, addUsers.role);

    
}



function supprimerUsers(id){
    return db.prepare(`
        DELETE FROM users WHERE id = ?
    `).run(id)
}


function listerUsers(){
    return db.prepare(`
        SELECT * FROM users
    `).all()
}

export {ajouterUsers, supprimerUsers, listerUsers}

