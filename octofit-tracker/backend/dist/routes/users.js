"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await user_1.default.find({});
    res.json({ items: users, count: users.length });
});
router.post('/', async (req, res) => {
    const user = await user_1.default.create(req.body);
    res.status(201).json(user);
});
exports.default = router;
