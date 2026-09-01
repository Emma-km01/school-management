const API = "https://school-management-rtbo.onrender.com";

let teachers = [];


// AFFICHER LES TEACHERS

function afficherTeachers(listeTeachers) {

    const tableau = document.getElementById("liste-teachers");
    tableau.innerHTML = "";

    if (listeTeachers.length === 0) {
        tableau.innerHTML = `
            <tr class="aucun-teacher">
                <td colspan="6">
                    <div class="message-vide">
                        <i class="fa-solid fa-chalkboard-user"></i>
                        <h3>Aucun professeur</h3>
                        <p>Aucun professeur n'est actuellement enregistré.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    listeTeachers.forEach((teacher) => {

        const ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td>${teacher.nom}</td>
            <td>${teacher.id}</td>
            <td>${teacher.matiere}</td>
            <td>—</td>
            <td><span class="statut-actif">Actif</span></td>
            <td>
                <button type="button" class="bouton-action bouton-modifier" title="Modifier" data-id="${teacher.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="bouton-action bouton-supprimer" title="Supprimer" data-id="${teacher.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableau.appendChild(ligne);
    });

    document.querySelectorAll(".bouton-supprimer").forEach((bouton) => {
        bouton.addEventListener("click", async function () {
            const id = this.dataset.id;
            if (!confirm("Supprimer ce professeur ?")) return;

            try {
                await fetch(`${API}/teachers/${id}`, { method: "DELETE" });
                await chargerTeachers();
            } catch (err) {
                console.error("Erreur suppression :", err);
                alert("Erreur lors de la suppression.");
            }
        });
    });
}


// CHARGER DEPUIS L'API

async function chargerTeachers() {
    try {
        const reponse = await fetch(`${API}/teachers`);
        teachers = await reponse.json();
        afficherTeachers(teachers);
        mettreAJourStatistiques();
    } catch (err) {
        console.error("Erreur lors du chargement des professeurs :", err);
    }
}


// RECHERCHE

const champRecherche = document.getElementById("recherche-teacher");

champRecherche.addEventListener("input", function () {
    const recherche = this.value.toLowerCase().trim();

    const resultat = teachers.filter((teacher) =>
        teacher.nom.toLowerCase().includes(recherche) ||
        teacher.matiere.toLowerCase().includes(recherche)
    );

    afficherTeachers(resultat);
});


// FILTRE PAR MATIERE

const filtreMatiere = document.getElementById("filtre-matiere");

filtreMatiere.addEventListener("change", function () {
    const matiereSelectionnee = this.value;

    if (matiereSelectionnee === "") {
        afficherTeachers(teachers);
        return;
    }

    const resultat = teachers.filter((teacher) => teacher.matiere === matiereSelectionnee);
    afficherTeachers(resultat);
});


// BOUTON AJOUTER

const boutonAjouter = document.getElementById("bouton-ajouter-teacher");

boutonAjouter.addEventListener("click", async function () {

    const nom = prompt("Nom du professeur :");
    if (!nom) return;

    const matiere = prompt("Matière enseignée :");

    try {
        await fetch(`${API}/teachers`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nom, matiere, user_id: null })
        });

        await chargerTeachers();

    } catch (err) {
        console.error("Erreur ajout :", err);
        alert("Erreur lors de l'ajout.");
    }
});


// STATISTIQUES

function mettreAJourStatistiques() {

    document.getElementById("nombre-teachers").textContent = teachers.length;
    document.getElementById("nombre-actifs").textContent = teachers.length;

    const matieres = new Set(teachers.map((teacher) => teacher.matiere));
    document.getElementById("nombre-matieres").textContent = matieres.size;
}


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerTeachers();