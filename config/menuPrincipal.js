import { poserQuestion, rl } from "./interface.js";
import { verifierConnexion } from "./connexion.js";
import { menuAdmin } from "./menu/menuAdmin.js";
import { menuTeacher } from "./menu/menuTeachers.js";
import { menuStudent } from "./menu/menuStudents.js";
import logger from "../utils/logger.js";

async function menuPrincipal() {
    console.clear();
    console.log("=========================================");
    console.log("       SYSTÈME DE GESTION D'ÉCOLE        ");
    console.log("=========================================");
    console.log("1. Connexion");
    console.log("2. Quitter");
    console.log("=========================================");

    const choix = await poserQuestion("Choisissez une option : ");

    switch (choix) {
        case '1':
            const role = await verifierConnexion();

            if (role) {
                await poserQuestion("\nAppuyez sur Entrée pour continuer...");
                switch (role) {
                    case "admin":
                        logger.info("Accès espace administrateur");
                        await menuAdmin();
                        break;
                    case "teacher":
                        logger.info("Accès espace enseignant");
                        await menuTeacher();
                        break;
                    case "student":
                        logger.info("Accès espace étudiant");
                        await menuStudent();
                        break;
                    default:
                        logger.warning(`Rôle inconnu : ${role}`);
                        await menuPrincipal();
                }
            } else {
                await poserQuestion("\nAppuyez sur Entrée pour réessayer...");
                await menuPrincipal();
            }
            break;

        case '2':
            logger.info("Fermeture du programme");
            console.log("\nAu revoir !");
            rl.close();
            process.exit(0);

        default:
            logger.warning(`Option invalide saisie : "${choix}" dans menuPrincipal`);
            console.log("\n Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuPrincipal();
    }
}

export { menuPrincipal };