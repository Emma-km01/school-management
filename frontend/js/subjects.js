// ==============================
// PAGE SUBJECTS
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

let subjects = [];


// ==============================
// AFFICHER LES SUBJECTS
// ==============================

function afficherSubjects(listeSubjects) {

    const tableau =
        document.getElementById(
            "liste-subjects"
        );


    tableau.innerHTML = "";


    // Aucun sujet

    if (listeSubjects.length === 0) {

        tableau.innerHTML = `

            <tr class="aucun-subject">

                <td colspan="6">

                    <div class="message-vide">

                        <i class="fa-solid fa-book-open"></i>

                        <h3>
                            Aucune matière
                        </h3>

                        <p>
                            Aucune matière n'est actuellement enregistrée.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // Affichage des matières

    listeSubjects.forEach((subject) => {

        const ligne =
            document.createElement("tr");


        ligne.innerHTML = `

            <td>
                ${subject.nom}
            </td>

            <td>
                ${subject.code}
            </td>

            <td>
                ${subject.coefficient}
            </td>

            <td>
                ${subject.professeur}
            </td>

            <td>

                <span class="statut-actif">
                    Active
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
// RECHERCHE
// ==============================

const champRecherche =
    document.getElementById(
        "recherche-subject"
    );


champRecherche.addEventListener(
    "input",
    function () {

        const recherche =
            this.value
                .toLowerCase()
                .trim();


        const resultat =
            subjects.filter(
                (subject) => {

                    return (

                        subject.nom
                            .toLowerCase()
                            .includes(recherche)

                        ||

                        subject.code
                            .toLowerCase()
                            .includes(recherche)

                    );

                }
            );


        afficherSubjects(resultat);

    }
);


// ==============================
// BOUTON AJOUTER
// ==============================

const boutonAjouter =
    document.getElementById(
        "bouton-ajouter-subject"
    );


boutonAjouter.addEventListener(
    "click",
    function () {

        alert(
            "Le formulaire d'ajout d'une matière sera ajouté prochainement."
        );

    }
);


// ==============================
// STATISTIQUES
// ==============================

function mettreAJourStatistiques() {


    // Total matières

    document.getElementById(
        "nombre-subjects"
    ).textContent =
        subjects.length;


    // Matières enseignées

    document.getElementById(
        "nombre-enseignees"
    ).textContent =
        subjects.length;


    // Nombre de professeurs

    const professeurs =
        new Set(
            subjects
                .map(
                    (subject) =>
                        subject.professeur
                )
                .filter(
                    (professeur) =>
                        professeur
                )
        );


    document.getElementById(
        "nombre-professeurs"
    ).textContent =
        professeurs.size;

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

afficherSubjects(subjects);

mettreAJourStatistiques();