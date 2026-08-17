import {
    ajouterUsers,
    modifierUsers,
    supprimerUsers,
    rechercherUsers,
    listerUsers
} from "../services/servicesUsers.js";

// Lister tous les utilisateurs
export function getUsers(req, res) {
    const users = listerUsers();
    res.json(users);
}

// Récupérer un utilisateur
export function getUser(req, res) {
    const id = req.params.id;
    const user = rechercherUsers(id);

    if (!user) {
        return res.status(404).json({
            message: "Utilisateur introuvable"
        });
    }

    res.json(user);
}

// Ajouter un utilisateur
export function createUser(req, res) {
    const { name, role, username, motdepasse } = req.body;

    const result = ajouterUsers(
        name,
        role,
        username,
        motdepasse
    );

    res.status(201).json({
        message: "Utilisateur ajouté",
        id: result.lastInsertRowid
    });
}

// Modifier un utilisateur
export function updateUser(req, res) {
    const id = req.params.id;
    const data = req.body;

    modifierUsers(id, data);

    res.json({
        message: "Utilisateur modifié"
    });
}

// Supprimer un utilisateur
export function deleteUser(req, res) {
    const id = req.params.id;

    supprimerUsers(id);

    res.json({
        message: "Utilisateur supprimé"
    });
}