// ==============================
// TABLEAU DE BORD
// ==============================


// Données temporaires
const statistiques = {
    etudiants: 0,
    professeurs: 0,
    matieres: 0,
    absences: 0
};


// Affichage des statistiques
document.getElementById("total-etudiants").textContent =
    statistiques.etudiants;

document.getElementById("total-professeurs").textContent =
    statistiques.professeurs;

document.getElementById("total-matieres").textContent =
    statistiques.matieres;

document.getElementById("total-absences").textContent =
    statistiques.absences;


// Récupération de l'utilisateur connecté
const utilisateur = JSON.parse(
    localStorage.getItem("utilisateur")
);


// Affichage du nom et du rôle
if (utilisateur) {

    const nomUtilisateur =
        document.getElementById("nom-utilisateur");

    const roleUtilisateur =
        document.getElementById("role-utilisateur");


    if (utilisateur.nom) {
        nomUtilisateur.textContent =
            utilisateur.nom;
    }

    if (utilisateur.role) {
        roleUtilisateur.textContent =
            utilisateur.role;
    }
}