import readline from "readline"; 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const poserQuestion = (question) => new Promise((resolve) => rl.question(question, resolve));

// On exporte la fonction pour poser les questions ET l'instance rl 
// pour pouvoir fermer proprement le programme (rl.close()) depuis les autres fichiers si besoin.
export { poserQuestion, rl };