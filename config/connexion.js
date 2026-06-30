import { poserQuestion } from "./interface.js";
import { listerUsers } from "../services/servicesUsers.js";
import logger from "../utils/logger.js";

async function verifierConnexion() {
    console.log("\n--- CONNEXION REQUISE ---");
    const identifiant = await poserQuestion("Identifiant : ");
    const motDePasse = await poserQuestion("Mot de passe : ");

    const users = listerUsers();
    const user = users.find(
        (u) => u.username === identifiant && u.motdepasse === motDePasse
    );

    if (user) {
        logger.info(`Connexion réussie : ${user.name} (${user.role})`);
        console.log(`\n Connexion réussie en tant que ${user.name} (${user.role})`);
        return user.role;
    } else {
        logger.warning(`Tentative de connexion échouée : identifiant "${identifiant}"`);
        console.log("\n Identifiant ou mot de passe incorrect.");
        return null;
    }
}

export { verifierConnexion };