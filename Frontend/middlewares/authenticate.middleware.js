const { resolveSoa } = require("dns")
const jwt = require("jsonwebtoken")

const authenticate = (req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-Type')
    res.setHeader('Access-Control-Allow-Credentials',true)
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            const userID = decoded.userID
            console.log(decoded)
            req.body.userID = userID
            next()
        }else{
            res.send("Please Login First")
        }
    } else {
        res.send("Please Login First")
    }
}

module.exports = {authenticate}