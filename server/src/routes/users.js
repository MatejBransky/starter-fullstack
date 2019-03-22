import { Router } from 'express';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    const users = await req.context.models.User.findAll(
      req.query.messages && { include: { all: true } }
    );
    res.send(users);
  })
  .post(async (req, res) => {
    const user = await req.context.models.User.create(req.body);
    res.send(user);
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const user = await req.context.models.User.findByPk(req.params.userId, {
      include: { all: true },
    });
    res.send(user);
  })
  .put(async (req, res) => {
    const user = await req.context.models.User.findByPk(req.params.userId);
    await user.update(req.body);
    res.send(user);
  })
  .delete((req, res) =>
    res.send(`DELETE HTTP method used on user with an id ${req.params.userId}`)
  );

export default router;
