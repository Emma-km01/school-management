import db from "../db/database.js";
import Users from "../models/modelsUsers.js";

async function ajouterUsers(name, role, username, motdepasse) {
    const addUsers = new Users(name, role, username, motdepasse);
    const stmt = await db.prepare(`
        INSERT OR IGNORE INTO users(name, role, username, motdepasse)
        VALUES (?, ?, ?, ?)
    `);
    return await stmt.run([addUsers.name, addUsers.role, addUsers.username, addUsers.motdepasse]);
}

async function modifierUsers(id, data) {
    const stmt = await db.prepare(`
        UPDATE users SET name = ?, role = ?, username = ?, motdepasse = ?
        WHERE id = ?
    `);
    return await stmt.run([data.name, data.role, data.username, data.motdepasse, id]);
}

async function supprimerUsers(id) {
    const stmt = await db.prepare(`DELETE FROM users WHERE id = ?`);
    return await stmt.run([id]);
}

async function rechercherUsers(id) {
    const stmt = await db.prepare(`SELECT * FROM users WHERE id = ?`);
    return await stmt.get([id]);
}

async function listerUsers() {
    const stmt = await db.prepare(`SELECT * FROM users`);
    return await stmt.all([]);
}

async function connecterUsers(username, motdepasse, role) {
    const stmt = await db.prepare(`
        SELECT id, name, role, username
        FROM users
        WHERE username = ?
        AND motdepasse = ?
    `);
    return await stmt.get([username, motdepasse]);
}

export { ajouterUsers, modifierUsers, supprimerUsers, rechercherUsers, listerUsers, connecterUsers };