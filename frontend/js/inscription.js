// ==============================
// PAGE INSCRIPTION
// ==============================


// ==============================
// ELEMENTS
// ==============================

const formulaire =
    document.getElementById(
        "formulaire-inscription"
    );


const motDePasse =
    document.getElementById(
        "mot-de-passe"
    );


const confirmationMotDePasse =
    document.getElementById(
        "confirmation-mot-de-passe"
    );


const message =
    document.getElementById(
        "message-inscription"
    );


// ==============================
// AFFICHER / CACHER MOT DE PASSE
// ==============================

document
    .getElementById(
        "afficher-mot-de-passe"
    )
    .addEventListener(
        "click",
        function () {

            if (
                motDePasse.type ===
                "password"
            ) {

                motDePasse.type =
                    "text";

                this.innerHTML =
                    `
                    <i class="fa-regular fa-eye-slash"></i>
                    `;

            } else {

                motDePasse.type =
                    "password";

                this.innerHTML =
                    `
                    <i class="fa-regular fa-eye"></i>
                    `;

            }

        }
    );


// ==============================
// AFFICHER / CACHER CONFIRMATION
// ==============================

document
    .getElementById(
        "afficher-confirmation"
    )
    .addEventListener(
        "click",
        function () {

            if (
                confirmationMotDePasse.type ===
                "password"
            ) {

                confirmationMotDePasse.type =
                    "text";

                this.innerHTML =
                    `
                    <i class="fa-regular fa-eye-slash"></i>
                    `;

            } else {

                confirmationMotDePasse.type =
                    "password";

                this.innerHTML =
                    `
                    <i class="fa-regular fa-eye"></i>
                    `;

            }

        }
    );


// ==============================
// AFFICHER MESSAGE
// ==============================

function afficherMessage(
    texte,
    type
) {

    message.textContent =
        texte;

    message.className =
        "message-inscription "
        + type;

}


// ==============================
// EFFACER MESSAGE
// ==============================

function effacerMessage() {

    message.textContent = "";

    message.className =
        "message-inscription";

}


// ==============================
// INSCRIPTION
// ==============================

formulaire.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        effacerMessage();


        // ==========================
        // RÉCUPÉRATION
        // ==========================

        const nom =
            document
                .getElementById("nom")
                .value
                .trim();


        const prenom =
            document
                .getElementById("prenom")
                .value
                .trim();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const telephone =
            document
                .getElementById("telephone")
                .value
                .trim();


        const role =
            document
                .getElementById("role")
                .value;


        const motDePasseValeur =
            motDePasse.value;


        const confirmation =
            confirmationMotDePasse.value;


        // ==========================
        // VALIDATION
        // ==========================

        if (
            !nom ||
            !prenom ||
            !email ||
            !role ||
            !motDePasseValeur ||
            !confirmation
        ) {

            afficherMessage(
                "Veuillez remplir tous les champs obligatoires.",
                "erreur"
            );

            return;

        }


        // ==========================
        // MOT DE PASSE
        // ==========================

        if (
            motDePasseValeur.length < 6
        ) {

            afficherMessage(
                "Le mot de passe doit contenir au moins 6 caractères.",
                "erreur"
            );

            return;

        }


        // ==========================
        // CONFIRMATION
        // ==========================

        if (
            motDePasseValeur !==
            confirmation
        ) {

            afficherMessage(
                "Les mots de passe ne correspondent pas.",
                "erreur"
            );

            return;

        }


        // ==========================
        // DONNÉES
        // ==========================

        const utilisateur = {

            nom: nom,

            prenom: prenom,

            email: email,

            telephone: telephone,

            role: role

        };


        // ==========================
        // STOCKAGE TEMPORAIRE
        // ==========================

        localStorage.setItem(
            "utilisateur",
            JSON.stringify(
                utilisateur
            )
        );


        // ==========================
        // SUCCÈS
        // ==========================

        afficherMessage(
            "Votre compte a été créé avec succès.",
            "succes"
        );


        // ==========================
        // REDIRECTION
        // ==========================

        setTimeout(
            function () {

                window.location.href =
                    "index.html";

            },
            1500
        );

    }
);