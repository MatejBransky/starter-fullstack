# starter-fullstack

### Requirements

- Docker
- Node.js
- Yarn (workspaces)

### Usage

Start the database:

```
$ docker-compose up
```

Start the server:

```
$ yarn serve
```

Start the client:

```
$ yarn start
```

Start the E2E test environment:

```
$ yarn test
```

### Features

- monorepo with Yarn Workspaces
- included `docker-compose.yml` with the db (PostgreSQL) setup
- e2e testing with Cypress
- linting with ESLint
- formatting with Prettier
- precommit hook checking linting and formatting
