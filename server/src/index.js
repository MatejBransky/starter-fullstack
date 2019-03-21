import express from 'express';
import bodyParser from 'body-parser';
import uuid from 'uuid/v4';
import cors from 'cors';
import morgan from 'morgan';

import models from './models';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

app.get('/', (req, res) => res.send('Received a GET HTTP method'));
app.post('/', (req, res) => res.send('Received a POST HTTP method'));
app.put('/', (req, res) => res.send('Received a PUT HTTP method'));
app.delete('/', (req, res) => res.send('Received a DELETE HTTP method'));

app.get('/users', (req, res) =>
  res.json(Object.values(req.context.models.users))
);
app.get('/users/:userId', (req, res) =>
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
app.post('/users', (req, res) => res.send('POST HTTP method on users'));
app.put('/users/:userId', (req, res) =>
  res.send(`PUT HTTP method for user with an id ${req.params.userId}`)
);
app.delete('/users/:userId', (req, res) =>
  res.send(`DELETE HTTP method used on user with an id ${req.params.userId}`)
);

app.get('/messages', (req, res) =>
  res.send(Object.values(req.context.models.messages))
);
app.post('/messages', (req, res) => {
  const addedMessage = {
    id: uuid(),
    text: req.body.text,
    userId: req.me.id,
  };

  req.context.models.messages[addedMessage.id] = addedMessage;

  res.send(addedMessage);
});
app.put('/messages/:messageId', (req, res) => {
  req.context.models.messages[req.params.messageId].text = req.body.text;
  res.send(req.context.models.messages[req.params.messageId]);
});
app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

app.get('/session', (req, res) =>
  res.send(req.context.models.users[req.me.id])
);

app.listen(process.env.SERVER_PORT, () =>
  console.log(`The server is running on port ${process.env.SERVER_PORT}.`)
);
