import * as Express from "express";
import { Hero } from "../models/hero";

const findAll = async (req: Express.Request, res: Express.Response) => {
    const heroes = Hero.findAll();
    if (heroes && heroes.length) {
        res.send({
            statusCode: 200,
            heroes,
        });
    } else {
        res.send({
            statusCode: 404,
            error: 'Heroes not found',
        });
    }
};

const findById = async (req: Express.Request, res: Express.Response) => {
    const id = req.params.id;
    if (!id) {
        res.send({
            statusCode: 401,
            error: 'Bad request: Id is required',
        });
    }
    const hero = Hero.findById(id);
    if (hero) {
        res.send({statusCode: 200, hero});
    } else {
        res.send({
            statusCode: 404,
            error: 'Hero not found',
        });
    }
};

export default {
    findAll,
    findById
}
