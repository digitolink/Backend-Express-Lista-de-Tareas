import { users } from "../models/userModels.mjs";


export function postUserController(req, res) {
    try {
        users.push(req.body);
        res.send("usuario creado");
    } catch {
        res.send("El usuario no se ha podido crear");
    }
}
