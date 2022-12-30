const Category = require("../models/Category");

class CategoryController {

    // Create Category
    createCategory = async (req, res, next) => {
        const newCat = new Category(req.body);
        try {
            const cat = await newCat.save();
            res.status(200).json(cat);
        } catch (err) {
            next(err)
        }
    }

    // Get Category
    getCategory = async (req, res, next) => {
        try {
            const cats = await Category.find();
            res.status(200).json(cats)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = new CategoryController;