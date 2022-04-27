import { tasks } from "../models/tasksModels.mjs";

export function getTasks(req, res) {
    try {
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.send("No fue posible listar tareas del servidor");
    }
}

export function postTasks(req, res) {
    try {
        tasks.push(req.body);
        res.send("Se ha añadido la tarea");
    } catch (err) {
        console.error(err);
        res.send("No fue posible añadir la tarea en el servidor");
    }
}

export function putTasks(req, res) {
    try {
        const updatedTask = req.body;
        const oldTaskIdx = tasks.findIndex(
            item => item.id === updatedTask.id
        )
        tasks[oldTaskIdx] = updatedTask;
        res.send("Se ha actualizado la tarea");
    } catch (err) {
        console.error(err);
        res.send("No fue posible actualizar la tarea en el servidor");        
    }

}

export function deleteTasks(req, res) {
    try {
        const updatedTask = req.body;
        const oldTaskIdx = tasks.findIndex(
            item => item.id === updatedTask.id
        )
        tasks.splice(oldTaskIdx, 1);
        res.send("Se ha borrado la tarea");        
    } catch (err) {
        console.error(err);
        res.send("No fue posible borrar la tarea en el servidor");
    }

}