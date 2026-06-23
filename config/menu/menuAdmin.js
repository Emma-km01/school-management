import { poserQuestion } from "../interface.js";
import { menuPrincipal } from "../menuPrincipal.js";

// Importation de tous les services nécessaires
import { poserQuestion } from "../interface.js";                           // ✅ 1 niveau
import { ajouterStudents, modifierStudents, supprimerStudents, rechercherStudents, listerStudents } from "../../services/servicesStudents.js"; // ✅ 2 niveaux
import { ajouterTeachers, modifierTeachers, supprimerTeachers, rechercherTeachers, listerTeachers } from "../../services/servicesTeachers.js"; // ✅ 2 niveaux
import { ajouterSubjects, affecterSubjects, modifierSubjects, supprimerSubjects, listerSubjects } from "../../services/servicesSubjects.js"; // ✅ 2 niveaux
import { ajouterGrades, modifierGrades, supprimerGrades, listerGrades, calculerGrades }   from "../../services/servicesGrades.js";   // ✅ 2 niveaux
import { enregistrerAbsences, afficherAbsences, consulterAbsences, supprimerAbsences, absencesParEtudiant } from "../../services/servicesAbsences.js"; // ✅ 2 niveaux
import { ajouterUsers, modifierUsers, supprimerUsers, rechercherUsers, listerUsers  }    from "../../services/servicesUsers.js";    // ✅ 2 niveaux

async function menuAdmin() {
    console.clear();
    console.log("=========================================");
    console.log("       ESPACE ADMINISTRATEUR (ACCÈS COMPLET)      ");
    console.log("=========================================");
    console.log("1. Gérer les Utilisateurs");
    console.log("2. Gérer les Étudiants");
    console.log("3. Gérer les Professeurs");
    console.log("4. Gérer les Matières");
    console.log("5. Gérer les Notes");
    console.log("6. Gérer les Absences");
    console.log("7. Consulter les Statistiques");
    console.log("8. Déconnexion");
    console.log("=========================================");

    const choix = await poserQuestion("Choisissez une option : ");

    switch (choix) {
        case '1':
            console.log("\n[Gestion des Utilisateurs en cours de développement...]");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
            break;

        case '2':
            await sousMenuEtudiants();
            break;

        case '3':
            await sousMenuProfesseurs();
            break;

        case '4':
            await sousMenuMatieres();
            break;

        case '5':
            console.log("\n[Gestion des Notes en cours de développement...]");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
            break;

        case '6':
            console.log("\n--- LISTE DES ABSENCES ---");
            const listeAbs = afficherAbsences();
            if (listeAbs.length === 0) console.log("Aucune absence."); else console.table(listeAbs);
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
            break;

        case '7':
            console.log("\n[Consultation des Statistiques en cours de développement...]");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
            break;

        case '8':
            console.log("\nDéconnexion réussie.");
            await menuPrincipal();
            break;

        default:
            console.log("\n❌ Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
    }
}

// =========================================================================
// SOUS-MENUS DE GESTION COMPLETS (CRUD)
// =========================================================================

async function sousMenuEtudiants() {
    console.clear();
    console.log("--- GESTION DES ÉTUDIANTS ---");
    console.log("1. Lister les étudiants");
    console.log("2. Ajouter un étudiant");
    console.log("3. Modifier un étudiant");
    console.log("4. Supprimer un étudiant");
    console.log("5. Retour au menu admin");
    
    const choix = await poserQuestion("\nChoisissez une option : ");
    switch(choix) {
        case '1':
            console.table(listerStudents());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '2':
            const nom = await poserQuestion("Nom : ");
            const prenom = await poserQuestion("Prénom : ");
            const classe = await poserQuestion("Classe : ");
            ajouterStudents(nom, prenom, classe);
            console.log("\n✔️ Étudiant ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '3':
            const idModif = await poserQuestion("ID de l'étudiant à modifier : ");
            const newNom = await poserQuestion("Nouveau Nom : ");
            const newPrenom = await poserQuestion("Nouveau Prénom : ");
            const newClasse = await poserQuestion("Nouvelle Classe : ");
            modifierStudents(parseInt(idModif), newNom, newPrenom, newClasse);
            console.log("\n✔️ Étudiant mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '4':
            const idSupp = await poserQuestion("ID de l'étudiant à supprimer : ");
            supprimerStudents(parseInt(idSupp));
            console.log("\n✔️ Étudiant supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '5':
            await menuAdmin();
            break;
        default:
            await sousMenuEtudiants();
    }
}

async function sousMenuProfesseurs() {
    console.clear();
    console.log("--- GESTION DES PROFESSEURS ---");
    console.log("1. Lister les professeurs");
    console.log("2. Ajouter un professeur");
    console.log("3. Modifier un professeur");
    console.log("4. Supprimer un professeur");
    console.log("5. Retour au menu admin");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch(choix) {
        case '1':
            console.table(listerTeachers());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '2':
            const nom = await poserQuestion("Nom : ");
            const prenom = await poserQuestion("Prénom : ");
            ajouterTeachers(nom, prenom);
            console.log("\n✔️ Professeur ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '3':
            const idModif = await poserQuestion("ID du professeur à modifier : ");
            const newNom = await poserQuestion("Nouveau Nom : ");
            const newPrenom = await poserQuestion("Nouveau Prénom : ");
            modifierTeachers(parseInt(idModif), newNom, newPrenom);
            console.log("\n✔️ Professeur mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '4':
            const idSupp = await poserQuestion("ID du professeur à supprimer : ");
            supprimerTeachers(parseInt(idSupp));
            console.log("\n✔️ Professeur supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '5':
            await menuAdmin();
            break;
        default:
            await sousMenuProfesseurs();
    }
}

async function sousMenuMatieres() {
    console.clear();
    console.log("--- GESTION DES MATIÈRES ---");
    console.log("1. Lister les matières");
    console.log("2. Ajouter une matière");
    console.log("3. Modifier une matière");
    console.log("4. Supprimer une matière");
    console.log("5. Retour au menu admin");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch(choix) {
        case '1':
            console.table(listerSubjects());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '2':
            const nomMat = await poserQuestion("Nom de la matière : ");
            const idProf = await poserQuestion("ID Professeur référent (laisser vide si aucun) : ");
            const teacherId = idProf.trim() === "" ? null : parseInt(idProf);
            ajouterSubjects(nomMat, teacherId);
            console.log("\n✔️ Matière ajoutée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '3':
            const idModif = await poserQuestion("ID de la matière : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newIdProf = await poserQuestion("Nouvel ID Professeur : ");
            const upTeacherId = newIdProf.trim() === "" ? null : parseInt(newIdProf);
            modifierSubjects(parseInt(idModif), newNom, upTeacherId);
            console.log("\n✔️ Matière mise à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '4':
            const idSupp = await poserQuestion("ID de la matière à supprimer : ");
            supprimerSubjects(parseInt(idSupp));
            console.log("\n✔️ Matière supprimée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '5':
            await menuAdmin();
            break;
        default:
            await sousMenuMatieres();
    }
}

export { menuAdmin };