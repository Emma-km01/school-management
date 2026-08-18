
/* =========================================
   RÉCUPÉRATION DES ÉLÉMENTS
========================================= */

const formulaireConnexion =
    document.getElementById("formulaireConnexion");


const champIdentifiant =
    document.getElementById("identifiant");


const champMotDePasse =
    document.getElementById("motDePasse");


const selectionRole =
    document.getElementById("role");


const boutonAfficherMotDePasse =
    document.getElementById(
        "boutonAfficherMotDePasse"
    );


const boutonConnexion =
    document.getElementById(
        "boutonConnexion"
    );


const messageConnexion =
    document.getElementById(
        "messageConnexion"
    );



/* =========================================
   AFFICHER / MASQUER LE MOT DE PASSE
========================================= */

boutonAfficherMotDePasse.addEventListener(
    "click",
    () => {

        if (
            champMotDePasse.type ===
            "password"
        ) {

            champMotDePasse.type = "text";


            boutonAfficherMotDePasse.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';


            boutonAfficherMotDePasse.setAttribute(
                "aria-label",
                "Masquer le mot de passe"
            );

        } else {

            champMotDePasse.type =
                "password";


            boutonAfficherMotDePasse.innerHTML =
                '<i class="fa-regular fa-eye"></i>';


            boutonAfficherMotDePasse.setAttribute(
                "aria-label",
                "Afficher le mot de passe"
            );

        }

    }
);



/* =========================================
   SOUMISSION DU FORMULAIRE
========================================= */

formulaireConnexion.addEventListener(
    "submit",
    (evenement) => {

        evenement.preventDefault();


        /* Récupération des valeurs */

        const identifiant =
            champIdentifiant.value.trim();


        const motDePasse =
            champMotDePasse.value.trim();


        const role =
            selectionRole.value;



        /* ==============================
           VALIDATION IDENTIFIANT
        =============================== */

        if (!identifiant) {

            afficherMessage(
                "Veuillez entrer votre identifiant.",
                "erreur"
            );

            champIdentifiant.focus();

            return;
        }



        /* ==============================
           VALIDATION MOT DE PASSE
        =============================== */

        if (!motDePasse) {

            afficherMessage(
                "Veuillez entrer votre mot de passe.",
                "erreur"
            );

            champMotDePasse.focus();

            return;
        }



        /* ==============================
           VALIDATION RÔLE
        =============================== */

        if (!role) {

            afficherMessage(
                "Veuillez sélectionner votre rôle.",
                "erreur"
            );

            selectionRole.focus();

            return;
        }



        /* ==============================
           POUR LE MOMENT
        =============================== */

        afficherMessage(
            "Formulaire valide. La connexion sera bientôt reliée au serveur.",
            "succes"
        );


        /*
            IMPORTANT :

            Pour le moment, nous ne faisons
            aucune vérification dans SQLite.

            Plus tard :

            formulaire
                ↓
            API Express
                ↓
            controllerUsers.js
                ↓
            servicesUsers.js
                ↓
            SQLite
                ↓
            utilisateur
                ↓
            dashboard correspondant au rôle
        */


        console.log(
            "Identifiant :",
            identifiant
        );


        console.log(
            "Rôle :",
            role
        );

    }
);



/* =========================================
   FONCTION AFFICHER MESSAGE
========================================= */

function afficherMessage(
    message,
    type
) {

    messageConnexion.textContent =
        message;


    if (type === "erreur") {

        messageConnexion.style.color =
            "#e63946";

    } else {

        messageConnexion.style.color =
            "#7135e7";

    }

}



/* =========================================
   EFFACER LE MESSAGE LORS DE LA SAISIE
========================================= */

champIdentifiant.addEventListener(
    "input",
    effacerMessage
);


champMotDePasse.addEventListener(
    "input",
    effacerMessage
);


selectionRole.addEventListener(
    "change",
    effacerMessage
);



function effacerMessage() {

    messageConnexion.textContent = "";

}

