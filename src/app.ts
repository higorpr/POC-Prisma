import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Request, Response } from "express";
import router from "./routers/index.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(json());
app.use(router);

app.get("/health", (req: Request, res: Response) => {
	res.status(200).send("OK");
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`App running on port ${port}`);
});
