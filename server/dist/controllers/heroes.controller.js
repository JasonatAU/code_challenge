"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hero_1 = require("../models/hero");
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const heroes = hero_1.Hero.findAll();
    if (heroes && heroes.length) {
        res.send({
            statusCode: 200,
            heroes,
        });
    }
    else {
        res.send({
            statusCode: 404,
            error: 'Heroes not found',
        });
    }
});
const findById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (!id) {
        res.send({
            statusCode: 401,
            error: 'Bad request: Id is required',
        });
    }
    const hero = hero_1.Hero.findById(id);
    if (hero) {
        res.send({ statusCode: 200, hero });
    }
    else {
        res.send({
            statusCode: 404,
            error: 'Hero not found',
        });
    }
});
exports.default = {
    findAll,
    findById
};
//# sourceMappingURL=heroes.controller.js.map