import express from "express";
//import UserRoutes from "./src/modules/user/routes/UserRoutes.js";
//import * as db from "./src/config/db/initialData.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

//db.createInitialData();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/', (req, res) => {
    console.log("chegou")
    console.log(req.body)
})

app.get('/api/status', (req, res) => {
    return res.status(200).json({
        service: "Auth-API",
        status: "up",
        httpStatus: 200,
    });
});

//app.use(UserRoutes);

app.listen(PORT, () => {
    console.info(`Server started successfuly at port ${PORT}`)
});