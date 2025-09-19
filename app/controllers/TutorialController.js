import db from "../models/index.js";
import { Op } from "sequelize";

const Tutorial = db.tutorials;
const Author = db.tutorials;

export const create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            message: 'Content cannot be empty'
        })
        return;
    }

    const tutorial = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ?? false
    }

    Tutorial.create(tutorial)
    .then(data => res.status(202).send(data))
    .catch(err => res.status(500).send({ message: err.message ?? 'Some error ocurred to persistence tutorial'}));
}

export const findAll = (req, res) => {
    const { title } = req.query;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Tutorial.findAll({ 
        where: condition 
    })
    .then(data => res.status(202).send(data))
    .catch(err => res.status(500).send({ message: err.message ?? 'Some error ocurred to get tutorials'}));
}

export const remove = (req, res) => {
    const { id } = req.params;

    Tutorial.destroy({ 
        where: { id : id } 
    })
    .then(num => {
        if(num != 1) {
            res.status(404).send(`Tutorial not found with id ${id}`);
            return;
        }
        res.sendStatus(204);
    })
    .catch(err => res.status(500).send({ message: err.message ?? 'Some error ocurred to retrieve data'}));
}

export const addAuthorToTutorial = async (req, res) => {
  try {
    const { tutorialId, authorId } = req.params;

    const tutorial = await Tutorial.findByPk(tutorialId);
    if (!tutorial) {
      return res.status(404).send({ message: "Tutorial not found" });
    }

    const author = await Author.findByPk(authorId);
    if (!author) {
      return res.status(404).send({ message: "Author not found" });
    }

    await tutorial.addAuthor(author);

    res.status(200).send({
      message: `Author (ID: ${authorId}) added with success to Tutorial (ID: ${tutorialId}).`,
    });

  } catch (error) {
    res.status(500).send({
      message: "Error to add author to tutorial",
      error: error.message,
    });
  }
};
