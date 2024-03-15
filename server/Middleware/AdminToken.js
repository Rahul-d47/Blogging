const jwt = require("jsonwebtoken")
const JWT_SECERTE = 'hello';

const fetchAdmin = (req, res, next) => {
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Access denied! no token Provided"});
    }
    try{
        const data = jwt.verify(token, JWT_SECERTE);
        req.adminId = data;
        next();
    }catch(err){
        res.status(403).json({message:"Invalid Token"})
    }
};

module.exports = fetchAdmin;