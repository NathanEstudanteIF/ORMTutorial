import express from "express";
import * as tutorials from '../controllers/TutorialController.js'

const TutorialRouter = express.Router();

TutorialRouter.get("/", tutorials.findAll);
TutorialRouter.post("/", tutorials.create);
TutorialRouter.delete("/:id", tutorials.remove);

export default TutorialRouter;