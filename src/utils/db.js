import {connect, connection} from "mongoose";

const conn = {
    isConnected: false
}

export async function connectDB() {
    if (conn.isConnected) return;

    try {
        console.log("connecting to the db...")
        const user = process.env.DB_USER
        const password = process.env.DB_PASSWORD
        const cluster = process.env.DB_CLUSTER
        const collection = process.env.DB_COLLECTION
        
        const url = 'mongodb+srv://' + user + ':' + password + '@' + cluster + '.n4dtxaz.mongodb.net/' + collection
        
        const db = await connect(url)
        conn.isConnected = db.connections[0].readyState
    } catch (error) {
        console.error("Error connecting to the database:", error);
    }

}

connection.set('disableQueryCaching', true);
connection.on("connected", () => {
    console.log("DB connected")
})

connection.on("error", (err) => {
    console.log("DB connection error ", err)
})