import { db } from "../backend/db.mjs";
//import { users } from "../models/userModels.mjs";

function decodeAuthBasic(header) {
    try {
        const [method, token] = header.split(" ");
        const tokenString = atob(token);
        const [username, password] = tokenString.split(":");
        return { method, username, password };
    } catch (err) {
        throw "Fallo de autenticacion";
    }
}


export function authMiddleware(req, res, next) {
    try {
        console.log(req.headers.authorization);
        const { method, username, password } = decodeAuthBasic(req.headers.authorization);
        if (method != "Basic") 
            throw "No se está usando el método Basic para la autenticacion";
        /*//Buscamos el usuario en el array
            const user = users.find(
            item => item.name===username && item.password === password
        )*/
        //Buscamos el usuario en la base de datos
        db.get(`
            SELECT * FROM users WHERE name = ${username}
            AND password= ${password}`, 
            (error, data) => {
                if (error) res.sendStatus(500);
                else if (data) next;
                else res.sendStatus(401);
            }
        )

    }catch(error){
        res.send(error);
    }
}