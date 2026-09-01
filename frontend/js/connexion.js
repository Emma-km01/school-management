const formulaire = document.getElementById("formulaireConnexion");
const messageConnexion = document.getElementById("messageConnexion");

formulaire.addEventListener("submit", async (e) => {
    e.preventDefault();

    const identifiant = document.getElementById("identifiant").value;
    const motDePasse = document.getElementById("motDePasse").value;

    try {
        const reponse = await fetch("https://school-management-rtbo.onrender.com/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: identifiant,
                motdepasse: motDePasse
            })
        });

        const data = await reponse.json();

        if (!reponse.ok) {
            messageConnexion.textContent = data.message || "Erreur de connexion";
            messageConnexion.style.color = "red";
            return;
        }

        // Connexion réussie : on stocke l'utilisateur et son rôle
        localStorage.setItem("utilisateur", JSON.stringify(data.user));

        messageConnexion.textContent = "Connexion réussie, redirection...";
        messageConnexion.style.color = "green";

        // Redirection selon le rôle
        setTimeout(() => {
            if (data.user.role === "admin") {
                window.location.href = "tableau-bord.html";
            } else if (data.user.role === "teacher") {
                window.location.href = "tableau-bord.html";
            } else {
                window.location.href = "tableau-bord.html";
            }
        }, 800);

    } catch (err) {
        messageConnexion.textContent = "Impossible de contacter le serveur.";
        messageConnexion.style.color = "red";
        console.error(err);
    }
});