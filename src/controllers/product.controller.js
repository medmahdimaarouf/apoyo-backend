const Product = require('../models/product.model')
const CloudinaryStorage = require('../services/cloudinary.storage')
const Config = require('config');

exports.create = (req, res) => {
    let image = req.files.images;
    CloudinaryStorage.upload(image, 'products').then(result => {
        var product = new Product({
            label: req.body.label,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            images: [result],
            category: req.body.category
        });
        Product.create(product, async function (err) {
            if (err) {
                console.log('error while create product!', err);
                return res.status(501).json({ success: false, message: err.message, data: product });
            }
            return res.status(200).json({
                success: true,
                data: product,
                message: "Created product "
            });
        });
    })

}
exports.update = (req, res) => {
    Product.findByIdAndUpdate(
        req.params.id,
        {
            label: req.body.label,
            description: req.body.description,
            price: Number.parseFloat(req.body.price),
            discount: Number.parseFloat(req.body.discount),
            category: req.body.category
        },
        { new: false } // TAKE CARE HERE .......  { new: false }
    )
        .then((product) => {
            if (!product) {
                throw {
                    code: 404,
                    message: "Product not found with id " + req.params.id,
                };
            }

            return res.status(200).json({ success: true, data: product, message: "Product updated ." });
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                throw {
                    code: 404,
                    message: "Product not found with id " + req.params.id,
                }
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}
exports.findOne = (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            if (!product) {
                throw {
                    code: 404,
                    message: "Product not found with id " + req.params.id,
                };
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            if (err.kind === "ObjectId") {
                return res.status(404).send("Product not found with id " + req.params.id);
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
        });
}
exports.findAll = (req, res) => {

    Product.find()
        .then((products) => {
            res.status(200).send({ success: true, data: products });
        })
        .catch((err) => {
            return res.status(error.code || 500).send({ success: false, error: error.message || "Some error occurred while retrieving products." });
        });
}
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (!product) {
                throw ({
                    code: 404,
                    message: "Product not found with id " + req.params.id,
                });
            }
            res.status(204).send({ message: "Product deleted successfully!" });
        })
        .catch((err) => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                throw ({
                    code: 404,
                    message: "Product not found with id " + req.params.id,
                });
            }
            return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");

        });
}
exports.paginate = (req, res) => {

    try {
        const options = {
            page: req.query.currentPage,
            lean: true,
            limit: req.query.pageSize,
            leanWithId: true,
            sort: req.query.orderBy,
            collation: {
                locale: 'en'
            }
        };
        Product.paginate({}, options, function (err, result) {
            return res.status(200).json({
                data: result.docs,
                totalItem: result.totalDocs,
                totalPage: result.totalPages
            });
        });
    } catch (error) {
        return res.status(error.code || 500).send(error.message || "Unknown internal server error ! .");
    }
}