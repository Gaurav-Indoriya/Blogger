// middleware/redirectIfLoggedIn.js

const jwt = require('jsonwebtoken');
const adminModel = require('../model/admin');

const admin = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return next();

    try {
        const verifyToken = jwt.verify(token, 'gaurav$');
        const user = await adminModel.findOne({ where: { ID: verifyToken.ID } });

        if (user) {
            return res.redirect('/dashboard');
        } else {
            next();
        }
    } catch (err) {
        // Token invalid or expired — proceed normally
        next();
    }
};

module.exports = admin;
