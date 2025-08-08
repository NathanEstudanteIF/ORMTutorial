import express from "express";
import cors from "cors";
import corsConfig from "./config/cors.config.js";
import db from "./app/models/index.js";
import TutorialRouter from "./app/routes/TutorialRoutes.js";

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync database');
});

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsConfig));

app.use('/tutorials', TutorialRouter);

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
})
