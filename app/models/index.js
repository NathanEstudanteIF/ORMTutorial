import dbConfig from "../../config/db.config.js";
import { DataTypes, Sequelize } from "sequelize";
import TutorialModel from "./TutorialModel.js"

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = TutorialModel(sequelize, DataTypes);

export default db;