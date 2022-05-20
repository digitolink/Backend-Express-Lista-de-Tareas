import { db } from "../backend/db.mjs";
import { tasks } from "../models/tasksModels.mjs";

export function getOneTask(req,res){
    try{
        //Obtenemos una tarea de la base de datos
        db.get(`
            SELECT id, description, done FROM tareas
            WHERE id=`+ parseInt(req.params.id)
        , (error, data) =>{
                if (error){ 
                    res.send("Error al intentar consultar a la base de datos");
                    throw "Error en la obtención de la tarea";
                }
                else{
                    if (data) res.json(data)
                    else res.sendStatus(404)
                }
        })

        /*//Obtenemos una tarea desde un array
        const task = tasks.find(
            item => item.id === parseInt(req.params.id)
        )
        if (task) res.json(task);
        else res.sendStatus(404);
        */
            
    }catch(err){
        res.send("Error al intentar ejecutar la consulta");
    }
}


export function getTasks(req, res) {
    try {
        /*//Obtenemos todas las tareas de un array
        res.json(tasks);
        */
       //Obtenemos todas las tareas de la base de datos
        db.all(`
            SELECT id, description, done FROM tareas
        `, (error, data) =>{
                if (error){ 
                    res.send("Error al intentar listar");
                    throw "Error en la obtención de las tareas de la base de datos";
                }
                else{
                    res.json(data);
                }
        })

    } catch (err) {
        console.error(err);
        res.send("No fue posible listar tareas del servidor");
    }
}

export function postTasks(req, res) {
    try {
        /*// Añadimos una tarea al array
        tasks.push(req.body);
        res.send("Se ha añadido la tarea");
        */
       //Añadimos una tarea a la base de datos
       db.run(`
            INSERT INTO tareas(description, done) 
            VALUES(?, ?)`,
            req.body.description, req.body.done,          
            (error) => {
                if (error){
                    console.error(error);
                    res.sendStatus(500);
                }
                else res.sendStatus(201);
            }           
            )
    } catch (err) {
        console.error(err);
        res.send("No fue posible añadir la tarea en el servidor");
    }
}

export function putTasks(req, res) {
    try {
        /*//Actualizamos tarea del array 
        const updatedTask = req.body;
        const oldTaskIdx = tasks.findIndex(
            item => item.id === updatedTask.id
        )
        tasks[oldTaskIdx] = updatedTask;
        res.send("Se ha actualizado la tarea");
        */
       //Actualizamos tarea de la base de datos
       const {id, description, done} = req.body;
        db.run(`
            UPDATE tareas
            SET id =` + id +`,
            description ="`+ description + `",
            done =` + done 
        , (error,data) => {
            console.error(error);
            if (error)
                res.send("Error en la actualización");
            else
                res.send("Actulizada la fila");
            }
        
        )
        

    } catch (err) {
        console.error(err);
        res.send("No fue posible actualizar la tarea en el servidor");        
    }

}

export function deleteTasks(req, res) {
    try {
        /* //Borramos una tarea del array
        const updatedTask = req.body;
        const oldTaskIdx = tasks.findIndex(
            item => item.id === updatedTask.id
        )
        tasks.splice(oldTaskIdx, 1);
        res.send("Se ha borrado la tarea");
        */
       // Borramos una tarea de la base de datos
        db.run(`
            DELETE FROM tareas
            WHERE id=` + parseInt(req.body.id)
            ,(error,data) => {
                if (error)
                    res.send("Error en el borrado");
                else
                    res.send("la tarea fue borrada de la base de datos");
            }
        );

    } catch (err) {
        console.error(err);
        res.send("No fue posible borrar la tarea en el servidor");
    }

}