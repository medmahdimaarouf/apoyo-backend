const { validationResult } = require('express-validator');
const UserSchema = require("../models/user.model");

exports.findAll = async (req, res, next) => {
  var User = UserSchema(req.connection)
  User.find()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      return res.status(error.code || 500).send(error.message || "Some error occurred while retrieving users.");
    });

};

exports.findOne = async (req, res, next) => {

  var User = UserSchema(req.connection)

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw {
          code: 404,
          message: "user not found with id " + req.params.id,
        };
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send("user not found with id " + req.params.id);
      }
      return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
    });
};


exports.update = async (req, res, next) => {
  console.log(req.params);

  let errors = validationResult(req);
  if (!errors.isEmpty()) throw { code: 400, message: errors }

  var User = UserSchema(req.connection)

  User.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      adress: req.body.adress,
      phone: req.body.phone,
      photo: req.body.photo,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      email: req.body.email,
      password: req.body.password,
      badge: req.body.badge
    },
    { new: false } // TAKE CARE HERE .......  { new: false }
  )
    .then((user) => {
      if (!user) {
        throw {
          code: 404,
          message: "User not found with id " + req.params.id,
        };
      }

      return res.status(200).json({ success: true, data: { user: user, token: user.generateJWT() }, message: "User updated ." });
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        throw {
          code: 404,
          message: "User not found with id " + req.params.id,
        }
      }
      return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");
    });
};

exports.create = async (req, res, next) => {

  try {
    var User = UserSchema(req.connection)

    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      adress: req.body.adress,
      phone: req.body.phone,
      gender: Number(req.body.gender),
      birthDate: req.body.birthDate || "",
      email: req.body.email,
      isVerified: true,
    });

    if (req.files) if (req.files.photo) {
      user.photo = new Date().getTime() + "." + req.files.photo.name.split('.').pop().toLowerCase();
    }
    await User.register(user, req.body.password, async function (err) {
      if (err) {
        console.log('error while user register!', err);
        return res.status(501).json({ success: false, message: err.message, data: user });
      }
      if (user.photo)
        req.files.photo.mv("../" + USER_AVATARS_PATH);

      //await sendWeelcomeEmail(req.body.lastName + " " + req.body.firstName, req.body.password, req.body.email);
      return res.status(200).json({
        success: true,
        data: user,
        message: "Created user " + req.body.firstName,
      });
    });

  } catch (error) {
    return res.status(error.code || 500).json({ success: false, message: error.message || "Unknown internal server error ! ." });
  }
};

exports.delete = async (req, res, next) => {

  var User = UserSchema(req.connection)

  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        throw ({
          code: 404,
          message: "User not found with id " + req.params.id,
        });
      }
      res.status(204).send({ message: "User deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        throw ({
          code: 404,
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(err.code || 500).send(err.message || "Unknown internal server error ! .");

    });
};

exports.paginate = async (req, res, next) => {
  var User = UserSchema(req.connection)

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
    User.paginate({}, options, function (err, result) {
      return res.status(200).json({
        data: result.docs,
        totalItem: result.totalDocs,
        totalPage: result.totalPages
      });
    });
  } catch (error) {
    return res.status(error.code || 500).send(error.message || "Unknown internal server error ! .");
  }

};


