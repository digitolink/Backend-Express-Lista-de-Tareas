
import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("./tasks.db", (err) => {
    if (err) {
        throw err.message;
    }
    console.log("Connected to the database");
});

db.run(`
    CREATE TABLE 
        IF NOT EXISTS
        users(
            id INTEGER PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL
        )

`);

db.run(`
    CREATE TABLE 
        IF NOT EXISTS
        tareas(
            id INTEGER PRIMARY KEY,
            description VARCHAR(100) NOT NULL,
            done INTEGER NOT NULL,
            userID INTEGER,
            FOREIGN KEY (userID)
                REFERENCES users(id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                    
        )

`);
