const SubCategory = require('../models/sub-category.model')
const CloudinaryStorage = require('../services/cloudinary.storage')
const Config = require('config');

exports.create = (req, res) => {
    var subCategory = new SubCategory({
        name: req.body.label,
        category: req.params.category,
        image: null
    });
    SubCategory.create(subCategory, async function (err) {
        if (err) {
            console.log('error while create subCategory!', err);
            return res.status(501).json({ success: false, message: err.message, data: subCategory });
        }
        return res.status(200).json({
            success: true,
            data: product,
            message: "Created subCategory "
        });
    });
}

exports.update = (req, res) => {
    SubCategory.findByIdAndUpdate(
        req.params.id,
        {
            image: null,
            name: req.body.label,
        },
        { new: false } // TAKE CARE HERE .......  { new: false }
    )
        .then((subcategory) => {
            if (!category) {
                throw {
                    code: 404,
                    message: "Sub Category not found with id " + req.params.id,
                };
            }

            return res.status(200).json({ success: true, data: subcategory, message: "Sub Category updated ." });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                throw {
                    code: 404,
                    message: "Sub Category not found with id " + req.params.id,
                }
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}
exports.findOne = (req, res) => {
    SubCategory.findById(req.params.id)
        .then((category) => {
            if (!category) {
                throw {
                    code: 404,
                    message: "Sub Category not found with id " + req.params.id,
                };
            }
            res.status(200).json({ success: true, data: category });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send("Sub Category not found with id " + req.params.id);
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}

exports.findByCategory = (req, res) => {
    SubCategory.find({ category: req.params.id })
        .then((category) => {
            if (!category) {
                throw {
                    code: 404,
                    message: "Sub Category not found with category id " + req.params.id,
                };
            }
            res.status(200).json({ success: true, data: category });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send("Sub Category not found with id " + req.params.id);
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}

exports.findAll = (req, res) => {

    SubCategory.find()
        .then((subcategories) => {
            res.status(200).send({ success: true, data: subcategories });
        })
        .catch((err) => {
            return res.status(error.code || 500).send({ success: false, error: error.message || "Some error occurred while retrieving subcategories." });
        });
}
exports.delete = (req, res) => {
    SubCategory.findByIdAndRemove(req.params.id)
        .then((subcategory) => {
            if (!subcategory) {
                throw ({
                    code: 404,
                    message: "subcategory not found with id " + req.params.id,
                });
            }
            res.status(204).send({ message: "subcategory deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                throw ({
                    code: 404,
                    message: "subcategory not found with id " + req.params.id,
                });
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");

        });
}