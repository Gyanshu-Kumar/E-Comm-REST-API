// POST localhost:3000/ecomm/api/v1/auth/signup

//i need to intersept this
const authController = require("../Controllers/auth.controller");
const authMW = require("../middlewares/auth_mw"); // this line is used to import the middleware

module.exports = (app) => {
    // Route for POST localhost:3000/e-comm/api/v1/auth/signup
    app.post("/e-comm/api/v1/auth/signup", authMW.verifySignUpBody, authController.signup);

    // Route for POST localhost:3000/e-comm/api/v1/auth/signin
    app.post("/e-comm/api/v1/auth/signin", authController.signin);
};
