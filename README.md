# typescript-express-starting-point

express, typescript, eslint &amp; prettier, jest &amp; supertest w/coverage, vscode debugging, winston logging

## Install Dependencies

```
npm i
```

## Start the Dev Server

```
npm start
```

## Run Tests

Run jest in watch mode

```
npm run test
```

Generate test coverage

```
npm run test:coverage
```

## ENV Variables

Configure the following variables in a .env file in the root of the project

```
DEFAULT_PORT=[number]
LOG_LENGTH_LIMIT=[number of characters before truncating]
LOG_OUTPUT_WHILE_RUNNING_TESTS=[boolean]
LOG_LEVEL=[error | warn | info | verbose | debug | silly]
```
