// This will the starting file of the project
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./config/server.config")
const db_config = require("./config/db.config")
const { init } = require("./Models/user.model")
const user_model = require("./Models/user.model")
const bcrypt = require("bcryptjs")

app.use(express.json()) // It helps to read JSON as JS Object

// Create an admin user at the start of the application
// if not already created


//Connecting to the database
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection;

db.on("error", () => {
    console.log("Error connecting to the database");
});

db.once("open", () => {
    console.log("Connected to the database");
    init1();
});


async function init1() {

    try {
        let user = await user_model.findOne({ userId: "admin" });
        if (user) {
            console.log("Admin user is already created");
            return;
        }
    } catch (error) {
        console.log("Error creating admin user:", error);
        
    }
        try{
            user = await user_model.create({
            name: "Gyanshu",
            userId: "admin",
            email: "gyanshusingh152@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("admin123", 8)
        });

        console.log("Admin user created", user);
    } catch (err) {
        console.log("Error creating admin user:", err);
    }
}

// Stich the route to the server
require("./Routes/auth.route")(app) // calling route to the app object


//Starting the express server
app.listen(server_config.PORT, () => {
    console.log("Server is running on port number " + server_config.PORT)
})