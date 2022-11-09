import bodyParser from "body-parser";
import express from "express";
import router from "./controllers/inventory";

const app = express();

//serve up html files
app.use(express.static(__dirname + "/views"));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.json());
app.use("/api", router);

export default app;
