import { Router } from 'express';
import uuid from 'uuid/v4';

const router = Router();

router.get('/', (req, res) =>
  res.send(Object.values(req.context.models.messages))
);
router.post('/', (req, res) => {
  const addedMessage = {
    id: uuid(),
    text: req.body.text,
    userId: req.me.id,
  };

  req.context.models.messages[addedMessage.id] = addedMessage;

  res.send(addedMessage);
});
router.put('/:messageId', (req, res) => {
  req.context.models.messages[req.params.messageId].text = req.body.text;
  res.send(req.context.models.messages[req.params.messageId]);
});
router.delete('/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
