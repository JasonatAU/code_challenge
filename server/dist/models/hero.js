"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const heroes_json_1 = __importDefault(require("../data/heroes.json"));
class Hero {
    constructor(json) {
        Object.assign(this, json);
        if (json && json.powers) {
            this.powers = json.powers.map(power => new HeroPower(power));
        }
    }
    static findAll() {
        if (heroes_json_1.default && heroes_json_1.default.length) {
            return heroes_json_1.default.map(hero => new Hero(hero));
        }
        return [];
    }
    static findById(id) {
        return this.findAll().find(hero => hero.id === id);
    }
}
exports.Hero = Hero;
class HeroPower {
    constructor(json) {
        Object.assign(this, json);
    }
}
exports.HeroPower = HeroPower;
//# sourceMappingURL=hero.js.map