import { users } from "../models/userModels.mjs";

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
        const user = users.find(
            item => item.name===username && item.password === password
        )
        if(user)
            next()
        else
            throw "usuario o password no valido"

    }catch(error){
        res.send(error);
    }
}