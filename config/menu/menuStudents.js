import { poserQuestion } from "../interface.js";
import { menuPrincipal } from "../menuPrincipal.js";

// Importations des services de consultation (Remonte de 2 niveaux avec ../../)
// Note : Les services spécifiques permettant à un étudiant de voir UNIQUEMENT ses données (filtrées par son ID) 
// ou de calculer sa moyenne seront importés ici dès que la logique des notes sera finalisée.

async function menuStudent() {
    console.clear();
    console.log("=========================================");
    console.log("       ESPACE ÉTUDIANT (ACCÈS LIMITÉ)    ");
    console.log("=========================================");
    console.log("1. Voir mes notes");
    console.log("2. Voir mes absences");
    console.log("3. Voir sa moyenne générale");
    console.log("4. Déconnexion");
    console.log("=========================================");

    const choix = await poserQuestion("Choisissez une option : ");

    switch (choix) {
        case '1':
            console.log("\n[Consultation de vos notes - En cours de développement...]");
            // Bientôt : listerNotesEtudiant(idEtudiant)
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuStudent();
            break;

        case '2':
            console.log("\n[Consultation de vos absences - En cours de développement...]");
            // Bientôt : listerAbsencesEtudiant(idEtudiant)
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuStudent();
            break;

        case '3':
            console.log("\n[Calcul de votre moyenne générale - En cours de développement...]");
            // Bientôt : calculerMoyenneEtudiant(idEtudiant)
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuStudent();
            break;

        case '4':
            console.log("\nDéconnexion réussie.");
            await menuPrincipal(); // Retour au menu d'accueil
            break;

        default:
            console.log("\n Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuStudent();
    }
}

export { menuStudent };