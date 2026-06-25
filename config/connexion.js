import { poserQuestion } from "./interface.js";
import { listerUsers } from "../services/servicesUsers.js";

async function verifierConnexion() {
    console.log("\n--- CONNEXION REQUISE ---");
    const identifiant = await poserQuestion("Identifiant : ");
    const motDePasse = await poserQuestion("Mot de passe : ");

    // Récupération des utilisateurs depuis le service
    const users = listerUsers();
    
    // CORRECTION : On compare maintenant avec u.name au lieu de u.username
    const user = users.find(
        (u) => u.username === identifiant && u.motdepasse === motDePasse
    );

    if (user) {
        console.log(`\n Connexion réussie en tant que ${user.name} (${user.role})`);
        return user.role; // Renvoie "admin", "teacher" ou "student"
    } else {
        console.log("\n Identifiant ou mot de passe incorrect.");
        return null;
    }
}

export { verifierConnexion };