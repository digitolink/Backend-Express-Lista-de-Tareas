import { validate } from "jsonschema";

//corregir
export function validatorFactory(schema) {
    return function JSONValidator(req, res, next) {
        try {
            const validation = validate(req.body, schema)
            if (validation.valid) next();
            else {
                res.status(400);
                res.send("Invalid task data provided");
                console.error("Invalid task data provided");
            }
        } catch (err) {
            throw "Error validating data"
        }


    }
}