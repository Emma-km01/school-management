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
├── db/                   → Connexion et création des tables SQLite
├── models/               → Classes représentant les entités
├── services/             → Logique métier (CRUD) pour chaque entité
├── utils/
│   └── logger.js         → Journalisation des actions
├── config/
│   ├── interface.js      → Lecture des entrées clavier
│   ├── connexion.js      → Vérification des identifiants
│   ├── menuPrincipal.js  → Menu d'accueil
│   └── menu/             → Menus par rôle (admin, enseignant, étudiant)
└── logs/
└── app.log           → Historique de toutes les actions

## Fonctionnalités

- **Utilisateurs** — Ajout, modification, suppression avec gestion des rôles
- **Étudiants** — CRUD complet (matricule, nom, prénom, âge, classe)
- **Professeurs** — CRUD complet avec affectation aux matières
- **Matières** — Création et affectation à un professeur
- **Notes** — Ajout, modification, suppression et calcul de moyenne (0-20)
- **Absences** — Enregistrement avec statut justifiée / non justifiée
- **Statistiques** — Moyenne générale, classement des étudiants, comptage des absences
- **Logs** — Toutes les actions sont horodatées et enregistrées dans `logs/app.log`

## Format des logs

2026-06-30 10:15:00 [INFO] Étudiant ajouté : Traoré Aminata (matricule STU001)
2026-06-30 10:20:00 [WARNING] Note invalide rejetée : 25
2026-06-30 10:30:00 [ERROR] Erreur base de données