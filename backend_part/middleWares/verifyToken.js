const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if(authToken) {
        const token = authToken.split(" ")[1]
        try{
            const decodedPayLoad = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decodedPayLoad;
            next()
        } catch (error){
            res.status(401).json({message: "Invalid token"})
        }
    }else{
        res.status(401).json({message: "No token provided, access denied"})
    }
}
module.exports = {
    verifyToken
}
