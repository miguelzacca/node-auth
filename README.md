# Authentication with MySQL

Simple authentication with Nodejs, MySQL, Sequelize, and JWT.

## Install

Dependencies:

- `sequelize`
- `mysql2`
- `cors`
- `zod`
- `xss`
- `bcrypt`
- `express`
- `cookie-parser`
- `dotenv`
- `fs`
- `jsonwebtoken`

To install, run the following command:

```bash
cd backend
npm ci
```

## Use

```bash
npm run server
```

or for development (nodemon)

```bash
npm run dev
```

## Development

For development, make sure to change the `NODE_ENV` in `.env` from `production` to `development` and the origin in cors configuration in `config.js` to your localhost.

## Preview (under development)

https://definitivelogin.netlify.app
