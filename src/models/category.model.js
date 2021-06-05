const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
    {
        label: { type: String, default: "", required: true },
        image: { type: String, default: "", required: false }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
