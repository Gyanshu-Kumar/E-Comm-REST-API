// Logic to Register a new user

const bcrypt = require("bcryptjs");
const user_model = require("../Models/user.model");
exports.signup = async (req, res) => {

    //Logic to create a new user



    // Read the request body
    const request_body = req.body; // req.body this will get the data from the request body


    // insert the data in the user collection in mongodb
    const userObj = {
        name: request_body.name,
        userId: request_body.userId,
        email: request_body.email,
        userType: request_body.userType,
        password: bcrypt.hashSync(request_body.password, 8)
    }

    try {
        const user_created = await user_model.create(userObj);

        //if we want to not returning/ showing the password in the response
        const res_obj = {
            name: user_created.name,
            userId: user_created.userId,
            email: user_created.email,
            userType: user_created.userType,
            createdAt: user_created.createdAt,
            updatedAt: user_created.updatedAt
        }

        // return this user
        res.status(201).send(res_obj) // 201 is the status code for created

    } catch (error) {
        console.log("Error while registering the user:", error);
        res.status(500).send({  // 500 means internal server error
            message : "some error happend while registering the user"
        })
    }


    // return the response to the user
}