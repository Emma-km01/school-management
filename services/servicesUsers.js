import db from "../db/database.js";
import Users from "../models/modelsUsers.js";

function ajouterUsers(name, role, username, motdepasse) {
    const addUsers = new Users(name, role, username, motdepasse);

    return db.prepare(`
        INSERT OR IGNORE INTO users(name, role, username, motdepasse)
        VALUES (?, ?, ?, ?)
    `).run(addUsers.name, addUsers.role, addUsers.username, addUsers.motdepasse);
}

function modifierUsers(id, data) {
    return db.prepare(`
        UPDATE users SET name = ?, role = ?, username = ?, motdepasse = ?
        WHERE id = ?
    `).run(data.name, data.role, data.username, data.motdepasse, id);
}

function supprimerUsers(id) {
    return db.prepare(`
        DELETE FROM users WHERE id = ?
    `).run(id);
}

function rechercherUsers(id) {
    return db.prepare(`
        SELECT * FROM users WHERE id = ?
    `).get(id);
}

function listerUsers() {
    return db.prepare(`
        SELECT * FROM users
    `).all();
}

export { ajouterUsers, modifierUsers, supprimerUsers, rechercherUsers, listerUsers };