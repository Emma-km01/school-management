import { poserQuestion } from "../interface.js";
import { menuPrincipal } from "../menuPrincipal.js";
import { ajouterStudents, modifierStudents, supprimerStudents, listerStudents } from "../../services/servicesStudents.js";
import { ajouterTeachers, modifierTeachers, supprimerTeachers, listerTeachers } from "../../services/servicesTeachers.js";
import { ajouterSubjects, modifierSubjects, supprimerSubjects, listerSubjects } from "../../services/servicesSubjects.js";
import { ajouterGrades, modifierGrades, supprimerGrades, listerGrades } from "../../services/servicesGrades.js";
import { afficherAbsences } from "../../services/servicesAbsences.js";
import { ajouterUsers, modifierUsers, supprimerUsers, listerUsers } from "../../services/servicesUsers.js";

async function menuAdmin() {
    console.clear();
    console.log("=========================================");
    console.log("    ESPACE ADMINISTRATEUR (ACCÈS COMPLET)");
    console.log("=========================================");
    console.log("1. Gérer les Utilisateurs");
    console.log("2. Gérer les Étudiants");
    console.log("3. Gérer les Professeurs");
    console.log("4. Gérer les Matières");
    console.log("5. Gérer les Notes");
    console.log("6. Gérer les Absences");
    console.log("7. Déconnexion");
    console.log("=========================================");

    const choix = await poserQuestion("Choisissez une option : ");

    switch (choix) {
        case '1':
            await sousMenuUtilisateurs();
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
            await sousMenuNotes();
            break;
        case '6':
            await sousMenuAbsences();
            break;
        case '7':
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
// SOUS-MENUS
// =========================================================================

async function sousMenuUtilisateurs() {
    console.clear();
    console.log("--- GESTION DES UTILISATEURS ---");
    console.log("1. Lister les utilisateurs");
    console.log("2. Ajouter un utilisateur");
    console.log("3. Modifier un utilisateur");
    console.log("4. Supprimer un utilisateur");
    console.log("5. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            console.table(listerUsers());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        case '2':
            const name = await poserQuestion("Nom : ");
            const role = await poserQuestion("Rôle (admin/teacher/student) : ");
            const username = await poserQuestion("Identifiant : ");
            const motdepasse = await poserQuestion("Mot de passe : ");
            ajouterUsers(name, role, username, motdepasse);
            console.log("\n✔️ Utilisateur ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        case '3':
            const idModif = await poserQuestion("ID de l'utilisateur à modifier : ");
            const newName = await poserQuestion("Nouveau nom : ");
            const newRole = await poserQuestion("Nouveau rôle : ");
            const newUsername = await poserQuestion("Nouvel identifiant : ");
            const newMdp = await poserQuestion("Nouveau mot de passe : ");
            modifierUsers(parseInt(idModif), { name: newName, role: newRole, username: newUsername, motdepasse: newMdp });
            console.log("\n✔️ Utilisateur mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        case '4':
            const idSupp = await poserQuestion("ID de l'utilisateur à supprimer : ");
            supprimerUsers(parseInt(idSupp));
            console.log("\n✔️ Utilisateur supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        case '5':
            await menuAdmin();
            break;
        default:
            await sousMenuUtilisateurs();
    }
}

async function sousMenuEtudiants() {
    console.clear();
    console.log("--- GESTION DES ÉTUDIANTS ---");
    console.log("1. Lister les étudiants");
    console.log("2. Ajouter un étudiant");
    console.log("3. Modifier un étudiant");
    console.log("4. Supprimer un étudiant");
    console.log("5. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            console.table(listerStudents());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '2':
            const matricule = await poserQuestion("Matricule : ");
            const nom = await poserQuestion("Nom : ");
            const prenom = await poserQuestion("Prénom : ");
            const age = await poserQuestion("Âge : ");
            const classe = await poserQuestion("Classe : ");
            ajouterStudents(matricule, nom, prenom, parseInt(age), classe);
            console.log("\n✔️ Étudiant ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '3':
            const idModif = await poserQuestion("ID de l'étudiant à modifier : ");
            const newMatricule = await poserQuestion("Nouveau matricule : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newPrenom = await poserQuestion("Nouveau prénom : ");
            const newAge = await poserQuestion("Nouvel âge : ");
            const newClasse = await poserQuestion("Nouvelle classe : ");
            modifierStudents(parseInt(idModif), { matricule: newMatricule, nom: newNom, prenom: newPrenom, age: parseInt(newAge), classe: newClasse });
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
    console.log("5. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            console.table(listerTeachers());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '2':
            const nom = await poserQuestion("Nom : ");
            const matiere = await poserQuestion("Matière : ");
            ajouterTeachers(nom, matiere);
            console.log("\n✔️ Professeur ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '3':
            const idModif = await poserQuestion("ID du professeur à modifier : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newMatiere = await poserQuestion("Nouvelle matière : ");
            modifierTeachers(parseInt(idModif), { nom: newNom, matiere: newMatiere });
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
    console.log("5. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            console.table(listerSubjects());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '2':
            const nomMat = await poserQuestion("Nom de la matière : ");
            const idProf = await poserQuestion("ID Professeur (laisser vide si aucun) : ");
            ajouterSubjects(nomMat, idProf.trim() === "" ? null : parseInt(idProf));
            console.log("\n✔️ Matière ajoutée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '3':
            const idModif = await poserQuestion("ID de la matière : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newIdProf = await poserQuestion("Nouvel ID Professeur : ");
            modifierSubjects(parseInt(idModif), newNom, newIdProf.trim() === "" ? null : parseInt(newIdProf));
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

async function sousMenuNotes() {
    console.clear();
    console.log("--- GESTION DES NOTES ---");
    console.log("1. Lister toutes les notes");
    console.log("2. Ajouter une note");
    console.log("3. Modifier une note");
    console.log("4. Supprimer une note");
    console.log("5. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            console.table(listerGrades());
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        case '2':
            const studentId = await poserQuestion("ID Étudiant : ");
            const subjectId = await poserQuestion("ID Matière : ");
            const note = await poserQuestion("Note (0-20) : ");
            ajouterGrades(parseInt(studentId), parseInt(subjectId), parseFloat(note));
            console.log("\n✔️ Note ajoutée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        case '3':
            const idModif = await poserQuestion("ID de la note à modifier : ");
            const newNote = await poserQuestion("Nouvelle note (0-20) : ");
            modifierGrades(parseInt(idModif), { note: parseFloat(newNote) });
            console.log("\n✔️ Note mise à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        case '4':
            const idSupp = await poserQuestion("ID de la note à supprimer : ");
            supprimerGrades(parseInt(idSupp));
            console.log("\n✔️ Note supprimée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        case '5':
            await menuAdmin();
            break;
        default:
            await sousMenuNotes();
    }
}

async function sousMenuAbsences() {
    console.clear();
    console.log("--- GESTION DES ABSENCES ---");
    console.log("1. Afficher toutes les absences");
    console.log("2. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            const liste = afficherAbsences();
            if (liste.length === 0) console.log("Aucune absence.");
            else console.table(liste);
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuAbsences();
            break;
        case '2':
            await menuAdmin();
            break;
        default:
            await sousMenuAbsences();
    }
}

export { menuAdmin };