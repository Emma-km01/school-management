import {
    ajouterUsers,
    modifierUsers,
    supprimerUsers,
    rechercherUsers,
    listerUsers,
    connecterUsers
} from "../services/servicesUsers.js";

export async function getUsers(req, res) {
    const users = await listerUsers();
    res.json(users);
}

export async function getUser(req, res) {
    const id = req.params.id;
    const user = await rechercherUsers(id);

    if (!user) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    res.json(user);
}

export async function createUser(req, res) {
    const { name, role, username, motdepasse } = req.body;

    const result = await ajouterUsers(name, role, username, motdepasse);

    res.status(201).json({
        message: "Utilisateur ajouté",
        id: result.lastInsertRowid
    });
}

export async function updateUser(req, res) {
    const id = req.params.id;
    const data = req.body;

    await modifierUsers(id, data);

    res.json({ message: "Utilisateur modifié" });
}

export async function deleteUser(req, res) {
    const id = req.params.id;

    await supprimerUsers(id);

    res.json({ message: "Utilisateur supprimé" });
}

export async function loginUser(req, res) {
    const { username, motdepasse } = req.body;

    const user = await connecterUsers(username, motdepasse);

    if (!user) {
        return res.status(401).json({ message: "Identifiant ou mot de passe incorrect." });
    }

    res.json({ message: "Connexion réussie", user });
}