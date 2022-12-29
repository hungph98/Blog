const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sign} = require("jsonwebtoken");

class AuthController {

    // Register
    register = async (req, res, next) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(req.body.password, salt);
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: passHash
            });

            const user = await newUser.save();
            res.status(200).json(user);
        } catch (err){
            next(err)
        }
    }

    // Login
    login = async (req, res, next) => {
        try {
            const user = await User.findOne({ username: req.body.username});
            if (!user) {
                res.status(400).json("Wrong credentials!");
            }

            const validated = await bcrypt.compare(req.body.password, user.password);
            if (!validated) {
                res.status(400).json("Wrong credentials!");
            }

            const token = jwt.sign({
                id: user._id,
            }, process.env.SECRET_KEY, {expiresIn:"3d"})

            const {password, ...others} = user._doc

            res.cookie("token", token, {
                httpOnly: true
            }).status(200).json({ detail: {others, token}});

        } catch (err){
            next(err)
        }
    }
}

module.exports = new AuthController;