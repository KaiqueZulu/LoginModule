import express from "express"
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import UserRoutes from "./modules/user/routes/UserRoutes.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;
const swaggerDocs = JSON.parse(
  await readFile('/home/matdev/LoginModule/Back/src/config/swagger/swagger.json', 'utf8')
);

app.use(express.json())// for parsing application/json

app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: "Auth-API",
        status: "up",
        httpStatus: 200,
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/user', UserRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfuly at port ${PORT}`)
});