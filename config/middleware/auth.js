const config = require('config');
const jwt = require('jsonwebtoken');

// middle ware function to create private route

// get token from front end 
function auth(req, res, next) {
	const token = req.header('x-auth-token');
	const secret = process.env.jwtSecret || config.get("jwtSecret");
    // Check for token
    if (!token) {
		console.log('Auth: token not found.')
		return res.status(401).json({msg: 'No token, authorization denied.'});
	}    

    try{
        // verify token
        const decoded = jwt.verify(token, secret);
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
		console.log('Auth: verify failed.')
        res.status(400).json({ msg: 'Token is not valid'});
    }   
}

module.exports = auth;