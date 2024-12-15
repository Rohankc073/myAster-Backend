const joi = require("joi")

const userSchema=joi.object({
    name: joi.string().required(),
    age: joi.number().required()
})

function userValidation(req, res, next){
    const {body} = req
    const {error}=userSchema.validate(body)
    if (error){
        res.status(422).json(error)
    } else{
        next();
    }

}

module.exports=userValidation