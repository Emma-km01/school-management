// ==============================
// PAGE ABSENCES
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

let absences = [];


// ==============================
// AFFICHER LES ABSENCES
// ==============================

function afficherAbsences(listeAbsences) {

    const tableau =
        document.getElementById(
            "liste-absences"
        );


    tableau.innerHTML = "";


    // Aucune absence

    if (listeAbsences.length === 0) {

        tableau.innerHTML = `

            <tr class="aucune-absence">

                <td colspan="6">

                    <div class="message-vide">

                        <i class="fa-solid fa-calendar-check"></i>

                        <h3>
                            Aucune absence
                        </h3>

                        <p>
                            Aucune absence n'est actuellement enregistrée.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // Affichage des absences

    listeAbsences.forEach((absence) => {

        const ligne =
            document.createElement("tr");


        let classeStatut =
            "statut statut-justifiee";


        if (
            absence.statut ===
            "Non justifiée"
        ) {

            classeStatut =
                "statut statut-non-justifiee";

        }


        ligne.innerHTML = `

            <td>
                ${absence.etudiant}
            </td>

            <td>
                ${absence.classe}
            </td>

            <td>
                ${absence.date}
            </td>

            <td>
                ${absence.motif}
            </td>

            <td>

                <span class="${classeStatut}">
                    ${absence.statut}
                </span>

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

function filtrerAbsences() {

    const recherche =
        document
            .getElementById(
                "recherche-absence"
            )
            .value
            .toLowerCase()
            .trim();


    const classe =
        document.getElementById(
            "filtre-classe"
        ).value;


    const statut =
        document.getElementById(
            "filtre-statut"
        ).value;


    const resultat =
        absences.filter((absence) => {

            const correspondRecherche =

                absence.etudiant
                    .toLowerCase()
                    .includes(recherche);


            const correspondClasse =

                classe === "" ||
                absence.classe === classe;


            const correspondStatut =

                statut === "" ||
                absence.statut === statut;


            return (
                correspondRecherche &&
                correspondClasse &&
                correspondStatut
            );

        });


    afficherAbsences(resultat);

}


// ==============================
// RECHERCHE
// ==============================

document
    .getElementById(
        "recherche-absence"
    )
    .addEventListener(
        "input",
        filtrerAbsences
    );


// ==============================
// FILTRE CLASSE
// ==============================

document
    .getElementById(
        "filtre-classe"
    )
    .addEventListener(
        "change",
        filtrerAbsences
    );


// ==============================
// FILTRE STATUT
// ==============================

document
    .getElementById(
        "filtre-statut"
    )
    .addEventListener(
        "change",
        filtrerAbsences
    );


// ==============================
// BOUTON AJOUTER
// ==============================

document
    .getElementById(
        "bouton-ajouter-absence"
    )
    .addEventListener(
        "click",
        function () {

            alert(
                "Le formulaire d'enregistrement d'une absence sera ajouté prochainement."
            );

        }
    );


// ==============================
// STATISTIQUES
// ==============================

function mettreAJourStatistiques() {


    // Total

    document.getElementById(
        "nombre-absences"
    ).textContent =
        absences.length;


    // Absences justifiées

    const justifiees =
        absences.filter(
            (absence) =>
                absence.statut ===
                "Justifiée"
        );


    document.getElementById(
        "nombre-justifiees"
    ).textContent =
        justifiees.length;


    // Absences non justifiées

    const nonJustifiees =
        absences.filter(
            (absence) =>
                absence.statut ===
                "Non justifiée"
        );


    document.getElementById(
        "nombre-non-justifiees"
    ).textContent =
        nonJustifiees.length;

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

afficherAbsences(absences);

mettreAJourStatistiques();