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

export function getTasks(req,res) {
    res.json(tasks);
}

export function postTasks(req,res) {
    tasks.push(req.body);
    res.sendStatus(200);
}

export function putTasks(req,res) {
    const updatedTask = req.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id===updatedTask.id
    )
    tasks[oldTaskIdx] = updatedTask;
    res.sendStatus(200);

}

export function deleteTasks(req,res) {
    const updatedTask = req.body;
    const oldTaskIdx = tasks.findIndex(
        item => item.id === updatedTask.id
    )
    tasks.splice(oldTaskIdx,1);
    res.sendStatus(200);

}

