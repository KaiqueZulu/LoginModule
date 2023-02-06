import express from "express"
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
import UserRoutes from "./modules/user/routes/UserRoutes.js";
import path from "path";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;
const swaggerDocs = JSON.parse(
  await readFile(path.resolve("src/config/swagger/swagger.json"), 'utf8')
);

app.use(express.json())// for parsing application/json


app.get('/api/status', (req, res) => {
    return res.status(200).json({
        status: 200,
        service: "Login-API",
        apiStatus: "UP",
    });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api/user', UserRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfuly at port ${PORT}`)
});