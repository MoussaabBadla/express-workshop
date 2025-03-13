import jwt from "jsonwebtoken"
import User from "../models/user.js";


export const protect = async (req , res ,next) => {
    try {
        let token ;
        
        if (req.headers.authorization ) {
            token = req.headers.authorization ;  
            const decoded = jwt.verify(token ,process.env.JWT_SECRET)

            const user = await User.findById(decoded.id);
    
            if (!user) {
                return res.status(401).json({message : "Not authorized"})
            }
            req.user = user;
            return next();
        }
        return res.status(401).json({message : "Not authorized"})

    } catch (error) {
        return res.status(500).json({message : "error"})
        
    }

}