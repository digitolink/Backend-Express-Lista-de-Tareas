import { sqlite3 } from "sqlite3";

const db = new sqlite.Database("./tasks.db", (err) => {
    if (err) {
        console.error(err.message);
    }
});

db.run(`
    CREATE TABLE 
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL
            password TEXT NOT NULL
        )

`);

db.run(`
    CREATE TABLE 
        IF NOT EXISTS
        tareas(
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL
            done INTEGER NOT NULL
            FOREIGN KEY (userID)
                REFERENCES users(id)
                    ON DELETE CASCADE
                    
        )

`);

export function insertUser(userObject, callback){

}

