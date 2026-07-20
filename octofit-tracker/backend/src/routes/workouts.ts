import { Router } from 'express';
import WorkoutModel from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await WorkoutModel.find({});
  res.json({ items: workouts, count: workouts.length });
});

router.post('/', async (req, res) => {
  const workout = await WorkoutModel.create(req.body);
  res.status(201).json(workout);
});

export default router;
