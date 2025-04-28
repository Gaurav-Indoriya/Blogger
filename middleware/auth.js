const jwt = require('jsonwebtoken');
const adminModel = require('../model/admin'); //importing admin model


const checkAuth = async (req, res, next) => { //middleware to check authentication
    const token = req.cookies.token; //getting token from cookie
    if (!token){
        req.flash('LoginError', 'Unauthorized! Please login first');
        return res.redirect('/login');
    }
    try {
        const verifyToken = jwt.verify(token, 'gaurav$');
        const user = await adminModel.findOne({where : { ID: verifyToken.ID }});
        if (user) {
            req.admin = user;
            next();
        } else {
            req.flash('LoginError', 'Session expired or invalid token, please login again!');
            res.redirect('/login');
        }
    } catch (error) {
        
    }
}

module.exports = checkAuth; //exporting authentication middleware