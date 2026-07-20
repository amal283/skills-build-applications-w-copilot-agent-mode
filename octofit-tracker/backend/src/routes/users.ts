import { Router } from 'express';
import UserModel from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await UserModel.find({});
  res.json({ items: users, count: users.length });
});

router.post('/', async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(201).json(user);
});

export default router;
