// utils/logger.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Chemin absolu vers la racine du projet
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.resolve(__dirname, "../logs");

// Création du dossier logs s'il n'existe pas
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, "app.log");

function getDate() {
    return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function ecrire(level, message) {
    const ligne = `${getDate()} [${level}] ${message}\n`;
    fs.appendFileSync(logFile, ligne, "utf8");
    console.log(ligne.trim());
}

const logger = {
    info:    (message) => ecrire("INFO",    message),
    warning: (message) => ecrire("WARNING", message),
    error:   (message) => ecrire("ERROR",   message),
};

export default logger;