// Logic to Register a new user

const bcrypt = require("bcryptjs");
const user_model = require("../Models/user.model");
const jwt = require("jsonwebtoken"); // it is used to create a token
const secret = require("../config/auth.config")
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

exports.signin = async(req, res) => {
    //Logic to sign in a user
    // check if the user id is present in the system 
    const user = await user_model.findOne({ userId: req.body.userId }) // it checks if the user with the given userId is present in the database or not
    if(user == null){
        return res.status(400).send({
            message: "user id and password in not valid user id"
        })
    }
    // check if the password is correct or not
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password) // it checks if the password is correct or not
    if(!passwordIsValid){
        return res.status(400).send({
            message: "user id and password in not valid password"
        })
    }
    // using jwt to create a token with  a given TTL and return it to the user
    const token = jwt.sign({id : user.userId}, secret.secret, { // this will create a token with the given userId
        expiresIn: 120 // it will expire in 120 seconds
    })

    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType: user.userType,
        accessToken: token
    })
}