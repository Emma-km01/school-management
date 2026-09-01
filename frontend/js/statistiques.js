const API = "https://school-management-rtbo.onrender.com";

let statistiques = {
    moyenneGenerale: 0,
    meilleurEtudiant: null,
    totalAbsences: 0,
    totalEtudiants: 0,
    tauxReussite: 0,
    nombreAdmis: 0,
    nombreNonAdmis: 0,
    meilleursEtudiants: []
};

let students = [];


// CHARGER DEPUIS L'API

async function chargerStatistiques() {
    try {
        const [statsRes, classementRes, absencesRes, studentsRes] = await Promise.all([
            fetch(`${API}/statistiques`),
            fetch(`${API}/statistiques/classement`),
            fetch(`${API}/absences/raw`),
            fetch(`${API}/students`)
        ]);

        const stats = await statsRes.json();
        const classement = await classementRes.json();
        const absences = await absencesRes.json();
        students = await studentsRes.json();

        const moyenneGeneraleRes = await fetch(`${API}/statistiques/moyenne-generale`);
        const moyenneGenerale = await moyenneGeneraleRes.json();

        const admis = classement.filter((e) => e.moyenne >= 10);
        const nonAdmis = classement.filter((e) => e.moyenne < 10);

        statistiques.moyenneGenerale = moyenneGenerale.moyenne || 0;
        statistiques.meilleurEtudiant = classement.length > 0 ? `${classement[0].nom} ${classement[0].prenom}` : null;
        statistiques.totalAbsences = absences.length;
        statistiques.totalEtudiants = stats.etudiants;
        statistiques.tauxReussite = classement.length > 0 ? Math.round((admis.length / classement.length) * 100) : 0;
        statistiques.nombreAdmis = admis.length;
        statistiques.nombreNonAdmis = nonAdmis.length;
        statistiques.meilleursEtudiants = classement.map((e) => ({
            nom: `${e.nom} ${e.prenom}`,
            classe: classeEtudiant(e.nom, e.prenom),
            moyenne: e.moyenne
        }));

        afficherStatistiques();

    } catch (err) {
        console.error("Erreur lors du chargement des statistiques :", err);
    }
}

function classeEtudiant(nom, prenom) {
    const etudiant = students.find((s) => s.nom === nom && s.prenom === prenom);
    return etudiant ? etudiant.classe : "—";
}


// AFFICHER LES STATISTIQUES

function afficherStatistiques() {

    document.getElementById("moyenne-generale").textContent =
        statistiques.moyenneGenerale.toFixed(2).replace(".", ",") + " / 20";

    document.getElementById("meilleur-etudiant").textContent =
        statistiques.meilleurEtudiant || "Aucun";

    document.getElementById("total-absences").textContent = statistiques.totalAbsences;
    document.getElementById("total-etudiants").textContent = statistiques.totalEtudiants;
    document.getElementById("taux-reussite").textContent = statistiques.tauxReussite + "%";
    document.getElementById("nombre-admis").textContent = statistiques.nombreAdmis + " étudiants";
    document.getElementById("nombre-non-admis").textContent = statistiques.nombreNonAdmis + " étudiants";

    afficherMeilleursEtudiants();
}


// AFFICHER LES MEILLEURS ÉTUDIANTS

function afficherMeilleursEtudiants() {

    const tableau = document.getElementById("liste-meilleurs-etudiants");
    tableau.innerHTML = "";

    if (statistiques.meilleursEtudiants.length === 0) {
        tableau.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="message-vide">
                        <i class="fa-solid fa-chart-column"></i>
                        <h3>Aucune donnée</h3>
                        <p>Les statistiques apparaîtront lorsque les données seront disponibles.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    statistiques.meilleursEtudiants.forEach((etudiant, index) => {

        const ligne = document.createElement("tr");

        let mention = "Passable";
        if (etudiant.moyenne >= 16) mention = "Très bien";
        else if (etudiant.moyenne >= 14) mention = "Bien";
        else if (etudiant.moyenne >= 12) mention = "Assez bien";

        ligne.innerHTML = `
            <td><span class="rang">${index + 1}</span></td>
            <td>${etudiant.nom}</td>
            <td>${etudiant.classe}</td>
            <td><span class="moyenne">${etudiant.moyenne.toFixed(2).replace(".", ",")} / 20</span></td>
            <td><span class="mention">${mention}</span></td>
        `;

        tableau.appendChild(ligne);
    });
}


// FILTRES

document.getElementById("filtre-classe").addEventListener("change", function () {
    console.log("Classe sélectionnée :", this.value);
});

document.getElementById("filtre-periode").addEventListener("change", function () {
    console.log("Période sélectionnée :", this.value);
});


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerStatistiques();