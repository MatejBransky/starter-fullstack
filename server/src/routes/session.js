import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const me = await req.context.models.User.findByPk(req.context.me.id);
  res.send(me);
});

export default router;
