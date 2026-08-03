import express from "express";
import routesStudents from "./routes/routesStudents.js"

const app = express();

app.use(express.json());

app.use("/students", routesStudents);

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
