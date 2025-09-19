import dbConfig from "../../config/db.config.js";
import { DataTypes, Sequelize } from "sequelize";
import TutorialModel from "./TutorialModel.js"
import AuthorModel from "./AuthorModel.js";

const sequelize = new Sequelize(dbConfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = TutorialModel(sequelize, DataTypes);
db.authors = AuthorModel(sequelize, DataTypes);

db.tutorials.belongsToMany(db.authors, {
  through: "tutorial_authors",
  as: "authors",
  foreignKey: "tutorial_id",
});

db.authors.belongsToMany(db.tutorials, {
  through: "tutorial_authors",
  as: "tutorials",
  foreignKey: "author_id",
});

export default db;