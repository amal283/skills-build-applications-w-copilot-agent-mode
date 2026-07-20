import { Router } from 'express';
import TeamModel from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await TeamModel.find({});
  res.json({ items: teams, count: teams.length });
});

router.post('/', async (req, res) => {
  const team = await TeamModel.create(req.body);
  res.status(201).json(team);
});

export default router;
