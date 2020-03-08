"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const heroes_controller_1 = __importDefault(require("./controllers/heroes.controller"));
router.get("/heroes", heroes_controller_1.default.findAll);
router.get("/heroes/:id", heroes_controller_1.default.findById);
exports.default = router;
//# sourceMappingURL=routes.js.map