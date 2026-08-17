import express from "express";
import routesStudents from "./routes/routesStudents.js"
import routesTeachers from "./routes/routesTeachers.js";
import routesSubjects from "./routes/routesSubjects.js";
import routesGrades from "./routes/routesGrades.js";
import routesAbsences from "./routes/routesAbsences.js";
import routesUsers from "./routes/routesUsers.js";
import routesStatistiques from "./routes/routesStatistiques.js";

const app = express();

app.use(express.json());

app.use("/students", routesStudents);
app.use("/teachers", routesTeachers);
app.use("/subjects", routesSubjects);
app.use("/grades", routesGrades);
app.use("/absences", routesAbsences);
app.use("/users", routesUsers);
app.use("/statistiques", routesStatistiques);

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
});
