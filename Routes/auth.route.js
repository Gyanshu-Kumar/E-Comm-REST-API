// POST localhost:3000/ecomm/api/v1/auth/signup

//i need to intersept this
const authController = require("../Controllers/auth.controller")


module.exports = (app) => {
    app.post("/e-comm/api/v1/auth/signup", authController.signup) // if thr routher accepts the call for this uri then authcontroller signup method should be called
}