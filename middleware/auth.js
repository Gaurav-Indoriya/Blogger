const jwt = require('jsonwebtoken');
const adminModel = require('../model/admin'); // importing admin model

const checkAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        req.flash('LoginError', 'Unauthorized! Please login first');
        return res.redirect('/login');
    }

    try {
        const verifyToken = jwt.verify(token, 'gaurav$');
        const user = await adminModel.findOne({ where: { ID: verifyToken.ID } });

        if (user) {
            req.admin = user;
            //Prevent browser from caching this authenticated page
            res.set('Cache-Control', 'no-store');
            next();
        } else {
            req.flash('LoginError', 'Session expired or invalid token, please login again!');
            res.redirect('/login');
        }
    } catch (error) {
        req.flash('LoginError', 'Invalid token or session expired!');
        res.redirect('/login');
    }
};

module.exports = checkAuth;
