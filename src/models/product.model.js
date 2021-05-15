const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        label: { type: String, default: "", required: true },
        price: { type: String, default: "", required: true },
        size: { type: String, default: "", required: false },
        colors: { type: [], default: 0, required: true },
        photos: { type: String, default: null, required: false },
    },
    { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", UserSchema);
