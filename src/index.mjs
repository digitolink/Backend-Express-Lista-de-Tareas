import express, { response } from "express";
import { getTasks, postTasks, putTasks, deleteTasks } from "./middleware/middlewares.mjs";


const app = express();
const PORT = 3000;

app.listen(PORT);

app.use(express.json());

app.get("/api/v0.1/tasks/", getTasks);
app.post("/api/v0.1/task/", postTasks);
app.put("/api/v0.1/task/", putTasks);
app.delete("/api/v0.1/task/", deleteTasks);