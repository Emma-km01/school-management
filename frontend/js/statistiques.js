// ==============================
// PAGE STATISTIQUES
// ==============================


// ==============================
// DONNÉES TEMPORAIRES
// ==============================

let statistiques = {

    moyenneGenerale: 0,

    meilleurEtudiant: null,

    totalAbsences: 0,

    totalEtudiants: 0,

    tauxReussite: 0,

    nombreAdmis: 0,

    nombreNonAdmis: 0,

    meilleursEtudiants: []

};


// ==============================
// AFFICHER LES STATISTIQUES
// ==============================

function afficherStatistiques() {

    // Moyenne générale

    document.getElementById(
        "moyenne-generale"
    ).textContent =

        statistiques.moyenneGenerale
            .toFixed(2)
            .replace(".", ",")
        + " / 20";


    // Meilleur étudiant

    document.getElementById(
        "meilleur-etudiant"
    ).textContent =

        statistiques.meilleurEtudiant
        || "Aucun";


    // Absences

    document.getElementById(
        "total-absences"
    ).textContent =

        statistiques.totalAbsences;


    // Étudiants

    document.getElementById(
        "total-etudiants"
    ).textContent =

        statistiques.totalEtudiants;


    // Taux de réussite

    document.getElementById(
        "taux-reussite"
    ).textContent =

        statistiques.tauxReussite
        + "%";


    // Admis

    document.getElementById(
        "nombre-admis"
    ).textContent =

        statistiques.nombreAdmis
        + " étudiants";


    // Non admis

    document.getElementById(
        "nombre-non-admis"
    ).textContent =

        statistiques.nombreNonAdmis
        + " étudiants";


    afficherMeilleursEtudiants();

}


// ==============================
// AFFICHER LES MEILLEURS ÉTUDIANTS
// ==============================

function afficherMeilleursEtudiants() {

    const tableau =
        document.getElementById(
            "liste-meilleurs-etudiants"
        );


    tableau.innerHTML = "";


    if (
        statistiques.meilleursEtudiants
            .length === 0
    ) {

        tableau.innerHTML = `

            <tr>

                <td colspan="5">

                    <div class="message-vide">

                        <i class="fa-solid fa-chart-column"></i>

                        <h3>
                            Aucune donnée
                        </h3>

                        <p>
                            Les statistiques apparaîtront lorsque les données seront disponibles.
                        </p>

                    </div>

                </td>

            </tr>

        `;

        return;

    }


    statistiques.meilleursEtudiants
        .forEach(
            (etudiant, index) => {

                const ligne =
                    document.createElement(
                        "tr"
                    );


                let mention = "Passable";


                if (
                    etudiant.moyenne >= 16
                ) {

                    mention =
                        "Très bien";

                }
                else if (
                    etudiant.moyenne >= 14
                ) {

                    mention =
                        "Bien";

                }
                else if (
                    etudiant.moyenne >= 12
                ) {

                    mention =
                        "Assez bien";

                }


                ligne.innerHTML = `

                    <td>

                        <span class="rang">
                            ${index + 1}
                        </span>

                    </td>

                    <td>
                        ${etudiant.nom}
                    </td>

                    <td>
                        ${etudiant.classe}
                    </td>

                    <td>

                        <span class="moyenne">
                            ${etudiant.moyenne
                                .toFixed(2)
                                .replace(".", ",")}
                            / 20
                        </span>

                    </td>

                    <td>

                        <span class="mention">
                            ${mention}
                        </span>

                    </td>

                `;


                tableau.appendChild(ligne);

            }
        );

}


// ==============================
// FILTRE CLASSE
// ==============================

document
    .getElementById(
        "filtre-classe"
    )
    .addEventListener(
        "change",
        function () {

            console.log(
                "Classe sélectionnée :",
                this.value
            );

            // Plus tard :
            // appel au backend avec la classe sélectionnée

        }
    );


// ==============================
// FILTRE PÉRIODE
// ==============================

document
    .getElementById(
        "filtre-periode"
    )
    .addEventListener(
        "change",
        function () {

            console.log(
                "Période sélectionnée :",
                this.value
            );

            // Plus tard :
            // appel au backend avec la période sélectionnée

        }
    );


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

afficherStatistiques();