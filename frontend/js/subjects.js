const API = "https://school-management-rtbo.onrender.com";

let subjects = [];
let teachers = [];


// AFFICHER LES SUBJECTS

function nomProfesseur(teacherId) {
    const prof = teachers.find((t) => t.id === teacherId);
    return prof ? prof.nom : "Non affecté";
}

function afficherSubjects(listeSubjects) {

    const tableau = document.getElementById("liste-subjects");
    tableau.innerHTML = "";

    if (listeSubjects.length === 0) {
        tableau.innerHTML = `
            <tr class="aucun-subject">
                <td colspan="6">
                    <div class="message-vide">
                        <i class="fa-solid fa-book-open"></i>
                        <h3>Aucune matière</h3>
                        <p>Aucune matière n'est actuellement enregistrée.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    listeSubjects.forEach((subject) => {

        const ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td>${subject.nom}</td>
            <td>—</td>
            <td>—</td>
            <td>${nomProfesseur(subject.teacher_id)}</td>
            <td><span class="statut-actif">Active</span></td>
            <td>
                <button type="button" class="bouton-action bouton-modifier" title="Modifier" data-id="${subject.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="bouton-action bouton-supprimer" title="Supprimer" data-id="${subject.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableau.appendChild(ligne);
    });

    document.querySelectorAll(".bouton-supprimer").forEach((bouton) => {
        bouton.addEventListener("click", async function () {
            const id = this.dataset.id;
            if (!confirm("Supprimer cette matière ?")) return;

            try {
                await fetch(`${API}/subjects/${id}`, { method: "DELETE" });
                await chargerSubjects();
            } catch (err) {
                console.error("Erreur suppression :", err);
                alert("Erreur lors de la suppression.");
            }
        });
    });
}


// CHARGER DEPUIS L'API

async function chargerSubjects() {
    try {
        const [subjectsReponse, teachersReponse] = await Promise.all([
            fetch(`${API}/subjects`),
            fetch(`${API}/teachers`)
        ]);

        subjects = await subjectsReponse.json();
        teachers = await teachersReponse.json();

        afficherSubjects(subjects);
        mettreAJourStatistiques();
    } catch (err) {
        console.error("Erreur lors du chargement des matières :", err);
    }
}


// RECHERCHE

const champRecherche = document.getElementById("recherche-subject");

champRecherche.addEventListener("input", function () {
    const recherche = this.value.toLowerCase().trim();

    const resultat = subjects.filter((subject) =>
        subject.nom.toLowerCase().includes(recherche)
    );

    afficherSubjects(resultat);
});


// BOUTON AJOUTER

const boutonAjouter = document.getElementById("bouton-ajouter-subject");

boutonAjouter.addEventListener("click", async function () {

    const nom = prompt("Nom de la matière :");
    if (!nom) return;

    try {
        await fetch(`${API}/subjects`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, teacher_id: null })
        });

        await chargerSubjects();

    } catch (err) {
        console.error("Erreur ajout :", err);
        alert("Erreur lors de l'ajout.");
    }
});


// STATISTIQUES

function mettreAJourStatistiques() {

    document.getElementById("nombre-subjects").textContent = subjects.length;
    document.getElementById("nombre-enseignees").textContent = subjects.length;

    const professeurs = new Set(
        subjects.map((subject) => subject.teacher_id).filter((id) => id)
    );

    document.getElementById("nombre-professeurs").textContent = professeurs.size;
}


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerSubjects();