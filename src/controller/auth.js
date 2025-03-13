import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (user) {
      const isMatch = await bcrypt.compare(password ,user.password)
      if (isMatch) {
        const token = jwt.sign(
          {
            id: user._id,
          },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );
        delete user._doc.password
        return res.status(200).json({
          message: "Login Done !",
          data: {
            token,
            ...user._doc,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid Credential" });
      }
    }

    return res.status(400).json({ message: "Invalid Credential" });
  } catch (error) {
    res.status(500).json({
        message: "Internal Server Error",
      });
  
  }
}

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });


    if (existingUser) {
      return res.status(400).json({
        message: "Email arleady exist",
      });
    }

    const hashedPasswrd = await bcrypt.hash(password , 10)
    const user = new User({
      name,
      email,
      password : hashedPasswrd,
    });


    await user.save();
    delete user._doc.password

    return res.status(201).json({
      data: user,
      message: "User Created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
