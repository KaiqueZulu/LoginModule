#Login module API 

##   <a id="about" /> Login module API. This is a module in the microservices architecture with user authentication and CRUD.


<!--ts-->
   * [About](#about)
   * [How to use](#how-to-use)
      * [Prerequisites](#prerequisites)
      * [Database container](#container)
      * [Installation](#installation)
      * [Start](#start)
      * [Tests](#tests)
      * [Routes](#routes)
   * [Technologies](#technologies)
<!--te-->

## <a id="how-to-use" /> 📜 How to use: 
### <a id="prerequisites" />Prerequisites:
 Before starting, you will need to have the following tools installed on your machine:
Docker, Git and Node.js.


### <a id="container" />Uploading the PostgresSQL database container
```
-> ~ docker compose -f "docker-compose.yaml" up -d --build
```

### <a id="installation" />Installation
```
-> ~ npm i
```
### <a id="start" />Start
```
-> ~ npm run start
```
### <a id="tests" />Tests
```
-> ~ npm run test
```

### <a id="routes" /> 🔀 API routes
<!--ts-->
* */api/status*  - ***API server status***
* */api-docs*   - ***Swagger documentation***
* ***User***
   * **POST** */api/user/register*  - ***Register user*** 
   * **GET** */api/user/{email}*    - ***Search user by email***
   * **PATCH** */api/user/*         - ***Update authenticated user***
   * **DELETE** */api/user/delete*  - ***Delete authenticated user***
* ***Auth***
   * **POST** */api/user/auth*      - ***Get access token***
<!--te-->

### <a id="technologies" /> 🛠 Technologies

The following tools were used in building the project:mdi-routes

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Docker](https://www.docker.com/)
