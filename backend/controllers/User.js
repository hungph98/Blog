const User = require("../models/User");
class UserController {

    // Update
    updateUser = async (req, res, next) => {
       if (req.params.id === req.user.id) {
           try {
               const user = await User.findByIdAndUpdate(req.params.id, {
                   $set: res.body
               }, {new: true});

               res.status(200).json(user)
           } catch (err) {
               next(err)
           }
       }
        return next("You can update only your account!!");
    }

    // Delete
    deleteUser = async (req, res, next) => {
        if (req.params.id === req.user.id) {
            try {
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Delete User Successfully!")
            } catch (err) {
                next(err)
            }
        }
        return next("You can delete only your account!!");
    }

    // Get User By id
    getUserById = async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }

    // Get All User
    getAllUser = async (req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new UserController