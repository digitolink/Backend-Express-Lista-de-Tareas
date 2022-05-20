import { db } from "../backend/db.mjs";
import { users } from "../models/userModels.mjs";


export function postUserController(req, res) {
    try {

        /* //Creamos un usuario en un array
        users.push(req.body);
        res.send("usuario creado");
        */

        // Creamos un usuario en la base de datos
        db.run(`
            INSERT INTO users(name,password) 
            VALUES (?,?)`
            ,req.body.name, req.body.password,
            
            (error) => {
                if (error) res.send("Error al crear el usuario");
                else res.send("Usuario creado");
            }
        )
    } catch {
        res.send("El usuario no se ha podido crear");
    }
}
