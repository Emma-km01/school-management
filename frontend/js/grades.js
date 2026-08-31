const API = "http://localhost:3000";

let grades = [];
let students = [];


// AFFICHER LES GRADES

function classeEtudiant(nom, prenom) {
    const etudiant = students.find((s) => s.nom === nom && s.prenom === prenom);
    return etudiant ? etudiant.classe : "—";
}

function afficherGrades(listeGrades) {

    const tableau = document.getElementById("liste-grades");
    tableau.innerHTML = "";

    if (listeGrades.length === 0) {
        tableau.innerHTML = `
            <tr class="aucun-grade">
                <td colspan="7">
                    <div class="message-vide">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <h3>Aucune note</h3>
                        <p>Aucune note n'est actuellement enregistrée.</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    listeGrades.forEach((grade) => {

        const ligne = document.createElement("tr");

        let classeNote = "note";
        if (grade.note >= 15) classeNote += " note-excellente";
        else if (grade.note < 10) classeNote += " note-faible";

        ligne.innerHTML = `
            <td>${grade.nom} ${grade.prenom}</td>
            <td>${classeEtudiant(grade.nom, grade.prenom)}</td>
            <td>${grade.matiere}</td>
            <td><span class="${classeNote}">${grade.note}/20</span></td>
            <td>—</td>
            <td>—</td>
            <td>
                <button type="button" class="bouton-action bouton-modifier" title="Modifier" data-id="${grade.id}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="bouton-action bouton-supprimer" title="Supprimer" data-id="${grade.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;

        tableau.appendChild(ligne);
    });

    document.querySelectorAll(".bouton-supprimer").forEach((bouton) => {
        bouton.addEventListener("click", async function () {
            const id = this.dataset.id;
            if (!confirm("Supprimer cette note ?")) return;

            try {
                await fetch(`${API}/grades/${id}`, { method: "DELETE" });
                await chargerGrades();
            } catch (err) {
                console.error("Erreur suppression :", err);
                alert("Erreur lors de la suppression.");
            }
        });
    });
}


// CHARGER DEPUIS L'API

async function chargerGrades() {
    try {
        const [gradesReponse, studentsReponse] = await Promise.all([
            fetch(`${API}/grades`),
            fetch(`${API}/students`)
        ]);

        grades = await gradesReponse.json();
        students = await studentsReponse.json();

        afficherGrades(grades);
        mettreAJourStatistiques();
    } catch (err) {
        console.error("Erreur lors du chargement des notes :", err);
    }
}


// FILTRAGE

function filtrerGrades() {

    const recherche = document.getElementById("recherche-grade").value.toLowerCase().trim();
    const classe = document.getElementById("filtre-classe").value;
    const matiere = document.getElementById("filtre-matiere").value;

    const resultat = grades.filter((grade) => {

        const nomComplet = `${grade.nom} ${grade.prenom}`.toLowerCase();
        const correspondRecherche = nomComplet.includes(recherche);
        const correspondClasse = classe === "" || classeEtudiant(grade.nom, grade.prenom) === classe;
        const correspondMatiere = matiere === "" || grade.matiere === matiere;

        return correspondRecherche && correspondClasse && correspondMatiere;
    });

    afficherGrades(resultat);
}

document.getElementById("recherche-grade").addEventListener("input", filtrerGrades);
document.getElementById("filtre-classe").addEventListener("change", filtrerGrades);
document.getElementById("filtre-matiere").addEventListener("change", filtrerGrades);


// BOUTON AJOUTER

document.getElementById("bouton-ajouter-grade").addEventListener("click", async function () {

    const student_id = prompt("ID de l'étudiant :");
    if (!student_id) return;

    const subject_id = prompt("ID de la matière :");
    const note = prompt("Note (0-20) :");

    try {
        const reponse = await fetch(`${API}/grades`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                student_id: Number(student_id),
                subject_id: Number(subject_id),
                note: Number(note)
            })
        });

        if (!reponse.ok) {
            const data = await reponse.json();
            alert(data.message || "Erreur lors de l'ajout.");
            return;
        }

        await chargerGrades();

    } catch (err) {
        console.error("Erreur ajout :", err);
        alert("Erreur lors de l'ajout.");
    }
});


// STATISTIQUES

function mettreAJourStatistiques() {

    document.getElementById("nombre-grades").textContent = grades.length;

    if (grades.length === 0) {
        document.getElementById("moyenne-generale").textContent = "0,00";
        document.getElementById("meilleure-note").textContent = "0,00";
        return;
    }

    const total = grades.reduce((somme, grade) => somme + Number(grade.note), 0);
    const moyenne = total / grades.length;

    document.getElementById("moyenne-generale").textContent = moyenne.toFixed(2).replace(".", ",");

    const meilleureNote = Math.max(...grades.map((grade) => Number(grade.note)));
    document.getElementById("meilleure-note").textContent = meilleureNote.toFixed(2).replace(".", ",");
}


// UTILISATEUR CONNECTÉ

const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// INITIALISATION

chargerGrades();