import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
  res.json(Object.values(req.context.models.users))
);
router.post('/', (req, res) => res.send('POST HTTP method on users'));
router.get('/:userId', (req, res) =>
  res.json({
    ...req.context.models.users[req.params.userId],
    message: {
      ...Object.values(req.context.models.messages).find(
        message => message.userId === req.params.userId
      ),
      userId: undefined,
    },
  })
);
router.put('/:userId', (req, res) =>
  res.send(`PUT HTTP method for user with an id ${req.params.userId}`)
);
router.delete('/:userId', (req, res) =>
  res.send(`DELETE HTTP method used on user with an id ${req.params.userId}`)
);

export default router;
