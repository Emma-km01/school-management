import Database from "better-sqlite3" ;

const db = new Database("database.db") ;

const loulou = `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY,
    matricule TEXT,
    nom TEXT,
    prenom TEXT,
    age INTEGER,
    classe TEXT
    )
` ;

db.exec(loulou);

const nanou = db.prepare(`
    INSERT INTO users(matricule, nom, prenom, age, classe)
    VALUES(?, ?, ?, ?, ?)
`) ;

nanou.run('MAT00001', 'Koffi', 'Bodouin', 18, '3eme') ;

const rows = db.prepare('SELECT * FROM users').all() ; 

console.log(rows) ;

// module.exports = db ;