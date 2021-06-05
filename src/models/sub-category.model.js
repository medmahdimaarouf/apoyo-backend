const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema(
    {
        name: { type: String, default: "", required: true },
        image: { type: String, default: "", required: false },
        category: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("SubCategory", CategorySchema);
