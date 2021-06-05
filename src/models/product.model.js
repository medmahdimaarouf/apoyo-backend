const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        description: { type: String, default: "", required: true },
        designation: { type: String, default: "", required: true },
        reference: { type: String, default: "", required: true },
        price: { type: Number, default: 0, required: true },
        size: { type: 'M' | 'L' | 'S', default: "", required: false },
        color: { type: [], default: 0, required: true },
        images: { type: [], default: [], required: false },
        discount: { type: Number, default: 0, required: false },
        category: { type: String, default: '', required: true }
    },
    { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Product", UserSchema);
