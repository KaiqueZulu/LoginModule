import express from "express"
//import UserRoutes from "./src/modules/user/routes/UserRoutes.js";
//import * as db from "./src/config/db/initialData.js";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

//db.createInitialData();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
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