import httpStatus from "http-status";
import { user } from "../models/user.model.js";
import bcrypt, { hash } from "bcryptjs";
import crypto from "crypto";

const login = async (req, res)=>{
    const { username, password } = req.body;
    try {
        const existingUser = await user.findOne({ username });
        if (!existingUser) {
            return res.status(httpStatus.NOT_FOUND ).json({ error: "User Not Found" });
        }
        if(bcrypt.compare(password, existingUser.password)){
            let token = crypto.randomBytes(20).toString('hex');
            existingUser.token = token;
            await existingUser.save(); 
            res.status(httpStatus.OK).json({ token : token });
        }
        
    } catch(e) {
        res.json({ message: `Something went wrong ${e}` });
    }
}
const register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const existingUser = await user.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ error: "User already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await user.create({ 
            name: name, 
            username: username, 
            password: hashedPassword 
        });

        await newUser.save();
        res
          .status(httpStatus.CREATED)
          .json({ message: "user registered successfully" });
    } catch(e) {
        res.json({ message: `Something went wrong ${e}` });
    }
}

export { login, register };
