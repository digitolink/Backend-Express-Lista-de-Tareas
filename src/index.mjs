import express, { response } from "express";
import { getTasks, postTasks, putTasks, deleteTasks, getOneTask } from "./controllers/tasksControllers.mjs";
import { postUserController } from "./controllers/usersController.mjs";
import { authMiddleware } from "./middleware/authorization.mjs";
import { validatorFactory } from "./middleware/JSONValidator.mjs";
import { deleteTaskSchema, newTaskSchema, TaskSchema } from "./schemas/tasksSchemas.mjs";
import { userSchema } from "./schemas/usersSchemas.mjs";


try {
    //si hacemos el import de express, no hace falta
    //const express = require('express'); 
    
    const app = express();
    const PORT = 3000;

    app.listen(PORT, ()=>{
        console.log("Express running...");})

    app.use(express.json());

    app.post("/api/v0.0/users/", validatorFactory(userSchema), postUserController)
    app.get("/api/v0.0/tasks/:id", validatorFactory(TaskSchema), authMiddleware, getOneTask);
    app.get("/api/v0.0/tasks/", validatorFactory(TaskSchema), authMiddleware, getTasks);
    app.post("/api/v0.0/task/", validatorFactory(TaskSchema), authMiddleware, postTasks);
    app.put("/api/v0.0/task/", validatorFactory(TaskSchema), authMiddleware, putTasks);
    app.delete("/api/v0.0/task/", validatorFactory(deleteTaskSchema), authMiddleware, deleteTasks);
} catch (err) {
    console.error(err);
}
