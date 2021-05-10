const { validationResult } = require('express-validator');

module.exports = () => {
    var middeware = (req, res, next) => {
        let errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ message: errors });
        else next();
    }
    return middeware;
}