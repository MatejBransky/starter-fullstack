import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import models, { sequelize } from './models';
import routes from './routes';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin('mbransky'),
  };
  next();
});
app.use('/session', routes.session);
app.use('/users', routes.users);
app.use('/messages', routes.messages);

app.get('/', (req, res) => res.send('Received a GET HTTP method'));
app.post('/', (req, res) => res.send('Received a POST HTTP method'));
app.put('/', (req, res) => res.send('Received a PUT HTTP method'));
app.delete('/', (req, res) => res.send('Received a DELETE HTTP method'));

const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    seedDatabase();
  }

  app.listen(process.env.SERVER_PORT, () =>
    console.log(`The server is running on port ${process.env.SERVER_PORT}.`)
  );
});

async function seedDatabase() {
  await models.User.create(
    {
      username: 'mbransky',
      email: 'matej.bransky@gmail.com',
      messages: [
        {
          text: "Hello World! I'm Matej Bransky!",
        },
      ],
    },
    {
      include: [models.Message],
    }
  );

  await models.User.create(
    {
      username: 'rwieruch',
      email: 'rwieruch@gmail.com',
      messages: [
        { text: 'Hi everybody! I am Robin Wieruch.' },
        { text: 'I do not know what to say...just be happy.' },
      ],
    },
    {
      include: [models.Message],
    }
  );
}
