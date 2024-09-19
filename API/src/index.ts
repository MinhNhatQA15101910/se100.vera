import "reflect-metadata";
import express, { Express } from "express";
import rootRouter from "./routes/rootRouter";

const app: Express = express();

app.use(express.json());

app.use("/api", rootRouter);

app.listen(3000, () => {
  console.log("Server is running on https://localhost:3000");
});
