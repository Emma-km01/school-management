// ==============================
// PAGE TEACHERS
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

let teachers = [];


// ==============================
// AFFICHER LES TEACHERS
// ==============================

function afficherTeachers(listeTeachers) {

    const tableau =
        document.getElementById("liste-teachers");


    tableau.innerHTML = "";


    // Aucun professeur

    if (listeTeachers.length === 0) {

        tableau.innerHTML = `

            <tr class="aucun-teacher">

                <td colspan="6">

                    <div class="message-vide">

                        <i class="fa-solid fa-chalkboard-user"></i>

                        <h3>
                            Aucun professeur
                        </h3>

                        <p>
                            Aucun professeur n'est actuellement enregistré.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // Affichage des professeurs

    listeTeachers.forEach((teacher) => {

        const ligne =
            document.createElement("tr");


        ligne.innerHTML = `

            <td>
                ${teacher.nom} ${teacher.prenom}
            </td>

            <td>
                ${teacher.id}
            </td>

            <td>
                ${teacher.matiere}
            </td>

            <td>
                ${teacher.telephone}
            </td>

            <td>

                <span class="statut-actif">
                    Actif
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
        "recherche-teacher"
    );


champRecherche.addEventListener(
    "input",
    function () {

        const recherche =
            this.value
                .toLowerCase()
                .trim();


        const resultat =
            teachers.filter(
                (teacher) => {

                    return (

                        teacher.nom
                            .toLowerCase()
                            .includes(recherche)

                        ||

                        teacher.prenom
                            .toLowerCase()
                            .includes(recherche)

                        ||

                        teacher.matiere
                            .toLowerCase()
                            .includes(recherche)

                    );

                }
            );


        afficherTeachers(resultat);

    }
);


// ==============================
// FILTRE PAR MATIERE
// ==============================

const filtreMatiere =
    document.getElementById(
        "filtre-matiere"
    );


filtreMatiere.addEventListener(
    "change",
    function () {

        const matiereSelectionnee =
            this.value;


        if (matiereSelectionnee === "") {

            afficherTeachers(teachers);

            return;
        }


        const resultat =
            teachers.filter(
                (teacher) =>
                    teacher.matiere === matiereSelectionnee
            );


        afficherTeachers(resultat);

    }
);


// ==============================
// BOUTON AJOUTER
// ==============================

const boutonAjouter =
    document.getElementById(
        "bouton-ajouter-teacher"
    );


boutonAjouter.addEventListener(
    "click",
    function () {

        alert(
            "Le formulaire d'ajout d'un professeur sera ajouté prochainement."
        );

    }
);


// ==============================
// STATISTIQUES
// ==============================

function mettreAJourStatistiques() {

    document.getElementById(
        "nombre-teachers"
    ).textContent =
        teachers.length;


    document.getElementById(
        "nombre-actifs"
    ).textContent =
        teachers.length;


    const matieres =
        new Set(
            teachers.map(
                (teacher) =>
                    teacher.matiere
            )
        );


    document.getElementById(
        "nombre-matieres"
    ).textContent =
        matieres.size;

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

afficherTeachers(teachers);

mettreAJourStatistiques();