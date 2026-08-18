// ==============================
// PAGE GRADES
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

let grades = [];


// ==============================
// AFFICHER LES GRADES
// ==============================

function afficherGrades(listeGrades) {

    const tableau =
        document.getElementById("liste-grades");


    tableau.innerHTML = "";


    // Aucune note

    if (listeGrades.length === 0) {

        tableau.innerHTML = `

            <tr class="aucun-grade">

                <td colspan="7">

                    <div class="message-vide">

                        <i class="fa-solid fa-pen-to-square"></i>

                        <h3>
                            Aucune note
                        </h3>

                        <p>
                            Aucune note n'est actuellement enregistrée.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // Affichage des notes

    listeGrades.forEach((grade) => {

        const ligne =
            document.createElement("tr");


        let classeNote = "note";


        if (grade.note >= 15) {

            classeNote += " note-excellente";

        }
        else if (grade.note < 10) {

            classeNote += " note-faible";

        }


        ligne.innerHTML = `

            <td>
                ${grade.etudiant}
            </td>

            <td>
                ${grade.classe}
            </td>

            <td>
                ${grade.matiere}
            </td>

            <td>

                <span class="${classeNote}">
                    ${grade.note}/20
                </span>

            </td>

            <td>
                ${grade.coefficient}
            </td>

            <td>
                ${grade.date}
            </td>

            <td>

                <button
                    type="button"
                    class="bouton-action bouton-modifier"
                    title="Modifier"
                >

                    <i class="fa-solid fa-pen"></i>

                </button>


                <button
                    type="button"
                    class="bouton-action bouton-supprimer"
                    title="Supprimer"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        `;


        tableau.appendChild(ligne);

    });

}


// ==============================
// FILTRAGE
// ==============================

function filtrerGrades() {

    const recherche =
        document
            .getElementById("recherche-grade")
            .value
            .toLowerCase()
            .trim();


    const classe =
        document.getElementById(
            "filtre-classe"
        ).value;


    const matiere =
        document.getElementById(
            "filtre-matiere"
        ).value;


    const resultat =
        grades.filter((grade) => {

            const correspondRecherche =

                grade.etudiant
                    .toLowerCase()
                    .includes(recherche);


            const correspondClasse =

                classe === "" ||
                grade.classe === classe;


            const correspondMatiere =

                matiere === "" ||
                grade.matiere === matiere;


            return (
                correspondRecherche &&
                correspondClasse &&
                correspondMatiere
            );

        });


    afficherGrades(resultat);

}


// ==============================
// RECHERCHE
// ==============================

document
    .getElementById("recherche-grade")
    .addEventListener(
        "input",
        filtrerGrades
    );


// ==============================
// FILTRE CLASSE
// ==============================

document
    .getElementById("filtre-classe")
    .addEventListener(
        "change",
        filtrerGrades
    );


// ==============================
// FILTRE MATIERE
// ==============================

document
    .getElementById("filtre-matiere")
    .addEventListener(
        "change",
        filtrerGrades
    );


// ==============================
// BOUTON AJOUTER
// ==============================

document
    .getElementById("bouton-ajouter-grade")
    .addEventListener(
        "click",
        function () {

            alert(
                "Le formulaire d'ajout d'une note sera ajouté prochainement."
            );

        }
    );


// ==============================
// STATISTIQUES
// ==============================

function mettreAJourStatistiques() {


    // Nombre total de notes

    document.getElementById(
        "nombre-grades"
    ).textContent =
        grades.length;


    // Aucune note

    if (grades.length === 0) {

        document.getElementById(
            "moyenne-generale"
        ).textContent = "0,00";


        document.getElementById(
            "meilleure-note"
        ).textContent = "0,00";


        return;
    }


    // Calcul de la moyenne

    const total =
        grades.reduce(
            (somme, grade) =>
                somme + Number(grade.note),
            0
        );


    const moyenne =
        total / grades.length;


    document.getElementById(
        "moyenne-generale"
    ).textContent =
        moyenne.toFixed(2).replace(".", ",");


    // Meilleure note

    const meilleureNote =
        Math.max(
            ...grades.map(
                (grade) =>
                    Number(grade.note)
            )
        );


    document.getElementById(
        "meilleure-note"
    ).textContent =
        meilleureNote.toFixed(2).replace(".", ",");

}


// ==============================
// UTILISATEUR CONNECTÉ
// ==============================

const utilisateur =
    JSON.parse(
        localStorage.getItem(
            "utilisateur"
        )
    );


if (utilisateur) {

    if (utilisateur.nom) {

        document.getElementById(
            "nom-utilisateur"
        ).textContent =
            utilisateur.nom;

    }


    if (utilisateur.role) {

        document.getElementById(
            "role-utilisateur"
        ).textContent =
            utilisateur.role;

    }

}


// ==============================
// INITIALISATION
// ==============================

afficherGrades(grades);

mettreAJourStatistiques();