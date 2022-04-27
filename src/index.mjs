import express, { response } from "express";
import { getTasks, postTasks, putTasks, deleteTasks } from "./controllers/tasksControllers.mjs";
import { postUserController } from "./controllers/usersController.mjs";
import { authMiddleware } from "./middleware/authorization.mjs";


try {
    const app = express();
    const PORT = 3000;

    app.listen(PORT, ()=>{
        console.log("Express running...");})

    app.use(express.json());

    app.post("/api/v0.0/users/", postUserController)
    app.get("/api/v0.0/tasks/", authMiddleware, getTasks);
    app.post("/api/v0.0/task/", authMiddleware, postTasks);
    app.put("/api/v0.0/task/", authMiddleware, putTasks);
    app.delete("/api/v0.0/task/", authMiddleware, deleteTasks);
} catch (err) {
    console.error(err);
}
