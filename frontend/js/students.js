// ==============================
// PAGE STUDENTS
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

// Pour le moment, la liste est vide.
// Plus tard, ces données viendront
// directement du backend Express.

let students = [];


// ==============================
// AFFICHER LES STUDENTS
// ==============================

function afficherStudents(listeStudents) {

    const tableau =
        document.getElementById("liste-students");


    tableau.innerHTML = "";


    // Aucun étudiant

    if (listeStudents.length === 0) {

        tableau.innerHTML = `

            <tr class="aucun-student">

                <td colspan="6">

                    <div class="message-vide">

                        <i class="fa-solid fa-user-graduate"></i>

                        <h3>
                            Aucun étudiant
                        </h3>

                        <p>
                            Aucun étudiant n'est actuellement enregistré.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;
    }


    // Affichage des étudiants

    listeStudents.forEach((student) => {

        const ligne =
            document.createElement("tr");


        ligne.innerHTML = `

            <td>
                ${student.nom} ${student.prenom}
            </td>

            <td>
                ${student.matricule}
            </td>

            <td>
                ${student.age} ans
            </td>

            <td>
                ${student.classe}
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
        "recherche-student"
    );


champRecherche.addEventListener(
    "input",
    function () {

        const recherche =
            this.value
                .toLowerCase()
                .trim();


        const resultat =
            students.filter(
                (student) => {

                    return (

                        student.nom
                            .toLowerCase()
                            .includes(recherche)

                        ||

                        student.prenom
                            .toLowerCase()
                            .includes(recherche)

                        ||

                        student.matricule
                            .toLowerCase()
                            .includes(recherche)

                    );

                }
            );


        afficherStudents(resultat);

    }
);


// ==============================
// FILTRE PAR CLASSE
// ==============================

const filtreClasse =
    document.getElementById(
        "filtre-classe"
    );


filtreClasse.addEventListener(
    "change",
    function () {

        const classeSelectionnee =
            this.value;


        // Toutes les classes

        if (classeSelectionnee === "") {

            afficherStudents(students);

            return;
        }


        // Classe sélectionnée

        const resultat =
            students.filter(
                (student) =>
                    student.classe === classeSelectionnee
            );


        afficherStudents(resultat);

    }
);


// ==============================
// BOUTON AJOUTER
// ==============================

const boutonAjouter =
    document.getElementById(
        "bouton-ajouter-student"
    );


boutonAjouter.addEventListener(
    "click",
    function () {

        alert(
            "Le formulaire d'ajout d'un étudiant sera ajouté prochainement."
        );

    }
);


// ==============================
// STATISTIQUES
// ==============================

function mettreAJourStatistiques() {


    // Nombre total

    document.getElementById(
        "nombre-students"
    ).textContent =
        students.length;


    // Nombre d'étudiants actifs

    document.getElementById(
        "nombre-actifs"
    ).textContent =
        students.length;


    // Nombre de classes différentes

    const classes =
        new Set(
            students.map(
                (student) =>
                    student.classe
            )
        );


    document.getElementById(
        "nombre-classes"
    ).textContent =
        classes.size;

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


    // Nom

    if (utilisateur.nom) {

        document.getElementById(
            "nom-utilisateur"
        ).textContent =
            utilisateur.nom;

    }


    // Rôle

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

afficherStudents(students);

mettreAJourStatistiques();