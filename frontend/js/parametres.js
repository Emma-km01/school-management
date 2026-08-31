const API = "http://localhost:3000";


// UTILISATEUR CONNECTÉ

let utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

if (!utilisateur) {
    window.location.href = "index.html";
}

document.getElementById("nom-utilisateur").textContent = utilisateur.name;
document.getElementById("role-utilisateur").textContent = utilisateur.role;


// REMPLIR LE PROFIL

const champNom = document.getElementById("parametre-nom");
const champPrenom = document.getElementById("parametre-prenom");
const champEmail = document.getElementById("parametre-email");
const champTelephone = document.getElementById("parametre-telephone");
const champRole = document.getElementById("parametre-role");

champNom.value = utilisateur.name || "";
champEmail.value = utilisateur.username || "";
champRole.value = utilisateur.role || "";


// CHANGEMENT D'ONGLET

const onglets = document.querySelectorAll(".onglet-parametre");
const sections = document.querySelectorAll(".section-parametre");

onglets.forEach(function (onglet) {
    onglet.addEventListener("click", function () {

        onglets.forEach((element) => element.classList.remove("actif"));
        sections.forEach((section) => section.classList.remove("active"));

        this.classList.add("actif");

        const sectionId = this.dataset.section;
        const section = document.getElementById(sectionId);
        if (section) section.classList.add("active");
    });
});


// MODIFICATION DU PROFIL

const formulaireProfil = document.getElementById("formulaire-profil");

formulaireProfil.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nom = champNom.value.trim();
    const email = champEmail.value.trim();

    if (!nom || !email) {
        alert("Le nom et l'email sont obligatoires.");
        return;
    }

    try {
        const reponse = await fetch(`${API}/users/${utilisateur.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: nom,
                role: utilisateur.role,
                username: email,
                motdepasse: utilisateur.motdepasse
            })
        });

        if (!reponse.ok) {
            alert("Erreur lors de la mise à jour.");
            return;
        }

        // Mise à jour locale
        utilisateur.name = nom;
        utilisateur.username = email;
        localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

        document.getElementById("nom-utilisateur").textContent = nom;

        alert("Les informations du profil ont été enregistrées.");

    } catch (err) {
        console.error(err);
        alert("Impossible de contacter le serveur.");
    }
});


// MODIFICATION MOT DE PASSE

const formulaireSecurite = document.getElementById("formulaire-securite");

formulaireSecurite.addEventListener("submit", async function (event) {
    event.preventDefault();

    const ancien = document.getElementById("ancien-mot-de-passe").value;
    const nouveau = document.getElementById("nouveau-mot-de-passe").value;
    const confirmation = document.getElementById("confirmation-nouveau-mot-de-passe").value;

    if (!ancien || !nouveau || !confirmation) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (nouveau.length < 6) {
        alert("Le nouveau mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    if (nouveau !== confirmation) {
        alert("Les nouveaux mots de passe ne correspondent pas.");
        return;
    }

    // Vérifie l'ancien mot de passe via la route login
    try {
        const verifReponse = await fetch(`${API}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: utilisateur.username, motdepasse: ancien })
        });

        if (!verifReponse.ok) {
            alert("L'ancien mot de passe est incorrect.");
            return;
        }

        const majReponse = await fetch(`${API}/users/${utilisateur.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: utilisateur.name,
                role: utilisateur.role,
                username: utilisateur.username,
                motdepasse: nouveau
            })
        });

        if (!majReponse.ok) {
            alert("Erreur lors du changement de mot de passe.");
            return;
        }

        utilisateur.motdepasse = nouveau;
        localStorage.setItem("utilisateur", JSON.stringify(utilisateur));

        alert("Mot de passe modifié avec succès.");
        formulaireSecurite.reset();

    } catch (err) {
        console.error(err);
        alert("Impossible de contacter le serveur.");
    }
});


// REINITIALISER LES PARAMETRES

const boutonDanger = document.querySelector(".bouton-danger");

boutonDanger.addEventListener("click", function () {
    const confirmation = confirm("Voulez-vous vraiment réinitialiser les paramètres ?");
    if (confirmation) {
        alert("Les paramètres ont été réinitialisés.");
    }
});