import { poserQuestion } from "../interface.js";
import { menuPrincipal } from "../menuPrincipal.js";

// Importations des services autorisés pour les profs (Remonte de 2 niveaux avec ../../)
import { listerStudents } from "../../services/servicesStudents.js";
import { listerSubjects } from "../../services/servicesSubjects.js";
import { afficherAbsences } from "../../services/servicesAbsences.js";
// Note : Tes services pour ajouter/modifier les notes seront importés ici dès qu'ils seront prêts

async function menuTeacher() {
    console.clear();
    console.log("=========================================");
    console.log("       ESPACE ENSEIGNANT (ACCÈS LIMITÉ)  ");
    console.log("=========================================");
    console.log("1. Consulter la liste des étudiants");
    console.log("2. Consulter les matières");
    console.log("3. Ajouter des notes");
    console.log("4. Modifier des notes");
    console.log("5. Consulter les absences");
    console.log("6. Déconnexion");
    console.log("=========================================");

    const choix = await poserQuestion("Choisissez une option : ");

    switch (choix) {
        case '1':
            console.log("\n--- LISTE DES ÉTUDIANTS ---");
            const listeEtudiants = listerStudents();
            if (listeEtudiants.length === 0) {
                console.log("Aucun étudiant enregistré.");
            } else {
                console.table(listeEtudiants);
            }
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
            break;

        case '2':
            console.log("\n--- LISTE DES MATIÈRES ---");
            const listeMat = listerSubjects();
            if (listeMat.length === 0) {
                console.log("Aucune matière enregistrée.");
            } else {
                console.table(listeMat);
            }
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
            break;

        case '3':
            console.log("\n[Ajout de note - En cours de développement...]");
            // Bientôt : appeler une fonction comme ajouterNote()
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
            break;

        case '4':
            console.log("\n[Modification de note - En cours de développement...]");
            // Bientôt : appeler une fonction comme modifierNote()
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
            break;

        case '5':
            console.log("\n--- REGISTRE DES ABSENCES ---");
            const registres = afficherAbsences();
            if (registres.length === 0) {
                console.log("Aucune absence signalée.");
            } else {
                console.table(registres);
            }
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
            break;

        case '6':
            console.log("\nDéconnexion réussie.");
            await menuPrincipal(); // Retour au menu d'accueil
            break;

        default:
            console.log("\n❌ Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuTeacher();
    }
}

export { menuTeacher };