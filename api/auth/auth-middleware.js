
const { findBy } = require("../users/users-model");

const checkRegistration = (req, res, next) => {
    if (!req.body.username || !req.body.password){
        res.status(422).json({message: 'username and password required'})
    } else {
        next()
    }
}

const checkUsernameExists = async (req, res, next)=>{
    try{
        const user = await findBy({username: req.body.username})
        if(!user){
            next({status:401, 
            message: "username taken"})
        } else {
            req.user = user
            next()
        }
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    checkRegistration, checkUsernameExists
}

