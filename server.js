import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

const PORT = 8081;

app.listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
})
