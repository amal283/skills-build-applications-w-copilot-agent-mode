import { Router } from 'express';
import LeaderboardModel from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardModel.find({}).sort({ rank: 1 });
  res.json({ items: leaderboard, count: leaderboard.length });
});

export default router;
