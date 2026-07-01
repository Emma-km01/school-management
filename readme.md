# School Management

Application de gestion d'école en ligne de commande (CLI), développée en Node.js avec une base de données SQLite. Elle permet de gérer les étudiants, professeurs, matières, notes et absences via un système de menus interactifs avec authentification par rôle.

## Prérequis

- Node.js v18+
- npm

## Installation

```bash
git clone <url-du-projet>
cd school-management
npm install
```

## Initialisation de la base de données

Lance le seed pour créer les tables et insérer des données de test :

```bash
node seed.mjs
```

## Lancement

```bash
node main.js
```

## Authentification

L'accès est protégé par un système de connexion. Chaque utilisateur est redirigé vers son espace selon son rôle.

| Rôle | Identifiant | Mot de passe | Accès |
|---|---|---|---|
| Administrateur | admin | 1234 | Accès complet |
| Enseignant | kone | 1234 | Notes, étudiants, absences |
| Étudiant | aminata | 1234 | Consultation uniquement |

## Structure du projet

school-management/
├── main.js               → Point d'entrée
├── seed.mjs              → Données de test
├── db/
│   ├── database.js       → Connexion SQLite
│   └── table.js          → Création des tables
├── models/
│   ├── modelsUsers.js
│   ├── modelsStudents.js
│   ├── modelsTeachers.js
│   ├── modelsSubjects.js
│   ├── modelsGrades.js
│   └── modelsAbsences.js
├── services/
│   ├── servicesUsers.js
│   ├── servicesStudents.js
│   ├── servicesTeachers.js
│   ├── servicesSubjects.js
│   ├── servicesGrades.js
│   ├── servicesAbsences.js
│   └── servicesStatistiques.js
├── utils/
│   └── logger.js         → Journalisation des actions
├── config/
│   ├── interface.js      → Lecture des entrées clavier
│   ├── connexion.js      → Vérification des identifiants
│   ├── menuPrincipal.js  → Menu d'accueil
│   └── menu/
│       ├── menuAdmin.js      → Espace administrateur
│       ├── menuTeacher.js    → Espace enseignant
│       └── menuStudent.js    → Espace étudiant
└── logs/
└── app.log           → Historique de toutes les actions

## Fonctionnalités

### Administrateur
- **Utilisateurs** — Ajout, modification, suppression avec gestion des rôles (admin, enseignant, étudiant)
- **Étudiants** — CRUD complet (matricule, nom, prénom, âge, classe)
- **Professeurs** — CRUD complet avec affectation aux matières
- **Gestion Académique**
  - *Matières* — Création et affectation à un professeur
  - *Notes* — Ajout, modification, suppression (valeur entre 0 et 20)
  - *Absences* — Consultation avec nom et prénom de l'étudiant
- **Statistiques**
  - Moyenne générale d'un étudiant
  - Moyenne par matière d'un étudiant
  - Nombre d'absences d'un étudiant
  - Classement des étudiants par moyenne
  - Statistiques globales (nb étudiants, enseignants, matières)

### Enseignant
- Consulter la liste des étudiants
- Consulter les matières
- Ajouter et modifier des notes
- Consulter les absences

### Étudiant
- Consulter ses notes
- Consulter ses absences
- Consulter sa moyenne générale

## Format des logs

Toutes les actions sont horodatées et enregistrées dans `logs/app.log` :
2026-06-30 10:15:00 [INFO] Étudiant ajouté : Traoré Aminata (matricule STU001)
2026-06-30 10:20:00 [WARNING] Note invalide rejetée : 25
2026-06-30 10:30:00 [ERROR] Erreur base de données
