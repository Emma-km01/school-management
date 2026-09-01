const API = "https://school-management-rtbo.onrender.com";

let absences = [];
let students = [];


// AFFICHER LES ABSENCES

function classeEtudiant(nom, prenom) {
    const etudiant = students.find((s) => s.nom === nom && s.prenom === prenom);
    return etudiant ? etudiant.classe : "—";
}

function formaterStatut(status) {
    // Normalise "non justifiée" -> "Non justifiée", "justifiée" -> "Justifiée"
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function afficherAbsences(listeAbsences) {

    const tableau = document.getElementById("liste-absences");
    tableau.innerHTML = "";

    if (listeAbsences.length === 0) {
        tableau.innerHTML = `
            <tr class="aucune-absence">
                <td colspan="6">
                    <div class="message-vide">
                        <i class="fa-solid fa-calendar-check"></i>
                        <h3>Aucune absence</h3>
                        <p>Aucune absence n'est actuellement enregistrée.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    listeAbsences.forEach((absence) => {

        const ligne = document.createElement("tr");
        const statutAffiche = formaterStatut(absence.status);

        let classeStatut = "statut statut-justifiee";
        if (absence.status.toLowerCase() === "non justifiée") {
            classeStatut = "statut statut-non-justifiee";
        }

        ligne.innerHTML = `
            <td>${absence.nom} ${absence.prenom}</td>
            <td>${classeEtudiant(absence.nom, absence.prenom)}</td>
            <td>${absence.date}</td>
            <td>—</td>
            <td><span class="${classeStatut}">${statutAffiche}</span></td>
            <td>
                <button type="button" class="bouton-action bouton-modifier" title="Modifier" data-id="${absence.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="bouton-action bouton-supprimer" title="Supprimer" data-id="${absence.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableau.appendChild(ligne);
    });

    document.querySelectorAll(".bouton-supprimer").forEach((bouton) => {
        bouton.addEventListener("click", async function () {
            const id = this.dataset.id;
            if (!confirm("Supprimer cette absence ?")) return;

            try {
                await fetch(`${API}/absences/${id}`, { method: "DELETE" });
                await chargerAbsences();
            } catch (err) {
                console.error("Erreur suppression :", err);
                alert("Erreur lors de la suppression.");
            }
        });
    });
}


// CHARGER DEPUIS L'API

async function chargerAbsences() {
    try {
        const [absencesReponse, studentsReponse] = await Promise.all([
            fetch(`${API}/absences`),
            fetch(`${API}/students`)
        ]);

        absences = await absencesReponse.json();
        students = await studentsReponse.json();

        afficherAbsences(absences);
        mettreAJourStatistiques();
    } catch (err) {
        console.error("Erreur lors du chargement des absences :", err);
    }
}


// FILTRAGE

function filtrerAbsences() {

    const recherche = document.getElementById("recherche-absence").value.toLowerCase().trim();
    const classe = document.getElementById("filtre-classe").value;
    const statut = document.getElementById("filtre-statut").value;

    const resultat = absences.filter((absence) => {

        const nomComplet = `${absence.nom} ${absence.prenom}`.toLowerCase();
        const correspondRecherche = nomComplet.includes(recherche);
        const correspondClasse = classe === "" || classeEtudiant(absence.nom, absence.prenom) === classe;
        const correspondStatut = statut === "" || formaterStatut(absence.status) === statut;

        return correspondRecherche && correspondClasse && correspondStatut;
    });

    afficherAbsences(resultat);
}

document.getElementById("recherche-absence").addEventListener("input", filtrerAbsences);
document.getElementById("filtre-classe").addEventListener("change", filtrerAbsences);
document.getElementById("filtre-statut").addEventListener("change", filtrerAbsences);


// BOUTON AJOUTER

document.getElementById("bouton-ajouter-absence").addEventListener("click", async function () {

    const student_id = prompt("ID de l'étudiant :");
    if (!student_id) return;

    const date = prompt("Date (AAAA-MM-JJ) :");
    const status = confirm("Absence justifiée ? OK = oui, Annuler = non") ? "justifiée" : "non justifiée";

    try {
        await fetch(`${API}/absences`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                student_id: Number(student_id),
                date,
                status
            })
        });

        await chargerAbsences();

    } catch (err) {
        console.error("Erreur ajout :", err);
        alert("Erreur lors de l'ajout.");
    }
});


// STATISTIQUES

function mettreAJourStatistiques() {

    document.getElementById("nombre-absences").textContent = absences.length;

    const justifiees = absences.filter((absence) => absence.status.toLowerCase() === "justifiée");
    document.getElementById("nombre-justifiees").textContent = justifiees.length;

    const nonJustifiees = absences.filter((absence) => absence.status.toLowerCase() === "non justifiée");
    document.getElementById("nombre-non-justifiees").textContent = nonJustifiees.length;
}


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerAbsences();