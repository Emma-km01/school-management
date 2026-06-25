import { poserQuestion, rl } from "./interface.js";
import { verifierConnexion } from "./connexion.js";
import { menuAdmin } from "./menu/menuAdmin.js";
import { menuTeacher } from "./menu/menuTeachers.js";
import { menuStudent } from "./menu/menuStudents.js";

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
                        await menuAdmin();
                        break;
                    case "teacher":
                        await menuTeacher();
                        break;
                    case "student":
                        await menuStudent();
                        break;
                    default:
                        console.log("\n Rôle inconnu, retour au menu.");
                        await menuPrincipal();
                }
            } else {
                // Message + pause avant de retourner au menu (évite boucle silencieuse)
                await poserQuestion("\nAppuyez sur Entrée pour réessayer...");
                await menuPrincipal();
            }
            break;

        case '2':
            console.log("\nAu revoir !");
            rl.close();
            process.exit(0);

        default:
            console.log("\n Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuPrincipal();
    }
}

export { menuPrincipal };