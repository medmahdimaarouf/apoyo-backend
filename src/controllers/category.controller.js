const Category = require('../models/category.model')
const CloudinaryStorage = require('../services/cloudinary.storage')
const Config = require('config');

exports.create = (req, res) => {
    var category = new Category({
        label: req.body.label,
    });
    Category.create(category, async function (err) {
        if (err) {
            console.log('error while create category!', err);
            return res.status(501).json({ success: false, message: err.message, data: category });
        }
        return res.status(200).json({
            success: true,
            data: product,
            message: "Created category "
        });
    });
}

exports.update = (req, res) => {
    Category.findByIdAndUpdate(
        req.params.id,
        {
            label: req.body.label,
        },
        { new: false } // TAKE CARE HERE .......  { new: false }
    )
        .then((category) => {
            if (!category) {
                throw {
                    code: 404,
                    message: "Category not found with id " + req.params.id,
                };
            }

            return res.status(200).json({ success: true, data: category, message: "Category updated ." });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                throw {
                    code: 404,
                    message: "Category not found with id " + req.params.id,
                }
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}
exports.findOne = (req, res) => {
    Category.findById(req.params.id)
        .then((category) => {
            if (!category) {
                throw {
                    code: 404,
                    message: "Category not found with id " + req.params.id,
                };
            }
            res.status(200).send(category);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send("Category not found with id " + req.params.id);
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}
exports.findAll = (req, res) => {

    Category.find()
        .then((categories) => {
            res.status(200).send({ success: true, data: categories });
        })
        .catch((err) => {
            return res.status(error.code || 500).send({ success: false, error: error.message || "Some error occurred while retrieving categories." });
        });
}
exports.delete = (req, res) => {
    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (!category) {
                throw ({
                    code: 404,
                    message: "Category not found with id " + req.params.id,
                });
            }
            res.status(204).send({ message: "Category deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                throw ({
                    code: 404,
                    message: "Category not found with id " + req.params.id,
                });
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");

        });
}