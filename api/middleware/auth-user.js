'use stricts';

const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');

// Middleware to authenticate the request using Basic Authentication.

exports.authenticateUser = async(req,res,next) => {

    let message;

    // Parse the user's credentials from the Authorization header.
    const credentials = auth(req);

     if(credentials) {
        const user = await User.findOne({
            where: {emailAddress: credentials.name}
        });
        if(user){
            const authenticated = bcrypt
            .compareSync(credentials.pass, user.password);
            if(authenticated) {
                console.log(`Authentication successfull for emailAddress: ${user.emailAddress}`);

                //store the user on the request object
                req.currentUser = user;
            } else {
                message = `Authentication failure for emailAddress: ${user.emailAddress}`;
            }
        } else {
            message = `User not found for emailAdress: ${credentials.name}`;
        }
     } else {
        message = `Auth header not found`;
     }
     if(message) {
        console.warn(message)
        res.status(401).json({ message: 'Access Denied' });
     } else {
        next();
     }
};