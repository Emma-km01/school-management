const API = "http://localhost:3000";

let students = [];


// AFFICHER LES STUDENTS

function afficherStudents(listeStudents) {

    const tableau = document.getElementById("liste-students");
    tableau.innerHTML = "";

    if (listeStudents.length === 0) {
        tableau.innerHTML = `
            <tr class="aucun-student">
                <td colspan="6">
                    <div class="message-vide">
                        <i class="fa-solid fa-user-graduate"></i>
                        <h3>Aucun étudiant</h3>
                        <p>Aucun étudiant n'est actuellement enregistré.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    listeStudents.forEach((student) => {

        const ligne = document.createElement("tr");

        ligne.innerHTML = `
            <td>${student.nom} ${student.prenom}</td>
            <td>${student.matricule}</td>
            <td>${student.age} ans</td>
            <td>${student.classe}</td>
            <td><span class="statut-actif">Actif</span></td>
            <td>
                <button type="button" class="bouton-action bouton-modifier" title="Modifier" data-id="${student.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="bouton-action bouton-supprimer" title="Supprimer" data-id="${student.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableau.appendChild(ligne);
    });

    // Branche les boutons supprimer sur chaque ligne affichée
    document.querySelectorAll(".bouton-supprimer").forEach((bouton) => {
        bouton.addEventListener("click", async function () {
            const id = this.dataset.id;
            if (!confirm("Supprimer cet étudiant ?")) return;

            try {
                await fetch(`${API}/students/${id}`, { method: "DELETE" });
                await chargerStudents();
            } catch (err) {
                console.error("Erreur suppression :", err);
                alert("Erreur lors de la suppression.");
            }
        });
    });
}


// CHARGER DEPUIS L'API

async function chargerStudents() {
    try {
        const reponse = await fetch(`${API}/students`);
        students = await reponse.json();
        afficherStudents(students);
        mettreAJourStatistiques();
    } catch (err) {
        console.error("Erreur lors du chargement des étudiants :", err);
    }
}


// RECHERCHE

const champRecherche = document.getElementById("recherche-student");

champRecherche.addEventListener("input", function () {
    const recherche = this.value.toLowerCase().trim();

    const resultat = students.filter((student) =>
        student.nom.toLowerCase().includes(recherche) ||
        student.prenom.toLowerCase().includes(recherche) ||
        student.matricule.toLowerCase().includes(recherche)
    );

    afficherStudents(resultat);
});


// FILTRE PAR CLASSE

const filtreClasse = document.getElementById("filtre-classe");

filtreClasse.addEventListener("change", function () {
    const classeSelectionnee = this.value;

    if (classeSelectionnee === "") {
        afficherStudents(students);
        return;
    }

    const resultat = students.filter((student) => student.classe === classeSelectionnee);
    afficherStudents(resultat);
});


// BOUTON AJOUTER

const boutonAjouter = document.getElementById("bouton-ajouter-student");

boutonAjouter.addEventListener("click", async function () {

    const matricule = prompt("Matricule :");
    if (!matricule) return;

    const nom = prompt("Nom :");
    const prenom = prompt("Prénom :");
    const age = prompt("Âge :");
    const classe = prompt("Classe :");

    try {
        await fetch(`${API}/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                matricule,
                nom,
                prenom,
                age: Number(age),
                classe,
                user_id: null
            })
        });

        await chargerStudents();

    } catch (err) {
        console.error("Erreur ajout :", err);
        alert("Erreur lors de l'ajout.");
    }
});


// STATISTIQUES

function mettreAJourStatistiques() {

    document.getElementById("nombre-students").textContent = students.length;
    document.getElementById("nombre-actifs").textContent = students.length;

    const classes = new Set(students.map((student) => student.classe));
    document.getElementById("nombre-classes").textContent = classes.size;
}


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerStudents();