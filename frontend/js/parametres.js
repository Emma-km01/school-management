// ==============================
// PAGE PARAMETRES
// ==============================


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


    // ==========================
    // REMPLIR LE PROFIL
    // ==========================

    const champNom =
        document.getElementById(
            "parametre-nom"
        );


    const champPrenom =
        document.getElementById(
            "parametre-prenom"
        );


    const champEmail =
        document.getElementById(
            "parametre-email"
        );


    const champTelephone =
        document.getElementById(
            "parametre-telephone"
        );


    const champRole =
        document.getElementById(
            "parametre-role"
        );


    if (champNom) {

        champNom.value =
            utilisateur.nom || "";

    }


    if (champPrenom) {

        champPrenom.value =
            utilisateur.prenom || "";

    }


    if (champEmail) {

        champEmail.value =
            utilisateur.email || "";

    }


    if (champTelephone) {

        champTelephone.value =
            utilisateur.telephone || "";

    }


    if (champRole) {

        champRole.value =
            utilisateur.role ||
            "Administrateur";

    }

}


// ==============================
// CHANGEMENT D'ONGLET
// ==============================

const onglets =
    document.querySelectorAll(
        ".onglet-parametre"
    );


const sections =
    document.querySelectorAll(
        ".section-parametre"
    );


onglets.forEach(
    function (onglet) {

        onglet.addEventListener(
            "click",
            function () {


                // ======================
                // RETIRER ACTIF
                // ======================

                onglets.forEach(
                    function (element) {

                        element.classList
                            .remove(
                                "actif"
                            );

                    }
                );


                sections.forEach(
                    function (section) {

                        section.classList
                            .remove(
                                "active"
                            );

                    }
                );


                // ======================
                // AJOUTER ACTIF
                // ======================

                this.classList.add(
                    "actif"
                );


                const sectionId =
                    this.dataset.section;


                const section =
                    document.getElementById(
                        sectionId
                    );


                if (section) {

                    section.classList.add(
                        "active"
                    );

                }

            }
        );

    }
);


// ==============================
// MODIFICATION DU PROFIL
// ==============================

const formulaireProfil =
    document.getElementById(
        "formulaire-profil"
    );


formulaireProfil.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const nom =
            document.getElementById(
                "parametre-nom"
            ).value.trim();


        const prenom =
            document.getElementById(
                "parametre-prenom"
            ).value.trim();


        const email =
            document.getElementById(
                "parametre-email"
            ).value.trim();


        const telephone =
            document.getElementById(
                "parametre-telephone"
            ).value.trim();


        const utilisateurModifie = {

            nom: nom,

            prenom: prenom,

            email: email,

            telephone: telephone,

            role:
                utilisateur?.role ||
                "Administrateur"

        };


        localStorage.setItem(
            "utilisateur",
            JSON.stringify(
                utilisateurModifie
            )
        );


        document.getElementById(
            "nom-utilisateur"
        ).textContent =
            nom || "Administrateur";


        alert(
            "Les informations du profil ont été enregistrées."
        );

    }
);


// ==============================
// MODIFICATION MOT DE PASSE
// ==============================

const formulaireSecurite =
    document.getElementById(
        "formulaire-securite"
    );


formulaireSecurite.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const ancien =
            document.getElementById(
                "ancien-mot-de-passe"
            ).value;


        const nouveau =
            document.getElementById(
                "nouveau-mot-de-passe"
            ).value;


        const confirmation =
            document.getElementById(
                "confirmation-nouveau-mot-de-passe"
            ).value;


        if (
            !ancien ||
            !nouveau ||
            !confirmation
        ) {

            alert(
                "Veuillez remplir tous les champs."
            );

            return;

        }


        if (
            nouveau.length < 6
        ) {

            alert(
                "Le nouveau mot de passe doit contenir au moins 6 caractères."
            );

            return;

        }


        if (
            nouveau !== confirmation
        ) {

            alert(
                "Les nouveaux mots de passe ne correspondent pas."
            );

            return;

        }


        alert(
            "Le mot de passe sera modifié lorsque cette page sera connectée au backend."
        );


        formulaireSecurite.reset();

    }
);


// ==============================
// REINITIALISER LES PARAMETRES
// ==============================

const boutonDanger =
    document.querySelector(
        ".bouton-danger"
    );


boutonDanger.addEventListener(
    "click",
    function () {

        const confirmation =
            confirm(
                "Voulez-vous vraiment réinitialiser les paramètres ?"
            );


        if (confirmation) {

            alert(
                "Les paramètres ont été réinitialisés."
            );

        }

    }
);