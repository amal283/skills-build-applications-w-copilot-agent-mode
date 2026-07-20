"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const workouts = await workout_1.default.find({});
    res.json({ items: workouts, count: workouts.length });
});
router.post('/', async (req, res) => {
    const workout = await workout_1.default.create(req.body);
    res.status(201).json(workout);
});
exports.default = router;
