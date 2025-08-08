import db from "../models/index.js";
import { Op } from "sequelize";

const Tutorial = db.tutorials;

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