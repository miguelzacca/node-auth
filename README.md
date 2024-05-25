# Authentication with Node.js and MySQL

Authentication with Nodejs, MySQL, Sequelize, and JWT.

### MVC Architecture

I use the MVC (Model-View-Controller) architectural pattern to organize the code in a structured and modular way. The model manages data logic, interacts with the database and defines business rules. The view handles presentation, rendering the user interface. The controller acts as an intermediary, receiving user input through routes, calling the appropriate models, and returning the correct responses to the views. This pattern helps separate responsibilities, facilitating code maintenance and scalability.

### Typescript

In the project, I am using TypeScript, which is a superset of JavaScript, adding optional static typing and other features to JavaScript. With TypeScript, I can detect typos at compile time and improve code readability and maintainability, especially in large projects. Additionally, TypeScript supports modern JavaScript features such as classes, modules, and async/await, while providing a more robust and secure development experience.

## Install

To install the dependencies, run the following command:

```bash
cd backend
npm ci
```

#### Dependencies:

#### `sequelize` + `mysql2`

Sequelize is an ORM for Node.js that makes it easy to interact with SQL databases. I use it to simplify data manipulation, manage migrations and seeds, and define validations directly in models. MySQL2 is a driver that allows Sequelize to communicate with MySQL databases, supporting asynchronous queries and performance improvements.

#### `cors`

CORS (Cross-Origin Resource Sharing) is a middleware for Node.js that manages access permissions between different domains. I use it to allow the frontend to make requests to the backend securely, configuring which domains are allowed to access my API resources.

#### `zod`

Zod is a schema validation library for TypeScript and JavaScript. I use it to validate and analyze input objects, ensuring that the data received in requests is in the correct format and meets the defined requirements, improving the robustness and security of the application.

#### `xss`

Tool that helps prevent Cross-Site Scripting (XSS) attacks in web applications. It provides methods for escaping strings to make them safe for rendering in the browser, protecting against malicious script execution. I use this library to sanitize and escape input data before displaying it on web pages, ensuring the security of my application against this common vulnerability.

#### `bcrypt`

Bcrypt is a hashing cryptography library for Node.js, widely used to securely store passwords in databases. It offers functions to generate password hashes irreversibly and slowly, making brute force attacks difficult. In my project, I use Bcrypt to hash users' passwords before storing them in the database, ensuring the security of users' credentials.

#### `express`

Express is a minimalist and flexible web framework for Node.js. It provides a variety of features to build web applications and APIs quickly and efficiently. In my project, I use Express to handle the routing of HTTP requests, create middleware to handle business logic and manipulate the request lifecycle, facilitating the development and organization of my application.

#### `cookie-parser`

In my project, I am using cookie-parser to analyze cookies sent in HTTP requests, especially to deal with JWT tokens (JSON Web Tokens) used in authentication. This allows me to decode and manipulate the JWT tokens stored in cookies, making it easier to implement secure token-based authentication.

#### `dotenv`

In the case of dotenv, it is used to load environment variables from a .env file into the Node.js runtime environment. This makes it easier to configure variables such as database credentials, API keys and other sensitive settings, keeping them separate from the source code and ensuring better project security and portability.

#### `fs`

I am using the fs (File System) module to read an HTML file that is stored in the backend and send it to the frontend, where it will be injected into the HTML document. fs allows me to manipulate files from the server's file system directly from Node.js code, making it easy to read and write files as needed for my application logic.

#### `jsonwebtoken`

In the project, I am using jsonwebtoken to generate, sign and verify JWT tokens (JSON Web Tokens) used to authenticate users. With this library, I can create secure tokens that contain user information, such as identification and permissions, allowing them to be easily verified and validated in each request, guaranteeing the security and integrity of the authentication system.

## Use

To run the api normally, run the following command:

```bash
npm start
```

With `nodemon`, for development, run:

```bash
npm run dev
```

## Development

For development, make sure to change the `NODE_ENV` in `.env` from `production` to `development` and the origin in cors configuration in `config.js` to your localhost.

## Preview (under development)

<a href="https://definitivelogin.netlify.app" target="_blank">https://definitivelogin.netlify.app</a>
