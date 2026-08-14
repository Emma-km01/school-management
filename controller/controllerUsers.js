import {
    listerUsers,
    rechercherUsers,
    ajouterUsers,
    modifierUsers,
    supprimerUsers
} from "../services/servicesUsers.js";

export function getUsers(req, res) {
    const Users = listerUsers();
    res.json(Users);
}

export function getUsers(req, res) {
    const id = req.params.id;
    const Users = rechercherUsers(id);
    res.json(Users);
}

export function createUsers(req, res) {
    const { name, role, username, motdepasse } = req.body;

    const Users = ajouterUsers(name, role, username, motdepasse);

    res.json(Users);
}

export function updateUsers(req, res) {
    const id = req.params.id;

    const { nom, matiere } = req.body;

    const data = {
        nom,
        matiere
    };

    const Users = modifierUsers(id, data);

    res.json(Users);
}

export function deleteUsers(req, res) {
    const id = req.params.id;

    const Users = supprimerUsers(id);

    res.json(Users);
}