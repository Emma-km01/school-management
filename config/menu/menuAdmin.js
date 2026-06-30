import { poserQuestion } from "../interface.js";
import { menuPrincipal } from "../menuPrincipal.js";
import { ajouterStudents, modifierStudents, supprimerStudents, listerStudents } from "../../services/servicesStudents.js";
import { ajouterTeachers, modifierTeachers, supprimerTeachers, listerTeachers } from "../../services/servicesTeachers.js";
import { ajouterSubjects, modifierSubjects, supprimerSubjects, listerSubjects } from "../../services/servicesSubjects.js";
import { ajouterGrades, modifierGrades, supprimerGrades, listerGrades } from "../../services/servicesGrades.js";
import { afficherAbsences } from "../../services/servicesAbsences.js";
import { ajouterUsers, modifierUsers, supprimerUsers, listerUsers } from "../../services/servicesUsers.js";
import logger from "../../utils/logger.js";

async function menuAdmin() {
    console.clear();
    console.log("=========================================");
    console.log("    ESPACE ADMINISTRATEUR (ACCÈS COMPLET)");
    console.log("=========================================");
    console.log("1. Gérer les Utilisateurs");
    console.log("2. Gérer les Étudiants");
    console.log("3. Gérer les Professeurs");
    console.log("4. Gestion Académique (Matières, Notes, Absences)");
    console.log("5. Déconnexion");
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
            await sousMenuAcademique();
            break;
        case '5':
            logger.info("Déconnexion de l'administrateur");
            console.log("\nDéconnexion réussie.");
            await menuPrincipal();
            break;
        default:
            logger.warning(`Option invalide dans menuAdmin : "${choix}"`);
            console.log("\n Option invalide.");
            await poserQuestion("\nAppuyez sur Entrée pour continuer...");
            await menuAdmin();
    }
}


// SOUS-MENU UTILISATEURS

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
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        case '2': {

            console.table(listerUsers());
            const name = await poserQuestion("Nom : ");
            const role = await poserQuestion("Rôle (admin/teacher/student) : ");
            const username = await poserQuestion("Identifiant : ");
            const motdepasse = await poserQuestion("Mot de passe : ");
            ajouterUsers(name, role, username, motdepasse);
            logger.info(`Utilisateur ajouté : ${name} (${role})`);
            console.log("\n Utilisateur ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        }
        case '3': {
            console.table(listerUsers()); 
            const idModif = await poserQuestion("ID de l'utilisateur à modifier : ");
            const newName = await poserQuestion("Nouveau nom : ");
            const newRole = await poserQuestion("Nouveau rôle : ");
            const newUsername = await poserQuestion("Nouvel identifiant : ");
            const newMdp = await poserQuestion("Nouveau mot de passe : ");
            modifierUsers(parseInt(idModif), { name: newName, role: newRole, username: newUsername, motdepasse: newMdp });
            logger.info(`Utilisateur modifié : ID ${idModif}`);
            console.log("\n Utilisateur mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        }
        case '4': {
            console.table(listerUsers());
            const idSupp = await poserQuestion("ID de l'utilisateur à supprimer : ");
            supprimerUsers(parseInt(idSupp));
            logger.info(`Utilisateur supprimé : ID ${idSupp}`);
            console.log("\n Utilisateur supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuUtilisateurs();
            break;
        }
        case '5':
            await menuAdmin();
            break;
        default:
            logger.warning(`Option invalide dans sousMenuUtilisateurs : "${choix}"`);
            await sousMenuUtilisateurs();
    }
}


// SOUS-MENU ÉTUDIANTS

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
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        case '2': {
            console.table(listerStudents());
            const matricule = await poserQuestion("Matricule : ");
            const nom = await poserQuestion("Nom : ");
            const prenom = await poserQuestion("Prénom : ");
            const age = await poserQuestion("Âge : ");
            const classe = await poserQuestion("Classe : ");
            ajouterStudents(matricule, nom, prenom, parseInt(age), classe);
            logger.info(`Étudiant ajouté : ${nom} ${prenom} (matricule ${matricule})`);
            console.log("\n Étudiant ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        }
        case '3': {
            console.table(listerStudents());
            const idModif = await poserQuestion("ID de l'étudiant à modifier : ");
            const newMatricule = await poserQuestion("Nouveau matricule : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newPrenom = await poserQuestion("Nouveau prénom : ");
            const newAge = await poserQuestion("Nouvel âge : ");
            const newClasse = await poserQuestion("Nouvelle classe : ");
            modifierStudents(parseInt(idModif), { matricule: newMatricule, nom: newNom, prenom: newPrenom, age: parseInt(newAge), classe: newClasse });
            logger.info(`Étudiant modifié : ID ${idModif}`);
            console.log("\n Étudiant mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        }
        case '4': {
            console.table(listerStudents());
            const idSupp = await poserQuestion("ID de l'étudiant à supprimer : ");
            supprimerStudents(parseInt(idSupp));
            logger.info(`Étudiant supprimé : ID ${idSupp}`);
            console.log("\n Étudiant supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuEtudiants();
            break;
        }
        case '5':
            await menuAdmin();
            break;
        default:
            logger.warning(`Option invalide dans sousMenuEtudiants : "${choix}"`);
            await sousMenuEtudiants();
    }
}


// SOUS-MENU PROFESSEURS

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
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        case '2': {
            console.table(listerTeachers());
            const nom = await poserQuestion("Nom : ");
            const matiere = await poserQuestion("Matière : ");
            ajouterTeachers(nom, matiere);
            logger.info(`Professeur ajouté : ${nom} (${matiere})`);
            console.log("\n Professeur ajouté !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        }
        case '3': {
            console.table(listerTeachers());
            const idModif = await poserQuestion("ID du professeur à modifier : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newMatiere = await poserQuestion("Nouvelle matière : ");
            modifierTeachers(parseInt(idModif), { nom: newNom, matiere: newMatiere });
            logger.info(`Professeur modifié : ID ${idModif}`);
            console.log("\n Professeur mis à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        }
        case '4': {
            console.table(listerTeachers());
            const idSupp = await poserQuestion("ID du professeur à supprimer : ");
            supprimerTeachers(parseInt(idSupp));
            logger.info(`Professeur supprimé : ID ${idSupp}`);
            console.log("\n Professeur supprimé !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuProfesseurs();
            break;
        }
        case '5':
            await menuAdmin();
            break;
        default:
            logger.warning(`Option invalide dans sousMenuProfesseurs : "${choix}"`);
            await sousMenuProfesseurs();
    }
}

// SOUS-MENU ACADÉMIQUE (regroupe Matières, Notes, Absences)

async function sousMenuAcademique() {
    console.clear();
    console.log("--- GESTION ACADÉMIQUE ---");
    console.log("1. Gérer les Matières");
    console.log("2. Gérer les Notes");
    console.log("3. Gérer les Absences");
    console.log("4. Retour au menu admin");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1':
            await sousMenuMatieres();
            break;
        case '2':
            await sousMenuNotes();
            break;
        case '3':
            await sousMenuAbsences();
            break;
        case '4':
            await menuAdmin();
            break;
        default:
            logger.warning(`Option invalide dans sousMenuAcademique : "${choix}"`);
            await sousMenuAcademique();
    }
}


// SOUS-MENU MATIÈRES

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
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        case '2': {
            console.table(listerSubjects());
            const nomMat = await poserQuestion("Nom de la matière : ");
            const idProf = await poserQuestion("ID Professeur (laisser vide si aucun) : ");
            ajouterSubjects(nomMat, idProf.trim() === "" ? null : parseInt(idProf));
            logger.info(`Matière ajoutée : ${nomMat}`);
            console.log("\n Matière ajoutée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        }
        case '3': {
            console.table(listerSubjects());
            const idModif = await poserQuestion("ID de la matière : ");
            const newNom = await poserQuestion("Nouveau nom : ");
            const newIdProf = await poserQuestion("Nouvel ID Professeur : ");
            modifierSubjects(parseInt(idModif), newNom, newIdProf.trim() === "" ? null : parseInt(newIdProf));
            logger.info(`Matière modifiée : ID ${idModif}`);
            console.log("\n Matière mise à jour !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        }
        case '4': {
            console.table(listerSubjects());
            const idSupp = await poserQuestion("ID de la matière à supprimer : ");
            supprimerSubjects(parseInt(idSupp));
            logger.info(`Matière supprimée : ID ${idSupp}`);
            console.log("\n Matière supprimée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuMatieres();
            break;
        }
        case '5':
            await sousMenuAcademique(); // retour vers le sous-menu académique
            break;
        default:
            logger.warning(`Option invalide dans sousMenuMatieres : "${choix}"`);
            await sousMenuMatieres();
    }
}


// SOUS-MENU NOTES

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
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        case '2': {
            console.table(listerStudents());
            console.table(listerSubjects());
            const studentId = await poserQuestion("ID Étudiant : ");
            const subjectId = await poserQuestion("ID Matière : ");
            const note = await poserQuestion("Note (0-20) : ");
            const result = ajouterGrades(parseInt(studentId), parseInt(subjectId), parseFloat(note));
            if (result === null) {
                logger.warning(`Note invalide rejetée : ${note}`);
            } else {
                logger.info(`Note ajoutée : ${note} pour étudiant ID ${studentId}`);
                console.log("\n Note ajoutée !");
            }
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        }
        case '3': {
            console.table(listerGrades());
            const idModif = await poserQuestion("ID de la note à modifier : ");
            const newStudentId = await poserQuestion("Nouvel ID Étudiant : ");
            const newSubjectId = await poserQuestion("Nouvel ID Matière : ");
            const newNote = await poserQuestion("Nouvelle note (0-20) : ");
            const result = modifierGrades(parseInt(idModif), {
                student_id: parseInt(newStudentId),
                subject_id: parseInt(newSubjectId),
                note: parseFloat(newNote)
            });
            if (result === null) {
                logger.warning(`Note invalide rejetée lors de la modification : ${newNote}`);
            } else {
                logger.info(`Note modifiée : ID ${idModif}`);
                console.log("\n Note mise à jour !");
            }
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        }
        case '4': {
            console.table(listerGrades());
            const idSupp = await poserQuestion("ID de la note à supprimer : ");
            supprimerGrades(parseInt(idSupp));
            logger.info(`Note supprimée : ID ${idSupp}`);
            console.log("\n Note supprimée !");
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuNotes();
            break;
        }
        case '5':
            await sousMenuAcademique(); // retour vers le sous-menu académique
            break;
        default:
            logger.warning(`Option invalide dans sousMenuNotes : "${choix}"`);
            await sousMenuNotes();
    }
}


// SOUS-MENU ABSENCES

async function sousMenuAbsences() {
    console.clear();
    console.log("--- GESTION DES ABSENCES ---");
    console.log("1. Afficher toutes les absences");
    console.log("2. Retour");

    const choix = await poserQuestion("\nChoisissez une option : ");
    switch (choix) {
        case '1': {
            logger.info("Consultation des absences par l'administrateur");
            if (liste.length === 0) console.log("Aucune absence.");
            else console.table(liste);
            await poserQuestion("\nAppuyez sur Entrée...");
            await sousMenuAbsences();
            break;
        }
        case '2':
            await sousMenuAcademique(); // retour vers le sous-menu académique
            break;
        default:
            logger.warning(`Option invalide dans sousMenuAbsences : "${choix}"`);
            await sousMenuAbsences();
    }
}

export { menuAdmin };