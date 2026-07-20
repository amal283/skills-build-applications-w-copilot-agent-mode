import { Router } from 'express';
import ActivityModel from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await ActivityModel.find({});
  res.json({ items: activities, count: activities.length });
});

router.post('/', async (req, res) => {
  const activity = await ActivityModel.create(req.body);
  res.status(201).json(activity);
});

export default router;
