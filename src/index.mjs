import express, { response } from "express";
const app = express();
const PORT = 3000;

const tasks=[
    {
        id:0,
        contenido: "tarea 1",
        done: false
    },    
    {
        id:1,
        contenido: "tarea 2",
        done: false
    },    
    {
        id:2,
        contenido: "tarea 3",
        done: false
    }

];

app.listen(PORT);

app.use(express.json());

app.get("/api/v0.1/tasks/", (req,res)=>{
    res.json(tasks);

})
app.post("/api/v0.1/task/", (req,res)=>{
    tasks.push(req.body);
    res.sendStatus(200);

})
app.put("/api/v0.1/task/", (req,res)=>{
    const updatedTask = req.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id===updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    res.sendStatus(200);

})
app.delete("/api/v0.1/task/", (req,res)=>{
    const updatedTask = req.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx,1);
    res.sendStatus(200);

})