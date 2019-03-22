import { Router } from 'express';

const router = Router();

router.get('/', (req, res) =>
  req.context.models.Message.findAll().then(messages => {
    res.send(messages);
  })
);
router.post('/', (req, res) => {
  req.context.models.Message.create({
    text: req.body.text,
    userId: req.context.me.id,
  }).then(message => {
    res.send(message);
  });
});
router
  .route('/:messageId')
  .get((req, res) => {
    req.context.models.Message.findByPk(req.params.messageId).then(message => {
      res.send(message);
    });
  })
  .put((req, res) => {
    req.context.models.Message.findByPk(req.params.messageId).then(message => {
      message
        .update({
          text: req.body.text,
        })
        .then(() => {
          res.send(message);
        });
    });
  })
  .delete((req, res) => {
    req.context.models.Message.findByPk(req.params.messageId).then(message => {
      message.destroy().then(() => {
        res.send(`The message with ID ${req.params.messageId} was deleted.`);
      });
    });
  });

export default router;
