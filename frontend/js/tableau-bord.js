const API = "https://school-management-rtbo.onrender.com";

// Récupération de l'utilisateur connecté
const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

// Protection : si pas connecté, retour à la connexion
if (!utilisateur) {
    window.location.href = "index.html";
}

// Affichage du nom et du rôle
document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;

// Chargement des statistiques depuis l'API
async function chargerStatistiques() {
    try {
        const [statsReponse, absencesReponse] = await Promise.all([
            fetch(`${API}/statistiques`),
            fetch(`${API}/absences/raw`)
        ]);

        const stats = await statsReponse.json();
        const absences = await absencesReponse.json();

        document.getElementById("total-etudiants").textContent = stats.etudiants;
        document.getElementById("total-professeurs").textContent = stats.enseignants;
        document.getElementById("total-matieres").textContent = stats.matieres;
        document.getElementById("total-absences").textContent = absences.length;

    } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
    }
}

chargerStatistiques();