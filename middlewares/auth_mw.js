const user_model = require("../Models/user.model")// For checking  if the user with same userId present or not and fro wonnecting with database we need user model

// Create a middleware to checks if the request body is proper and correct

const verifySignUpBody = async(req, res, next) => {

    try{
        // Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed ! Name was not provided"
            });
        }

        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed ! email was not provided"
            });
        }

        // Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed ! userId was not provided"
            });
        }


        // Check if the user with same userid is already present
        const user = await user_model.findOne({ userId: req.body.userId });
        
        if(user){
            return res.status(400).send({
                message: "Failed ! User with same userId already exists"
            });
        }

        next();


    }catch(error){
        console.log("Error while verifying the request body", error);
        res.status(500).send({
            message: "Error while verifying the request object"
        });
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody
}