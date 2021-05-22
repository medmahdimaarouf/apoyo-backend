const passportLocalMongoose = require('passport-local-mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const mongoose = require("mongoose");
const Jwt = require('jsonwebtoken');
const Config = require("config");

const UserSchema = mongoose.Schema(
  {
    firstName: { type: String, default: "", required: true },
    lastName: { type: String, default: "", required: true },
    adress: { type: String, default: "", required: false },
    zipCode: { type: Number, default: 0, required: true },
    photo: { type: String, default: null, required: false },
    gender: { type: Number, default: 1, required: true },
    birthDate: { type: String, default: "", required: false },
    badge: { type: String, default: "client", required: true },
    mailConfirmed: { type: Boolean, default: false, require: true },
    mailConfirmationToken: { type: String },
    resetPasswordExpires: { type: String },
    resetPasswordToken: { type: String }
  },
  { timestamps: true }
);

UserSchema.plugin(mongoosePaginate);

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
  passwordField: "password"
});

UserSchema.methods.generateJWT = function () {
  return Jwt.sign({
    email: this.email,
    id: this._id,
    password: this.password,
  }, Config.get('passport').secret_key, { expiresIn: '1d' });
}

UserSchema.methods.generateVerificationToken = function () {
  const a = Jwt.sign({ id: this._id, email: this.email }, Config.get('passport').secret_key, { expiresIn: '7d' })
}
/*
UserSchema.methods.verifyPassword = (password)=>{
  return this.password == crypto.MD5(password);
};
*/

module.exports = mongoose.model("User", UserSchema);
