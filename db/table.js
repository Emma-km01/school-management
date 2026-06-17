import db from "./database.js";

// 1. CRÉATION DES TABLES

const users = `
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        role TEXT NOT NULL,
        motdepasse TEXT NOT NULL
    )
` ;
db.exec(users);

const students = `
    CREATE TABLE IF NOT EXISTS students(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        matricule TEXT NOT NULL,
        nom TEXT NOT NULL,
        prenom TEXT NOT NULL,
        age INTEGER NOT NULL,
        classe TEXT NOT NULL
    )
` ;
db.exec(students);

const teachers = `
    CREATE TABLE IF NOT EXISTS teachers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT UNIQUE NOT NULL,
        matiere TEXT NOT NULL
    )
`;
db.exec(teachers);


const subjects = `
    CREATE TABLE IF NOT EXISTS subjects(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT UNIQUE NOT NULL,
        teacher_id INTEGER,
        FOREIGN KEY (teacher_id) REFERENCES teachers(id)
    )
`;
db.exec(subjects);

const grades = `
    CREATE TABLE IF NOT EXISTS grades(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        subject_id INTEGER,
        note REAL NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id),
        FOREIGN KEY (subject_id) REFERENCES subjects(id)
    )
`;
db.exec(grades);

const absences = `
    CREATE TABLE IF NOT EXISTS absences(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        date TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(id)
    )
`;
db.exec(absences);

const nowDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

// 2. PRÉPARATION DES REQUÊTES (Préparer d'abord)

const insertUsers = db.prepare(`
    INSERT INTO users(name, role, motdepasse)
    VALUES(?, ?, ?)
`);

const insertStudents = db.prepare(`
    INSERT INTO students(matricule, nom, prenom, age, classe)
    VALUES(?, ?, ?, ?, ?)
`);

const insertTeachers = db.prepare(`
    INSERT INTO teachers(nom, matiere)
    VALUES(?, ?)
`);

const insertSubjects = db.prepare(`
    INSERT INTO subjects(nom, teacher_id)
    VALUES(?, ?)
    
`);

const insertGrades = db.prepare(`
    INSERT INTO grades(student_id, subject_id, note)
    VALUES(?, ?, ?)
    
`);

const insertAbsences = db.prepare(`
    INSERT INTO absences(student_id, date, status)
    VALUES(?, ?, ?)
    
`);

supprimerStudents(26)