const API = "http://localhost:3000";


// ELEMENTS

const formulaire = document.getElementById("formulaire-inscription");
const motDePasse = document.getElementById("mot-de-passe");
const confirmationMotDePasse = document.getElementById("confirmation-mot-de-passe");
const message = document.getElementById("message-inscription");


// AFFICHER / CACHER MOT DE PASSE

document.getElementById("afficher-mot-de-passe").addEventListener("click", function () {
    if (motDePasse.type === "password") {
        motDePasse.type = "text";
        this.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    } else {
        motDePasse.type = "password";
        this.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    }
});


// AFFICHER / CACHER CONFIRMATION

document.getElementById("afficher-confirmation").addEventListener("click", function () {
    if (confirmationMotDePasse.type === "password") {
        confirmationMotDePasse.type = "text";
        this.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
    } else {
        confirmationMotDePasse.type = "password";
        this.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    }
});


// AFFICHER / EFFACER MESSAGE

function afficherMessage(texte, type) {
    message.textContent = texte;
    message.className = "message-inscription " + type;
}

function effacerMessage() {
    message.textContent = "";
    message.className = "message-inscription";
}


// INSCRIPTION

formulaire.addEventListener("submit", async function (event) {

    event.preventDefault();
    effacerMessage();

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const motDePasseValeur = motDePasse.value;
    const confirmation = confirmationMotDePasse.value;

    // Validation
    if (!nom || !prenom || !email || !role || !motDePasseValeur || !confirmation) {
        afficherMessage("Veuillez remplir tous les champs obligatoires.", "erreur");
        return;
    }

    if (motDePasseValeur.length < 6) {
        afficherMessage("Le mot de passe doit contenir au moins 6 caractères.", "erreur");
        return;
    }

    if (motDePasseValeur !== confirmation) {
        afficherMessage("Les mots de passe ne correspondent pas.", "erreur");
        return;
    }

    // Mappage rôle formulaire -> rôle backend
    const roleBackend = role === "administrateur" ? "admin" : "teacher";

    try {
        const reponse = await fetch(`${API}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${nom} ${prenom}`,
                role: roleBackend,
                username: email,
                motdepasse: motDePasseValeur
            })
        });

        const data = await reponse.json();

        if (!reponse.ok) {
            afficherMessage(data.message || "Erreur lors de l'inscription.", "erreur");
            return;
        }

        afficherMessage("Votre compte a été créé avec succès.", "succes");

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1500);

    } catch (err) {
        console.error(err);
        afficherMessage("Impossible de contacter le serveur.", "erreur");
    }
});