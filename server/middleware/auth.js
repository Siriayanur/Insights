const jwt = require('jsonwebtoken');

//wants to like a post --> click LIKE BUTTON --> auth middleware checks if this user is allowed to do this
const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        
        //If the length > 500 its through google Sign in so googles provided token
        const isCustomAuth = token.length < 500;
        let decodeData;

        if (token && isCustomAuth) {
            decodeData = jwt.verify(token, 'test');
            req.userId = (decodeData ? decodeData.id : null)
        } else {
            //IF the token is google's oAuth token :
            decodeData = jwt.decode(token); //secret is not needed
            req.userId = (decodeData ? decodeData.sub : null)
        }
        next();
    } catch (e) {
        console.log(e);
    }
}

module.exports = auth;